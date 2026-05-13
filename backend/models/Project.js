/* models/Project.js */
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type     : String,
      required : [true, 'Project title is required'],
      trim     : true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type     : String,
      required : [true, 'Description is required'],
      trim     : true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: {
      type : String,
      trim : true,
    },
    category: {
      type    : String,
      enum    : ['fullstack', 'frontend', 'backend', 'mobile', 'other'],
      default : 'fullstack',
    },
    tags: [{ type: String, trim: true }],
    githubUrl : { type: String, default: '#' },
    liveUrl   : { type: String, default: '#' },
    imageUrl  : { type: String, default: '' },
    featured  : { type: Boolean, default: false },
    order     : { type: Number, default: 0 },
    status    : {
      type    : String,
      enum    : ['active', 'archived', 'draft'],
      default : 'active',
    },
  },
  { timestamps: true }
);

// Index for faster queries
projectSchema.index({ category: 1, featured: -1, order: 1 });

module.exports = mongoose.model('Project', projectSchema);
