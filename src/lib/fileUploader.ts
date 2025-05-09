import multer from 'multer';
import path from 'path';

interface UploadHandlerOptions {
  uploadFolder?: string;
  fileSizeLimit?: number;
  memoryFlag?: boolean;
  allowedTypes?: string[];
}

const dirname = path.resolve();

export function uploadHandler(options: UploadHandlerOptions) {
  const {
    uploadFolder = 'public/temp',
    fileSizeLimit = 100 * 1024 * 1024,
    memoryFlag = false,
    allowedTypes = [],
  } = options;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(dirname, uploadFolder));
    },
    filename: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const timestamp = Date.now();
      const uniqueFileName = `${baseName}-${timestamp}${ext}`;

      cb(null, uniqueFileName);
    },
  });
  const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    if (allowedTypes.length === 0) {
      cb(null, true);
      return;
    }

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(null, false);
  };

  const upload_memory = multer({
    storage: multer.memoryStorage(),
    limits: { fieldNameSize: 100, fileSize: fileSizeLimit },
    fileFilter: fileFilter,
  });
  if (memoryFlag) {
    return upload_memory;
  }

  const upload_storage = multer({
    storage,
    limits: { fieldNameSize: 100, fileSize: fileSizeLimit },
    fileFilter: fileFilter,
  });
  return upload_storage;
}
