export const fileFilter = (
  req: Express.Request,
  files: Array<Express.Multer.File>,
  callback: Function,
) => {
  // console.log({ file })
  if (!files || files.length === 0)
    return callback(new Error('Files is empty'), false);

  files.map((file) => {
    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!validExtensions.includes(fileExtension)) {
      return callback(null, false);
    }
  });

  callback(null, true);
};
