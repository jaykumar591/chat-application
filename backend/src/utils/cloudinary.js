import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import fs from 'fs';

config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploader = async (localFilePath) => {
    try {
       
        const result = await cloudinary.uploader.upload(localFilePath);

        
        

        
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.log('Failed to delete local file:', localFilePath);
            } else {
                console.log('Successfully deleted local file:', localFilePath);
            }
        });

        return result.url;
    } catch (error) {
        
        console.error('Error uploading file:', error);

        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.log('Failed to delete local file:', localFilePath);
            } else {
                console.log('Successfully deleted local file:', localFilePath);
            }
        });

        throw new Error('Failed to upload file to Cloudinary');
    }
};


const uploadProfileOnCloudinary = async (fileData) => {
    try {
    
        const result = await cloudinary.uploader.upload(fileData, {
            resource_type: 'auto',  
        });

       
        return result.url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file to Cloudinary');
    }
};

export { uploadProfileOnCloudinary };
export default uploader;
