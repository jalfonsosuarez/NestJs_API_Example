/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryAdapter {
  static async uploadFiles(files: Array<Express.Multer.File>) {
    return await uploadImages(files);
  }

  static async deleteFile(file: string): Promise<boolean> {
    return await deleteImage(file);
  }
}

const uploadImages = async (images: Array<Express.Multer.File>) => {
  cloudinary.config(process.env.CLOUDINARY_URL ?? '');
  const cloudinaryFolder = process.env.CLOUDINARY_FOLDER ?? '';
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = image.buffer;
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: cloudinaryFolder,
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadImages = await Promise.all(uploadPromises);

    return uploadImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteImage = async (imageUrl: string) => {
  cloudinary.config(process.env.CLOUDINARY_URL ?? '');
  const cloudinaryFolder = process.env.CLOUDINARY_FOLDER ?? '';
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
  const imageToDelete = cloudinaryFolder + '/' + imageName;

  try {
    const resp = await cloudinary.api.delete_resources([imageToDelete]);
    return resp.deleted[imageToDelete] === 'deleted';
  } catch (error) {
    console.log(error);
    return false;
  }
};
