import Users from '../models/Users';

var _addOrRemoveProject = (userId, projectId, toAdd) => {
  if(userId && projectId) {
    var query = {[toAdd ? '$addToSet' : '$pull']: { projects: projectId }};
    Users.findByIdAndUpdate(userId, query, (err, result) => {
      if (err) return res.send(err);
      res.json({ success: true });
    });
    } else {
      throw new Error('Bad Request');
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
		if(req.body) {
			Users.create(req.body, (err, result) => {
        if (err) {
          return res.send(err);
        }
        return true;
			});	
		}
	},

  updateUser: (req, res) => {
    if(req.body) {
      Users.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if (err) {
          return res.send(err);
        }
        res.json({ success: true });
      }); 
    }
  },

	getUserDetails: (req, res) => {
    Users.findById(req.params.id)
      .select({projects: 1, profile: 1})
      .exec((err, details) => {
        if (err) return res.send(err);
        res.json(details);
      });
	},

  getUserProjects: (req, res) => {
    Users.find({ '_id': req.params.id })
      .select({projects: 1})
      .exec(function (err, userProjects) {
        if (err) return res.send(err);
        res.json(userProjects);
      });
  },

  assignProject: (req, res) => {
    var params = req.params;
    _addOrRemoveProject(params.id, params.project_id, true);
  },

  unassignProject: (req, res) => {
    var params = req.params;
    _addOrRemoveProject(params.id, params.project_id);
  },

  removeUser: (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) return res.send(err);
      res.json({ success: true });
    });
  };
};

export default UserService;