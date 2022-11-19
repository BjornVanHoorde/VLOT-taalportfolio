import { createToken } from "../../middleware/auth";
import UserService from "./User.service";

export default class AuthController {
  login = async (req, res, next) => {
    // Don't show password
    const { user } = req;
    const userService =  new UserService();
    const userData = await userService.findOne(user.id);

    return res.json({
      user: userData,
      token: createToken(userData),
    });
  };
}