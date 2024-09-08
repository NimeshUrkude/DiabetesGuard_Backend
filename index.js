import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import postRoutes from "./routes/routes.js";

// Initialize app and middleware
const app = express();

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configure dotenv
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Use middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a simple route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Wahoo! REST APIs are working',
    });
});

// Use routes
app.use("/", postRoutes);

// Start the server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log('Server up and running on port', PORT);
});