import * as api from '$lib/api';
import { respond } from './_respond';

export async function POST({ request }) {
	const json = await request.json();
	const body = await api.post('auth/login/', {
		email: json.email,
		password: json.password
	});
	const data = await body.json();

	return respond(data);
}
