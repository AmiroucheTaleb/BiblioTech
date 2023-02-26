const mongoose = require("mongoose");

const empruntSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    returnedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Emprunt = mongoose.model("Emprunt", empruntSchema);

module.exports = Emprunt;
