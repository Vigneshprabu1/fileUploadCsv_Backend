
/**
 * Designed By:Vigneshprabu S
 * date:
 * modified:-
 * File Name: UserTable Router
 */

const express = require('express');
const routes = express.Router();
const UserTableController = require('../controller/UserTableController');

routes.get('/export',UserTableController.getAllUserTableExport);
routes.post('/fileUpload', UserTableController.fileUpload);
routes.get('/',UserTableController.getAllUser);
routes.post('/',UserTableController.saveUserTable);
routes.patch('/',UserTableController.updateUserTable);
routes.post('/deleteUser',UserTableController.deleteUserTable);

module.exports = routes;