const users = {
  user: require("../models/users.json"),
  setUser: function (data) {
    this.user = data;
  },
};

const fsPromise = require("fs/promises");
const bcrypt = require("bcrypt");
const path = require("path");

const createNewUser = async (req, res) => {
  try {
    const { name, pwd } = req.body;

    if (!name || !pwd) {
      return res.status(404).json({ message: "name and password required!" });
    }

    const duplicate = users.user.find((person) => person.userName === name);

    if (duplicate) {
      return res.status(405).json({ message: "name already taken" });
    }

    const cryptPwd = await bcrypt.hash(pwd, 10);

    const newUser = {
      "userName":name,
      "password": cryptPwd,
    };

    users.setUser([...users.user, newUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(users.user)
    );

    console.log(users.user)

    res.status(201).json({"success": `user with name: ${name} created`});
  } catch (error) {
    console.log(error);
  }
};

module.exports = createNewUser;
