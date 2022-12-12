import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const profile_fetch = await api.get(`accounts/${locals.user.pk}/`, locals.access);
	const profile_data = await profile_fetch.json();

	if (!profile_fetch.ok) {
		throw error(profile_fetch.status, 'Error fetching profile data');
	}

	const pre_application_form_fetch = await api.get(
		`pre_application_form/${locals.user.pk}/`,
		locals.access
	);
	let pre_application_form_data = await pre_application_form_fetch.json();

	if (
		pre_application_form_fetch.status === 404 &&
		pre_application_form_data.detail === 'Not found.'
	) {
		const values = {
			user: locals.user.pk,
			first_name: profile_data.first_name,
			last_name: profile_data.last_name,
			email: profile_data.email,
			phone: profile_data.profile.phone,
			desired_level_of_study: profile_data.profile.degree,
			desired_field_of_study: profile_data.profile.major
		};
		const pre_application_form_fetch = await api.post(
			`pre_application_form/`,
			values,
			locals.access,
			false
		);
		pre_application_form_data = await pre_application_form_fetch.json();
	} else if (!pre_application_form_fetch.ok) {
		throw error(pre_application_form_fetch.status, 'Error fetching Pre-Application Form data');
	}

	return {
		profile_data,
		pre_application_form: pre_application_form_data
	};
}
