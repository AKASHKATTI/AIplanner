const mongoose = require('mongoose');

const dayPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AIPlanner', // must match the model name of AIPlanner
    required: true,
  },
  day: { type: Number, required: true },
  topics: [{ type: String }],
  resources: [{ type: String }],
  tasks: [{ type: String }],
  isCompleted: { type: Boolean, default: false },
  refNotes: { type: String },
}, { timestamps: true });

// Model name 'DayPlan' (capitalized) is conventional
const DayPlan = mongoose.model('DayPlan', dayPlanSchema);

module.exports = DayPlan;
