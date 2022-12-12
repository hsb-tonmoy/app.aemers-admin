import * as api from '$lib/api.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const req = await request.json();

	const res = await api.post('auth/password/reset/', req);
	const data = await res.json();

	if (data.errors) {
		return json(data, { status: 400 });
	}

	return json(data, { status: 200 });
}
