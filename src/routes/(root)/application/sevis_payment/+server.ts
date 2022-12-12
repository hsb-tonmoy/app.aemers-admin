import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export const PATCH = async ({ request, locals }) => {
	const data = await request.json();
	const res = await api.patch(`sevis_payment/${locals.user.pk}/`, data, locals.access, false);

	if (!res.ok) {
		console.log(res);
		console.log(await res.json());
		throw error(res.status, 'Error updating SEVIS Payment');
	}

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		statusText: 'OK'
	});
};
