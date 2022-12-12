import * as api from '$lib/api';
import { error, json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const data = await request.json();

	const res = await api.post('pre_departure_sessions_participants/', data, locals.access, false);
	if (res.status === 201) {
		return json({ ok: true });
	}
	console.log(res, await res.json());
	throw error(res.status, res.statusText);
}
