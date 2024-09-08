import express from 'express';
import {limiter} from "./utils/limiter.js";
const router = express.Router();

//signup
import {signup} from "./signup/signup.js";
import {validateSignup} from "./signup/validateSignup.js";
import { singleUpload } from "./utils/multer.js";
router.post("/signup", limiter, singleUpload, validateSignup,signup);


//signin
import {signin} from "./signin/signin.js";
import {validateSignin} from "./signin/validateSignin.js";
router.post("/signin",limiter,validateSignin,signin);

//put data
import {putScore} from "./putScore/putScore.js";
router.put("/putScore",limiter,putScore);

//get data
import {getData} from "./getData/getData.js";
router.get("/getData",limiter,getData);

export default router