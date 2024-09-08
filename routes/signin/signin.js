//schema
import User from "../../schema/User.js";

//bcrypt
import bcrypt from "bcrypt";
const saltRounds = 10;

//handleError
import {handleError} from "../utils/handleError.js";

//mongoose
import mongoose from "mongoose";

//jwt
import jwt from "jsonwebtoken";

const signin = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { email, password} = req.body.data;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Wrong Password" });
        }

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
        console.log('User account signin. Email : ' + email);
        res.status(200).json({ message: 'User Found', token:token});

        await session.abortTransaction();           
    }
    catch (err) {
        await session.abortTransaction();
        handleError(res, err);
    } 
    finally{
        session.endSession();
    }

};

export {signin};

