/**
 * Designed By:Vigneshprabu S
 * date:
 * modified:-
 * File Name: UserTable Controller
 */
const UserTableService = require("../service/UserTableService");
const dateTime = require("node-datetime");
var dateFormat = require("dateformat");
const async = require("async");
const {
  Parser,
  transforms: { unwind },
} = require("json2csv");
var fileUploadCon = require("../config/fileUploadCsv");
const fs = require("fs");
const neatCsv = require("neat-csv");

exports.getAllUser = (req,res,next) => {
    UserTableService.getAllUser(req,res).then(doc=>{
        res.status(200).json(doc);
    }).catch(next);
}

exports.saveUserTable = (req,res,next) =>{
    UserTableService.saveUserTable(req,res).then(doc=>{
        res.status(200).json(doc);
    }).catch(next);
}

exports.updateUserTable = (req,res,next) =>{
    UserTableService.updateUserTable(req,res).then(doc=>{
        res.status(200).json(doc);
    }).catch(next);
}

exports.deleteUserTable = (req,res,next)=>{
    var query = {_id: req.body._id}
    UserTableService.deleteUserTable(query).then(doc=>{
        res.status(200).json(doc);
    }).catch(next);
}

exports.getAllUserTableExport = (req, res, next) => {
    docUserTableExport(req, res);
  };
  

function docUserTableExport(req, res) {
    var fields = [
      {
        label: "userName",
        value: "",
      },
      {
        label: "email",
        value: "",
      },
      {
        label: "address",
        value: "",
      },
      {
        label: "city",
        value: "",
      },
      {
        label: "state",
        value: "",
      },
      {
        label: "country",
        value: "",
      },
      {
          label:"yearOfExp",
          value: ""
      },
      {
          label:"salary",
          value:""
      }
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse();
    res.attachment("filename.csv");
    res.status(200).send(csv);
  }
  
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true);
  }
 return (false);
}
function ValidateNumber(number) 
{
  var no = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 if (/^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/.test(no))
  {
    return (true);
  }
 return (false);
}
  exports.fileUpload = (req, res, next) => {
    fileUploadCon.upload(req, res, function (err) {
      if (err) {
        res.status(500).json(err);
      }
      fs.readFile("./public/csvFiles/fileuploadCsv.csv", async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        var details = await neatCsv(data);
        var i = 1;
        var rowValue = [];
        var j = 1;
        async.eachSeries(details, function (element, callBack) {
                  if(element.userName === '' ){
                    rowValue.push( {rowNumber: j,errorDescription: "User name should not be empty"}); 
                  }
                  if(element.email ==="" ){
                    rowValue.push(
                     {rowNumber: j, errorDescription: "Email specified is not be email"});
                  } 
                   if(ValidateEmail(element.email) !== true){
                    rowValue.push(
                     {rowNumber: j, errorDescription: "Email specified is not a valid email"});
                  } 
                   if(element.salary ==="" ){
                    rowValue.push(
                    {rowNumber: j, errorDescription: "Salary should not be empty"});
                  }
                  if(ValidateNumber(element.salary)!== true ){
                    rowValue.push(
                    {rowNumber: j, errorDescription: "Salary should not contain alpha numeric values. It should be a valid number"});
                  }
                  if (element.yearOfExp === ""){
                    rowValue.push( {rowNumber: j, errorDescription: "Experience It should be a valid number"});
                  } 
                  if (details.length === j) {
                    if(rowValue.length > 0){
                      res.status(200).json({type:'error',rowValue});
                    }
                  }
                  j++;
                  callBack();
    
          });
        console.log('details',details.length);
        if (details.length === 0) {
          res.status(500).json({ message: "No values to update" });
        } else {
          if(rowValue.length === 0) {
          async.eachSeries(details, function (element, callBack) {
              UserTableService.saveUserTableUpload(element)
                .then((doc) => {
                  if (i === details.length) {
                    res.status(200).json({type:'success',doc});
                  }
                  i++;
                  callBack();
                })
                .catch(next);
          });
        }
        }
      });
    });
  };