const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  pictureSrc: {
    type: String,
    required: true,
    // validate: [
    //   function(input) {
    //     return input.length >= 6;
    //   },
    //   "Password should be longer."
    // ]
    unique: [true, "You've already scraped all the secrets! Come back on Sunday to find more."]
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Picture = mongoose.model("Picture", PictureSchema);

module.exports = Picture;
