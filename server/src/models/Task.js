const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "on-hold"],
      default: "pending"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
