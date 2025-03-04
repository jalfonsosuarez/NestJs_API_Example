/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v2 as cloudinary } from 'cloudinary';
import { envs } from 'src/config';

export class CloudinaryAdapter {
  static async uploadFile(file: Express.Multer.File) {
    return await uploadImage(file);
  }

  static async deleteFile(file: string): Promise<boolean> {
    return await deleteImage(file);
  }
}

const uploadImage = async (image: Express.Multer.File) => {
  cloudinary.config(envs.cloudinary.url ?? '');
  const cloudinaryFolder = envs.cloudinary.folder ?? '';
  try {
    const buffer = image.buffer;
    const base64Image = Buffer.from(buffer).toString('base64');
    const uploadedImage = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: cloudinaryFolder,
      },
    );
    return uploadedImage.url;
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
