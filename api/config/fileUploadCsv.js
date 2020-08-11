var multer = require('multer'); 
const fs   = require('fs');

var type = '';
// Multer File upload settings
var DIR = './public/'+'csvFiles';

var student = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        if (!fs.existsSync(DIR)){
            fs.mkdirSync(DIR);
        }
          fs.existsSync(DIR) || fs.mkdirSync(DIR);
          cb(null, DIR);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, 'fileuploadCsv.csv');
    }
});

var upload = multer({storage: student}).single('file');             


module.exports.upload = upload;