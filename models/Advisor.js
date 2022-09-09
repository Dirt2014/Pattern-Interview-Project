const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advisorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    focus_areas: [
        String
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Advisor', advisorSchema);