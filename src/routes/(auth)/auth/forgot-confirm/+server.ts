import * as api from '$lib/api.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const req = await request.json();

	const res = await api.post('auth/password/reset/confirm/', req);

	const data = await res.json();

	if (res.status === 400) {
		return json(data, {
			status: 400
		});
	}

	return json(data, { status: 200 });
}
