import Users from '../models/Users';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import CONSTANTS from '../constants';

var _addOrRemoveProject = (userId, updateQuery) => {
  if(userId && updateQuery) {
    Users.findByIdAndUpdate(userId, updateQuery, (err, result) => {
      if (err) return res.send(err);
      res.json({ success: true });
    });
  }
};

var UserService = {
	fetchAll: (req, res) => {
    Users.find({}, (err, users) => {
      if (err) {
        return res.send(err);
      }
      res.json(users);
    });
	},

	createNew: (req, res) => {
    var user = req.body;
		if(user && user.userId) {
      bcrypt.hash(user.password, CONSTANTS.SALT_ROUNDS, function(err, hash) {
        user.password = hash;
        Users.create(req.body, (err, result) => {
          if (err) {
            return res.send(err);
          }
          res.json({ success: true });
        });
      });			
		} else {
      res.status(CONSTANTS.ERR_CODES.badRequest)
        .send({success: false: message: 'Bad Request'});
    }
	},

  updateUser: (req, res) => {
    var userInfo = req.body;
    if(userInfo) {
      Users.findByIdAndUpdate(req.params.id, _.omit(userInfo, 'password'),
        (err, result) => {
        if (err) {
          return res.send(err);
        }
        res.json({ success: true });
      }); 
    }
  },

	getUserDetails: (req, res) => {
    Users.findById(req.params.id)
      .select({ password: 0 })
      .exec((err, details) => {
        if (err) return res.send(err);
        res.json(details);
      });
	},

  getUserProjects: (req, res) => {
    Users.findOne({ '_id': req.params.id }, (err, user) => {
      if (err) {
        return res.send(err);
      } 
      var query = {};
      if(user && !user.is_super_admin) {
        var projectIds = _.pluck(projects, 'project_id');
        query = { _id: { $in: projectIds } };
      }

      Projects.find(query, (err, projects) => {
        if (err) {
          return res.send(err);
        }
        res.json(projects);
      });
    });
  },

  addOrRemoveProject: (req, res) => {
    var params = req.body;
    if(params.id && params.projectId) {
      var updateQuery; 
      if(params.toAdd) {
        updateQuery = { $addToSet: { projects: {
          project_id: params.projectId, role_id: params.roleId
        }}};
      } else {
        updateQuery = { $pull: projects: {project_id: params.projectId}};
      } 
      _addOrRemoveProject(params.id, updateQuery, true);
    } else {
      res.status(CONSTANTS.ERR_CODES.badRequest)
        .send({success: false: message: 'Bad Request'});
    }  
  },

  removeUser: (req, res) => {
    Users.findOne({ user_id: req.body.id }, (err, user) => {
      if (err)
        return res.send(err);
      if(user && user.is_super_admin) {
        res.status(CONSTANTS.ERR_CODES.unauthorized)
        .send({success: false: message: 'Cannot remove super admin'});
      } else {
        Users.findByIdAndRemove(req.body.id, (err, result) => {
          if (err) return res.send(err);
          res.json({ success: true });
        });
      }
    });
    
  };
};

export default UserService;