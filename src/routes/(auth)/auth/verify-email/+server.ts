import * as api from '$lib/api';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { key } = await request.json();

	const res = await api.post('auth/registration/verify-email/', { key });

	const data = await res.json();

	if (data.detail === 'ok') {
		return json(data, { status: 200 });
	}

	return json(data, {
		status: 400
	});
}
