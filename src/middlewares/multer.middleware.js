import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `./public/images`);
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


//prevents DOS attacks
export const upload = multer({
    storage,
    limits:{
        fileSize: 1 * 1024 * 1024,
    }
});