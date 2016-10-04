const CONSTANTS = {
	SALT_ROUNDS: 10,
	ERR_CODES: {
		badRequest: 400,
		unauthorized: 403,
		notFound: 404
	},
	TOKEN_EXPIRY_HOURS: 2,
	RESPONSE_MESSAGES: {
		userNotFound: 'User does not exist',
		wrongPassword: 'Password incorrect',
		superAdminRemoval: 'Cannot remove super admin',
		badRequest: 'Bad Request'
	}
}

export default CONSTANTS;