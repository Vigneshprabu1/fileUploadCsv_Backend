const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fileUploadEIM',{useNewUrlParser: true,useUnifiedTopology:true});

mongoose.set('useFindAndModify',true);
var db= mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
