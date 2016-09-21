import Role from '../models/Role';

var RoleService = {
	fetchAll: (req, res) => {
    Roles.find({}, (err, roles) => {
      if (err) {
        return res.send(err);
      }
      res.json(roles);
    });
  }
};

export default UserService;