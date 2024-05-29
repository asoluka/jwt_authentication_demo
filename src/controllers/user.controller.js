const User = require("../models/user.model");

async function httpRegisterUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // TODO: Basic validation (improve for production)
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all fields",
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const user = new User({ username, email, password });
    const savedUser = await user.save();

    // Respond with success
    res.status(201).json({
      message: "User created successfully",
      user: {
        email: savedUser.email,
        password: savedUser.password,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function httpGetUsers(req, res) {
  // Access user database and return users
  const users = await User.find({}, "-password");
  res.status(200).json({ message: "Access granted", user: users });
}

module.exports = {
  httpRegisterUser,
  httpGetUsers,
};
