import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const detailSchema = new Schema(
  {
    bookworm: {
      type: SchemaTypes.ObjectId,
      ref: "lecteur",
    },
    book: {
      type: SchemaTypes.ObjectId,
      ref: "Book",
    },
    stat: {
      type: String,
      enum: ["Returned", "Reading"],
      default: "Reading",
    },
    dueDate: {
      type: Date,
      default: () => {
        return new Date().getTime() + 1296000000;
      },
    },
    renewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const emprunt = model("emprunt", detailSchema);
export default emprunt;
