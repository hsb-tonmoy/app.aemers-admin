import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const profile_fetch = await api.get(`accounts/${locals.user.pk}/`, locals.access);
	const profile_data = await profile_fetch.json();

	if (!profile_fetch.ok) {
		throw error(profile_fetch.status, 'Error fetching profile data');
	}

	return {
		profile_data: profile_data
	};
}
