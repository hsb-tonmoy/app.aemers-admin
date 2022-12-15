import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as api from '$lib/api';

export const GET = ( async ({locals}) => {
  const res = await api.get('accounts/', locals.access);
	const data = await res.json();

	if (!res.ok) {
		throw error(500, 'Something went wrong');
	}

	return new Response(JSON.stringify(data));
}) satisfies RequestHandler;
