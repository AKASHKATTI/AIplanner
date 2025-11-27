// controller/ai.controller.js
require("dotenv").config();
const aiPlannerPrompt = require("../utils/planPrompt.util");
const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
  console.warn("Google GenAI API key not found. Set GOOGLE_API_KEY in .env");
}

const genAI = new GoogleGenAI({ apiKey });

/**
 * Service: generateAIPlan(role, noOfDays, level)
 * Returns parsed JS object/array produced by the model.
 */
async function generateAIPlan(role, noOfDays, level) {
  if (!role || !noOfDays || !level) {
    throw new Error("role, noOfDays, and level are required.");
  }

  const prompt = aiPlannerPrompt(role, noOfDays, level);

  // Single API call. Adjust model string if needed.
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  if (!response) {
    throw new Error("No response from GenAI.");
  }

  // Support multiple possible shapes of response
  const candidate = Array.isArray(response.candidates) && response.candidates[0]
    ? response.candidates[0]
    : response;

  const rawText =
    candidate?.content?.parts?.[0]?.text ||
    candidate?.content?.text ||
    candidate?.text ||
    "";

  if (!rawText) {
    const err = new Error("GenAI returned no text content.");
    err.debug = JSON.stringify(response).slice(0, 2000);
    throw err;
  }

  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    const data = JSON.parse(cleaned);
    return data;
  } catch (parseErr) {
    const e = new Error("Failed to parse model output as JSON.");
    e.modelOutput = cleaned.slice(0, 2000);
    e.originalError = parseErr;
    throw e;
  }
}

/**
 * Express route handler: generateStudyPlan(req, res)
 * Uses the service above, but keeps the same route signature for existing routes.
 */
async function generateStudyPlan(req, res) {
  try {
    const { role, noOfDays, level } = req.body;
    if (!role || !noOfDays || !level) {
      return res.status(400).json({ message: "role, noOfDays, and level are required fields." });
    }

    const plan = await generateAIPlan(role, noOfDays, level);
    return res.status(200).json({ plan });
  } catch (error) {
    console.error("Error generating study plan:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { generateAIPlan, generateStudyPlan };
