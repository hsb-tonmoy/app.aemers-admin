import * as api from '$lib/api';
import { error, json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const values = await request.json();
	const req = await api.post(`auth/password/change/`, values, locals.access);
	const res = await req.json();

	if (req.ok) {
		return new Response(JSON.stringify({ success: true }));
	}
	if (res.new_password2) {
		throw error(400, 'Incorrect old password.');
	} else {
		throw error(500, 'Something went wrong.');
	}
}
