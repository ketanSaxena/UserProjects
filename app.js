import express from 'express';
import bodyParser from 'body-parser'; // Takes information from POST requests and puts it into an object
import methodOverride from 'method-override'; // Allows for PUT and DELETE methods to be used in browsers where they are not supported
import mongoose from 'mongoose';
import http from 'http';
import UserService from './app/services/userService';
import UserRoutes from './app/routes/userRoutes';

//Configure database
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/todoDB');
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// Configure app
let app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(methodOverride());

// Configure routes
app.get('/', UserService.getIndex);
app.get('/users', UserService.fetchAll);
app.get('/users/:id', UserService.getUserDetails);
app.post('/users', UserService.createNew);
app.delete('/users', UserService.removeUser);


//Start app
app.listen(app.get('port'), function() {
  console.log(`App listening on port ${app.get('port')}!`);
});