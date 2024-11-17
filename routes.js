export const authRoutes = [
	'/signin',
	'/signup',
	'/forgot-password',
	'/api/auth/signin',
	'/auth/verify-email',
	'/auth/reset-password',
]


// When user is not logged in and tries to access protected routes redirect to login page
export const DEFAULT_REDIRECT_LOGIN_URL = '/signin'

// When user is logged in and tries to access login page redirect to dashboard
export const DEFAULT_REDIRECT_HOME_URL = '/dashboard'