const AIPlanner = require("../models/aiPlanner.model");
const DayPlan = require("../models/plans.model");
const { generateStudyPlan  , generateAIPlan} = require("./ai.controller");
const mongoose = require("mongoose");



// POST /api/plans
async function createPlan(req, res) {
  try {
    const { role, noOfDays, level } = req.body; // Accept only these three

    if (!role || !noOfDays || !level) {
      return res.status(400).json({
        message: "role, noOfDays, and level are required.",
      });
    }

    const userId = req.user.id;

    // Generate AI plan internally based on inputs
    const plan = await generateAIPlan(role, noOfDays, level);

    if (!Array.isArray(plan) || plan.length === 0) {
      return res.status(500).json({ message: "Failed to generate study plan" });
    }

    // Create the main planner doc
    const aiPlanner = await AIPlanner.create({
      user: userId,
      role,
      noOfDays,
      level,
      daywisePlan: [], // will fill after creating DayPlan docs
    });

    // Create DayPlan docs from AI-generated array
    const dayPlans = await Promise.all(
      plan.map(async (day) => {
        const created = await DayPlan.create({
          user: userId,
          planner: aiPlanner._id,
          day: day.day,
          topics: day.topics,
          resources: day.resources,
          tasks: day.tasks,
          isCompleted: day.isCompleted ?? false,
          refNotes: day.refNotes || "",
        });
        return created._id;
      })
    );

    // Attach dayPlans to planner and save
    aiPlanner.daywisePlan = dayPlans;
    await aiPlanner.save();

    return res
      .status(201)
      .json({ message: "Plan created successfully", planId: aiPlanner._id });
      
  } catch (error) {
    console.error("Error creating plan:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /api/plans
async function getPlans(req, res) {
  try {
    const plans = await AIPlanner.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("daywisePlan");
    return res.status(200).json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


// GET /api/plans/:id
async function getPlanById(req, res) {
  try {
    const rawId = req.params.id;
    console.log("GET /api/plans/:id called with params.id =", rawId);

    if (!rawId) {
      return res.status(400).json({ message: "Missing plan id in request params" });
    }

    // Defensive cleanup: decode, trim, remove a leading ':' if present
    const planId = decodeURIComponent(rawId).trim().replace(/^:/, "");

    // Validate before querying
    if (!mongoose.Types.ObjectId.isValid(planId)) {
      return res.status(400).json({ message: "Invalid plan id" });
    }

    const plan = await AIPlanner.findById(planId).populate("daywisePlan");
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.status(200).json(plan);
  } catch (error) {
    console.error("Error fetching plan by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


// DELETE /api/plans/:id
async function deletePlan(req, res) {
  try {
    const planId = req.params.id;
    const plan = await AIPlanner.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Also delete related day plans:
    await DayPlan.deleteMany({ planner: plan._id });

    await plan.deleteOne();
    return res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createPlan, getPlans, getPlanById, deletePlan };
