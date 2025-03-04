import { CloudinaryAdapter } from './cloudinary.adapter';

export class FileUploadAdapter {
  static async uploadFile(file: Express.Multer.File): Promise<string | null> {
    const fileUploaded = await CloudinaryAdapter.uploadFile(file);
    return fileUploaded;
  }

  static async deleteFile(file: string): Promise<boolean> {
    return await CloudinaryAdapter.deleteFile(file);
  }
}
