import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib';

/* 
	-- Is this necessary?

	// (2) Check if the database connection is alive
	const dbConnection = await dbUtils.checkDatabaseConnection(db);
	if (!dbConnection) {
		event.setHeaders({ 'x-db-connection': 'error' });
		console.error('Database connection failed');
		return resolve(event);
	} 
*/

const handleAuth: Handle = async ({ event, resolve }) => {
	// (1) Check if the user is authenticated
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		console.error('No session token found');
		return resolve(event);
	}

	// (3) Validate the session token
	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	//console.log('Session validated for user:', user?.username);
	return resolve(event);
};

export const handle: Handle = handleAuth;
