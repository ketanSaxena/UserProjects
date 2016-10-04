import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import http from 'http';
import UserService from './app/services/userService';
import RoleService from './app/services/roleService';
import ProjectService from './app/services/projectService';
import AuthService from './app/services/authService';
import jwt from 'jwt-simple';
import config from './app/config'
//Configure database
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/'+ config.dbName);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// Configure app
let app = express();
app.set('port', process.env.PORT || config.defaultPort);
app.use(bodyParser.json());
app.use(methodOverride());


// Configure routes
//TODO: saturate routes in separate files according to modules
app.post('/authentication', AuthService.login);

//TODO: write middleware to check token in request header
app.get('/', UserService.getIndex);
app.get('/users', UserService.fetchAll);
app.get('/users/:id', UserService.getUserDetails);
app.put('/users/:id', UserService.updateUser);
app.get('/users/:id/projects', UserService.getUserProjects);
app.put('/users/:id/projects', UserService.addOrRemoveProject);
app.post('/users', UserService.createNew);
app.delete('/users', UserService.removeUser);

app.get('/projects', ProjectService.fetchAll);
app.get('/project/:id', ProjectService.getProjectDetails);
app.post('/projects', ProjectService.createNew);
app.get('/project/:id/users', ProjectService.getAssignedUsers);
app.delete('/projects', ProjectService.removeProject);

app.get('/roles', RoleService.fetchAll);

//Start app
app.listen(app.get('port'), function() {
  console.log(`App listening on port ${app.get('port')}!`);
});