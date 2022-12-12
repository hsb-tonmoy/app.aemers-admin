import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const values = await request.json();
	const application_status_update = {
		isEvaluated: true
	};
	const req = await api.patch(`accounts/${locals.user.pk}/`, values, locals.access);
	const update = await api.patch(
		`application_status/${locals.user.pk}/`,
		application_status_update,
		locals.access
	);

	if (req.ok && update.ok) {
		return new Response(JSON.stringify({ success: true }));
	}
	throw error(400, 'Something went wrong');
}
