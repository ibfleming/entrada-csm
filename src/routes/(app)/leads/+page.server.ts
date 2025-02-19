export const load = async (event) => {
	const data = await event.parent();
	return { leads: data.leads };
};
