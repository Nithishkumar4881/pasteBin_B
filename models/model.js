const mongoose = require("mongoose");

const pbShcema = new mongoose.Schema(
  {
    id:{
      type:String,
      required:true,
    },
    content: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Number,
      default: null,
    },
    max_views: {
      type: Number,
      default: null,
      min:1,
    },
    currentViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const pbModel = mongoose.model("PBDB", pbShcema);

module.exports = pbModel;
