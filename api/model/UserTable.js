/**
 * Designed By:Vigneshprabu S
 * date:
 * modified:-
 * File Name: UserTable Model
 */

const mongoose =   require('mongoose');

const userTableSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    userName:String,
    email:String,
    address:String,
    city:String,
    state:String,
    country:String,
    yearOfExp:String,
    salary:String,
    createdBy: String,
    createdOn: String,
    modifiedBy: String,
    modifiedOn: String,
});

module.exports = mongoose.model('UserTable',userTableSchema);