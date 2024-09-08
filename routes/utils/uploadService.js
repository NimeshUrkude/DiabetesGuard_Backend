import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Promisify fs functions for easier async/await usage
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Directory for storing uploaded images
const uploadDir = path.join(__dirname, '..', 'uploads');

const ensureUploadDirExists = async () => {
    if (!fs.existsSync(uploadDir)) {
        await mkdir(uploadDir);
    }
};

export const uploadFileToLocal = async (file) => {
    await ensureUploadDirExists();
    
    const { buffer, originalname } = file;
    const fileName = `${Date.now()}_${originalname}`;
    const filePath = path.join(uploadDir, fileName);

    try {
        await writeFile(filePath, buffer);
        return `/uploads/${fileName}`; // URL path or relative path for serving the file
    } catch (error) {
        console.error('Error saving file:', error);
        throw new Error('File save failed');
    }
};
