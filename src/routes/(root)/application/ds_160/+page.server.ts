import * as api from '$lib/api';

export const load = async ({ locals }) => {
	const ds_160_fetch = await api.get(`ds_160/${locals.user.pk}/`, locals.access);
	const ds_160_data = await ds_160_fetch.json();

	if (!ds_160_fetch.ok) {
		return {
			ds_160: null
		};
	}

	return {
		ds_160: ds_160_data
	};
};
