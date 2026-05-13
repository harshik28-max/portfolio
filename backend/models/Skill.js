/* models/Skill.js */
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type     : String,
      required : [true, 'Skill name is required'],
      trim     : true,
    },
    level: {
      type : Number,
      min  : 0,
      max  : 100,
      required: true,
    },
    category: {
      type : String,
      enum : ['frontend', 'backend', 'database', 'devops', 'other'],
      required: true,
    },
    icon  : { type: String, default: '' },
    order : { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
