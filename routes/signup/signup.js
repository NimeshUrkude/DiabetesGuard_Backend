//schema
import User from "../../schema/User.js";

//bcrypt
import bcrypt from "bcrypt";
const saltRounds = 10;

//handleError
import {handleError} from "../utils/handleError.js";

//mongoose
import mongoose from "mongoose";

//upload img
import { uploadFileToLocal } from "../utils/uploadService.js";

const signup = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { email, password, name } = req.body.data;
        const file = req.file;
        
        const existingUser  = await User.findOne({ email });
        if(existingUser ){
            res.status(409).json({ error: 'Email already registered' }); 
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let profilePhotoUrl = '';
        try {
            profilePhotoUrl = await uploadFileToLocal(file);
        } catch (uploadError) {
            res.status(500).json({ error: 'File upload failed' });
        }

        const user = new User({
            email,
            password: hashedPassword,
            name,
            profilePhotoUrl
        });

        await user.save();
        console.log("User created : " + email);
        res.status(201).json({ message: 'User account created successfully' });
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

export {signup};

