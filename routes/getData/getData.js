//schema
import User from "../../schema/User.js";
import Score from "../../schema/Score.js";

//handleError
import {handleError} from "../utils/handleError.js";

//mongoose
import mongoose from "mongoose";

//jwt
import jwt from 'jsonwebtoken';

const getData = async (req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ errors: 'Token missing or incorrect format' });
        }
        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            const secretKey = process.env.SECRET_KEY;
            decoded = jwt.verify(token, secretKey);
        }
        catch(err){
            res.status(401).json({ errors: 'Invalid Token Please Re-login' });
            return;
        }
        const email = decoded.email;
        const user = await User.findOne({ email });

        if(!user){
            res.status(404).json({ errors: 'Unknown email' });
        }

        const scores = await Score.find({ _id: { $in: user.scores } }).session(session);
        console.log("Send Scores . Email : " + user.email);
        res.status(200).json({
            scores,
            name: user.name,
            email: user.email,
            image:user.profilePhotoUrl
        });

        await session.abortTransaction();         
    }
    catch (err) {
        await session.abortTransaction();
        handleError(res, err);
    }
    finally{
        session.endSession();  
    }
}

export {getData};