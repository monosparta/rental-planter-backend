import { randomUUID } from 'crypto';
import multer from 'multer';
import { extname } from 'path';

const sizeLimit = process.env.UPLOAD_FILE_SIZE || (10 * 1024 * 1024); // 10 Mb

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, `${randomUUID()}${extname(file.originalname)}`); //Appending extension
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: sizeLimit
    },
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['.png', '.jpg', '.jpeg'];
        if (!acceptableExtensions.includes(extname(file.originalname))) {
            return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'image'));
        }

        callback(null, true);
    }
}).single('image');

const handleFileUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            /* istanbul ignore next */
            return next(err);
        }

        next();
    });
};

export { handleFileUpload };
