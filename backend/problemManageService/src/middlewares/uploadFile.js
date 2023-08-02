const multer = require('multer');

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ tệp tải lên
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix); // Tên tệp lưu trữ
    }
});

// Kiểm tra loại tệp cho phép
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain') { // Chỉ cho phép tệp văn bản
        cb(null, true);
    } else {
        cb(new Error('Only text files are allowed!'), false);
    }
};

// Khởi tạo middleware multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
