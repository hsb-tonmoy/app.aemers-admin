import * as api from '$lib/api';

export const load = async ({ locals }) => {
	const visa_interview_fetch = await api.get(`visa_interview/${locals.user.pk}/`, locals.access);
	const visa_interview_data = await visa_interview_fetch.json();

	if (!visa_interview_fetch.ok) {
		return {
			visa_interview: null
		};
	}

	return {
		visa_interview: visa_interview_data
	};
};
