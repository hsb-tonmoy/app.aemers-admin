import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const category_fetch = await api.get(`document_category/`);
	const category_data = await category_fetch.json();

	const document_fetch = await api.get(`document/?user=${locals.user.pk}`, locals.access);
	const document_data = await document_fetch.json();

	if (!category_fetch.ok) {
		throw error(category_fetch.status, 'Error fetching document category data');
	}

	if (!document_fetch.ok) {
		throw error(document_fetch.status, 'Error fetching document data');
	}

	// Group documents by category

	const categories = category_data.map((category) => {
		const documents = document_data.filter((document) => document.category.id === category.id);
		return { ...category, documents };
	});

	return {
		categories
	};
};

export const actions = {
	upload: async ({ request, locals }) => {
		const data = await request.formData();

		const res = await api.post(`document/`, data, locals.access, true);

		if (!res.ok) {
			console.log(res);
			console.log(await res.json());
			throw error(res.status, 'Error uploading document');
		}

		return { success: true };
	},
	editDocument: async ({ request, locals, params }) => {
		const values = await request.formData();
		const res = await api.patch(`document/${values.get('id')}/`, values, locals.access, false);

		if (!res.ok) {
			console.log(res);
			console.log(await res.json());
			throw error(res.status, 'Error editing document');
		}

		return { success: true };
	},
	deleteDocument: async ({ request, locals }) => {
		const values = await request.formData();
		const id = values.get('id');

		const res = await api.del(`document/${id}/`, locals.access);

		if (!res.ok) {
			console.log(res);
			console.log(await res.json());
			throw error(res.status, 'Error deleting document');
		}

		return { success: true };
	}
};
