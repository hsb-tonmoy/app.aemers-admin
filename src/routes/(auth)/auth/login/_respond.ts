import { json } from '@sveltejs/kit';
import jwt_decode from 'jwt-decode';

export function respond(body) {
	if (!body.access_token) {
		return json(body, { status: 400 });
	}

	const access_token = JSON.stringify(body.access_token);
	const access_decoded = jwt_decode(access_token);

	const refresh_token = JSON.stringify(body.refresh_token);
	const refresh_decoded = jwt_decode(refresh_token);

	const user = JSON.stringify(body.user);
	const value = Buffer.from(user).toString('base64');

	const headers = new Headers();

	headers.append(
		'Set-Cookie',
		`access=${access_token}; Path=/; Expires=${new Date(access_decoded.exp * 1000)}; HttpOnly`
	);
	headers.append(
		'Set-Cookie',
		`refresh=${refresh_token}; Path=/; Expires=${new Date(refresh_decoded.exp * 1000)}; HttpOnly`
	);
	headers.append(
		'Set-Cookie',
		`user=${value}; Path=/; Expires=${new Date(refresh_decoded.exp * 1000)}; HttpOnly`
	);

	return new Response(JSON.stringify(body), {
		headers
	});
}
