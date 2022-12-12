import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const i_20_fetch = await api.get(`i_20/${locals.user.pk}/`, locals.access);
	const i_20_data = await i_20_fetch.json();

	if (!i_20_fetch.ok) {
		return {
			i_20: null
		};
	}

	return {
		i_20: i_20_data
	};
};

export const actions = {
	upload: async ({ request, locals }) => {
		const data = await request.formData();

		const res = await api.post(`i_20/`, data, locals.access, true);

		if (!res.ok) {
			console.log(res);
			console.log(await res.json());
			throw error(res.status, 'Error uploading i-20');
		}

		return { success: true };
	},
	deleteDocument: async ({ request, locals }) => {
		const values = await request.formData();
		const id = values.get('id');

		const res = await api.del(`i_20/${locals.user.pk}/`, locals.access);

		if (!res.ok) {
			console.log(res);
			console.log(await res.json());
			throw error(res.status, 'Error deleting i-20');
		}

		return { success: true };
	}
};
