import { redirect } from '@sveltejs/kit';
import { auth } from '$lib';

export const POST = async (event) => {
	if (!event.locals.session) {
		throw redirect(302, '/api/auth/login');
	}

	await auth.invalidateSession(event.locals.session.id);
	auth.deleteSessionTokenCookie(event);

	throw redirect(302, '/api/auth/login');
};
