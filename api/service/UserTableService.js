/**
 * Designed By:Vigneshprabu S
 * date:
 * modified:-
 * File Name: UserTable Service
 */

 const UserTable = require('../model/UserTable');

 /**  Import Module*/
const dateTime = require("node-datetime");
const mongoose = require("mongoose");


async function getAllUser(req,res){
var result = UserTable.find().exec();
return result;
}

async function saveUserTable(req,res){
    var result;
  const dt = dateTime.create();
  const formatted = dt.format("Y-m-d H:M:S");
  const userTable1 = new UserTable({
    _id: new mongoose.Types.ObjectId(),
    userName: req.body.userName,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    yearOfExp: req.body.yearOfExp,
    salary: req.body.salary,
    createdBy: req.body.createdBy,
    createdOn: formatted,
  });
  await userTable1.save().then(doc=>{
      result = doc;
  });
  return result;
}


async function updateUserTable(req,res){
    var result;
    const dt = dateTime.create();
    const formatted = dt.format("Y-m-d H:M:S");
    await UserTable.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          yearOfExp: req.body.yearOfExp,
          salary: req.body.salary,
          modifiedBy: req.body.modifiedBy,
          modifiedOn: formatted,
        },
      }
    ).exec().then(doc=>{
        result = doc;
    }); 
    return result; 
}

async function deleteUserTable(query){
    // console.log('req.',req.body);
    return UserTable.findByIdAndDelete(query).exec();
}

async function saveUserTableUpload(userTable){
    var result;
  const dt = dateTime.create();
  const formatted = dt.format("Y-m-d H:M:S");
  const userTable1 = new UserTable({
    _id: new mongoose.Types.ObjectId(),
    userName:userTable.userName,
    email:userTable.email,
    address:userTable.address,
    city:userTable.city,
    state:userTable.state,
    country:userTable.country,
    yearOfExp:userTable.yearOfExp,
    salary:userTable.salary,
    createdBy:userTable.createdBy,
    createdOn: formatted,
  });
  await userTable1.save().then(doc=>{
      result = doc;
  });
  return result;
}


module.exports.getAllUser = getAllUser;
module.exports.saveUserTable = saveUserTable;
module.exports.updateUserTable = updateUserTable;
module.exports.deleteUserTable = deleteUserTable;
module.exports.saveUserTableUpload = saveUserTableUpload;