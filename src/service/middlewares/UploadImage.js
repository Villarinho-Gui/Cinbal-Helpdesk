import multer from 'multer'

export const uploadUser = multer({
  storage: multer.diskStorage({
    destination: (_, file, callback) => {
      callback(null, './public/uploads/')
    },
    filename: (_, file, callback) => {
      callback(null, Date.now().toString() + '_' + file.originalname)
    },
  }),
  fileFilter: (_, file, callback) => {
    const extensaoImg = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ].find((formatoAceito) => formatoAceito === file.mimetype)
    if (extensaoImg) {
      return callback(null, true)
    }

    return callback(null, false)
  },
})
