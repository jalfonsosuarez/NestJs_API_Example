import { CloudinaryAdapter } from './cloudinary.adapter';

export class FilesUploadAdapter {
  static async uploadFiles(
    files: Array<Express.Multer.File>,
  ): Promise<(string | null)[] | null> {
    const filesUploaded = await CloudinaryAdapter.uploadFiles(files);
    return filesUploaded;
  }

  static async deleteFile(file: string): Promise<boolean> {
    return await CloudinaryAdapter.deleteFile(file);
  }
}
