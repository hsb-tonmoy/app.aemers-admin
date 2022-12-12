import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export async function PATCH({ request, locals, params }) {
	const values = await request.json();
	const res = await api.patch(`document/${params.id}/`, values, locals.access, false);

	if (!res.ok) {
		console.log(res);
		console.log(await res.json());
		throw error(res.status, 'Error editing document');
	}

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		statusText: 'OK'
	});
}
