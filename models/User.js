const { model, models, Schema } = require("mongoose");

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = models?.User || model("User", userSchema);

export default User;