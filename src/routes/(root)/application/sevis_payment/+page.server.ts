import * as api from '$lib/api';

export const load = async ({ locals }) => {
	const sevis_payment_fetch = await api.get(`sevis_payment/${locals.user.pk}/`, locals.access);
	const sevis_payment_data = await sevis_payment_fetch.json();

	if (!sevis_payment_fetch.ok) {
		return {
			sevis_payment: null
		};
	}

	return {
		sevis_payment: sevis_payment_data
	};
};
