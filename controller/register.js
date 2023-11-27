import Registers from "../model/register.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const newRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ massge: "all field are required" });
    }
    const existingUser = await Registers.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await Registers({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({ massgae: "user registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ massgae: "There is error", error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({ message: "all fields are required" });
    }
    const findUser = await Registers.findOne({ email });
    if (!findUser) {
      return res
        .status(401)
        .json({ Error: "User not found please regitser first!" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "user password is incrroct" });
    }
    if (findUser.email === email && isMatch) {
      const token = jwt.sign(
        { userID: findUser._id },
        process.env.JWT_SCREAT_KEY,
        {
          expiresIn: "4d",
        }
      );
      return res.status(200).send({
        status: "success",
        message: "user login",
        token: token,
        username: findUser.username,
        id: findUser._id,
      });
    }
    return res
      .status(200)
      .send({ status: "failed", message: "email is invalid" });
  } catch (error) {
    return res.status(400).send({ status: "failed", message: error });
  }
};
