const mongoose = require('mongoose');

const AIPlannerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  noOfDays: { type: Number, required: true },
  level: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  daywisePlan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DayPlan',
    },
  ],
}, { timestamps: true });

// Optional: cascade delete using middleware (runs when you call plan.remove())
AIPlannerSchema.pre('remove', { document: true, query: false }, async function (next) {
  try {
    const DayPlan = mongoose.model('DayPlan');
    await DayPlan.deleteMany({ planner: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('AIPlanner', AIPlannerSchema);
