var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const folderName = req.params.folderName

        console.log( "Folder name", folderName)
        console.log( "Body del req", req.body)

        cb(null, `./public/images/${folderName}` || './public/images' );
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if(file.mimetype === 'image/gif'){
            filetype = 'gif';
        }
        if(file.mimetype === 'image/png'){
            filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg'){
            filetype = 'jpeg';
        }
        if(file.mimetype === 'image/jpg'){
            filetype = 'jpg';
        }
        if(file.mimetype === 'image/webp'){
            filetype = 'webp';
        }
        
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

module.exports = upload;