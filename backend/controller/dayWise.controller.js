const AIPlanner = require('../models/aiPlanner.model');
const DayPlan = require('../models/plans.model'); 

const mongoose = require('mongoose');

async function addDayPlan(req, res) {
    try {
        const { plannerId, dayPlans } = req.body;   
        
        const aiPlanner = await AIPlanner.findById(plannerId);
        if (!aiPlanner) {
            return res.status(404).json({ message: 'AI Planner not found' });
        }

        // insertMany requires an array, so dayPlans must be the array of day objects
        const addedDayPlans = await DayPlan.insertMany(
            dayPlans.map(day => ({
                user: req.user.id,
                planner: plannerId,
                day: day.day,
                topics: day.topics,
                resources: day.resources,
                tasks: day.tasks,
                isCompleted: day.isCompleted,
                refNotes: day.refNotes,
            }))
        );

        const ids = addedDayPlans.map(p => p._id);
        aiPlanner.daywisePlan.push(...ids);
        await aiPlanner.save();

        res.status(201).json({
            message: 'Day plans added successfully',
            dayPlans: addedDayPlans
        });

    } catch (error) {
        console.error('Error adding day plans:', error);
        res.status(500).json({ message: 'Server error' });
    }
}




async function getDayById(req, res) {
  try {
    const rawId = req.params.id;
    const dayId = decodeURIComponent(rawId).trim().replace(/^:/, "");

    if (!mongoose.Types.ObjectId.isValid(dayId)) {
      return res.status(400).json({ message: "Invalid day plan ID" });
    }

    const day = await DayPlan.findById(dayId);
    if (!day) return res.status(404).json({ message: "Day plan not found" });

    return res.status(200).json(day);
  } catch (error) {
    console.error("Error fetching day plan:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { addDayPlan ,getDayById };
