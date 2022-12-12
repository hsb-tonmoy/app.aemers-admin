import * as api from '$lib/api';

export const load = async ({ locals }) => {
	const visa_fee_payment_fetch = await api.get(
		`visa_fee_payment/${locals.user.pk}/`,
		locals.access
	);
	const visa_fee_payment_data = await visa_fee_payment_fetch.json();

	if (!visa_fee_payment_fetch.ok) {
		return {
			visa_fee_payment: null
		};
	}

	return {
		visa_fee_payment: visa_fee_payment_data
	};
};
