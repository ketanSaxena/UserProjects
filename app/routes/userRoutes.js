import UserService from '../services/userService';

const UserRoutes = [
	route: '/users', method: 'get', handler: UserService.fetchAll,
	route: '/users/:id', method: 'get', handler: UserService.getUserDetails,
	route: '/users', method: 'post', handler: UserService.createNew,
	route: '/users', method: 'delete', handler: UserService.removeUser,
	route: '/users/:id/projects', method: 'post', handler: UserService.assignProject,
];

export default UserRoutes;
