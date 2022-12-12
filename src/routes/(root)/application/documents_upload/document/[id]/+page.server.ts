import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const document_fetch = await api.get(`document/${params.id}`, locals.access);
	const document_data = await document_fetch.json();

	if (!document_fetch.ok) {
		throw error(document_fetch.status, 'Error fetching document data');
	}

	return {
		document: document_data
	};
};
