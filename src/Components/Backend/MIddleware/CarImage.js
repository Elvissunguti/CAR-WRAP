const multer = require("multer");
const path = require("path");



const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "carImage"){
            cb(null, path.join(__dirname, "../../../../public/CarImages"));
        } else {
            cb(new Error("Invalid fieldname"), null);
        }
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, uniquePrefix + extension);
    }
});

exports.imageUploads = multer({ storage: imageStorage}).fields([
    {name: "carImage", maxCount: 10},
]);
7