import express from 'express';
import { login, logout, signup, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {singleUpload} from '../middlewares/multer.js'

const router = express.Router();

router.route("/signup").post(singleUpload,signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;