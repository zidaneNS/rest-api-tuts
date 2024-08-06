const users = {
  user: require("../models/users.json"),
  setUser: function (data) {
    this.user = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  try {
    const { name, pwd } = req.body;

    if (!name || !pwd)
      return res.status(405).json({ message: "name and pwd required" });
    const selectedUser = users.user.find((person) => person.userName === name);

    if (!selectedUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, selectedUser.password);

    if (match) {
      res
        .status(200)
        .json({ success: `user with username: ${name} logged in` });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = handleLogin;
