import Projects from '../models/Projects';
import Users from '../models/Users';

var ProjectService = {
	fetchAll: (req, res) => {
    Projects.find({}, (err, users) => {
      if (err) {
        return res.send(err);
      }
      res.json(users);
    });
	},

	createNew: (req, res) => {
		if(req.body) {
			Projects.create(req.body, (err, result) => {
        if (err) {
          return res.send(err);
        }
        res.json({ success: true });
			});	
		}
	},

  getProjectDetails: (req, res) => {
    Projects.findById(req.params.id, (err, project) => {
      if (err) {
        return res.send(err);
      }
      res.json(project);
    })
  },

  getAssignedUsers: (req, res) => {
    Users.find()
      .elemMatch('projects', { project_id: req.params.id })
      .select({ profile: 1 , projects: { $elemMatch: { project_id: req.params.id } }})
      .exec((err, details) => {
        if (err) return res.send(err);
        res.json(details);
      });
  },

	removeProject: (req, res) => {
    var projectId = req.params.id;
    //remove the projectId's reference
    Users.update({}, { $pull: { projects: { project_id: projectId } } },
      {multi: true}, (err, result) => {
      if (err) return res.send(err);
      //remove the project
      Projects.findByIdAndRemove(projectId, (err, result) => {
        if (err) return res.send(err);
        res.json({ success: true });
      });
    })
  }
};

export default ProjectService;