import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  discordId: {
    type: String,
    unique: true,
    sparse: true,
  },
  userImg : {
    type: String,
    required: false,
  }
});

let Users;
try {
  Users = mongoose.model("Users");
} catch (e) {
  Users = mongoose.model("Users", userSchema);
}

export default Users;