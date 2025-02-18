import { redirect } from '@sveltejs/kit';

/*
	This is a server-side route that will be called when the user navigates to '/'.
	In this event, we check if they are authorized and if not go to the login page.
	Otherwise, we redirect them to the dashboard which is the main page of the app.
*/

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/api/auth/login');
	}
	return redirect(302, '/dashboard');
};
