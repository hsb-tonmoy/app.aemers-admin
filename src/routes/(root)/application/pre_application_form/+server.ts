import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export async function PATCH({ request, locals }) {
	const values = await request.json();
	const res = await api.patch(`pre_application_form/${locals.user.pk}/`, values, locals.access);

	if (!res.ok) {
		throw error(res.status, 'Something went wrong');
	}
	return new Response(JSON.stringify({ success: true }));
}
