const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/insta')
  .then(() => console.log("DB connected successfully".yellow))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: String, // Add the username field
  emailId: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
