const { model, models, Schema } = require("mongoose");

const userSchema = Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Include this option to allow Mongoose to automatically generate _id
    _id: true,
  }
);

const User = models?.User || model("User", userSchema);

export default User;
