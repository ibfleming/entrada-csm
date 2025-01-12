import { type Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

import * as auth from '$lib/server/auth.js';

// Server handle for Authentication
const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;

		// Redirect to login if accessing a protected route
		if (!event.url.pathname.startsWith('/auth')) {
			throw redirect(302, '/auth/login');
		}

		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
