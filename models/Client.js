const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
        type: String,
        required: true
    },
    accounts: [
        {
            type: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    advisorId: {
        type: Schema.Types.ObjectId,
        ref: 'Advisor'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);