import mongoose from "mongoose";
import User from "./User.js";
const { Schema, SchemaTypes, model } = mongoose;

const lecteurSchema = new Schema({
  access: {
    type: Date,
    default: function () {
      return new Date().getTime();
    },
  },
});
const lecteur = User.discriminator("lecteur", lecteurSchema);
export default lecteur;
