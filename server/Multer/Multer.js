const multer = require("multer")

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'upload')
    },

    filename: (req, file, cb) => {

        cb(null, req.userName.toLowerCase() + "-" + Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {

        if (
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png"
        ) {
            cb(null, true);

        } else {

            cb(new Error("only jpg,jpeg and png are alowed."))
        }

    }
})

// export upload

module.exports = upload