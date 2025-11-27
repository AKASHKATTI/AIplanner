// backend/utils/planPrompt.util.js

/**
 * Return a prompt string for AI planner.
 * @param {string} role
 * @param {number} noOfDays
 * @param {string} level
 * @returns {string}
 */
function aiPlannerPrompt(role, noOfDays, level) {
  return `
You are an expert technical career coach and interview preparation specialist.

Your task is to generate a structured, day-by-day study plan for the following:
- Target Role: ${role}
- Duration: ${noOfDays} days
- Difficulty Level: ${level}

Guidelines:
- For Beginner: Focus on fundamentals, syntax, environment setup, and small tasks.
- For Intermediate: Focus on best practices, frameworks, and practical tasks.
- For Advanced: Focus on system design, optimization, architecture, and high-level tasks.

Output Requirements:
Produce a pure JSON array with exactly ${noOfDays} objects.
Each object must follow this exact schema:

{
  "day": Number,
  "topics": ["topic 1", "topic 2"],
  "resources": ["resource 1", "resource 2"],
  "tasks": ["task 1", "task 2"],
  "refNotes": "Short summary or tip."
}

Rules:
- Only return valid JSON.
- Do NOT add explanations, markdown, or conversational text.
- Keep topics specific, tasks actionable, and notes brief.

Return only the JSON array.
`;
}

module.exports = aiPlannerPrompt;
