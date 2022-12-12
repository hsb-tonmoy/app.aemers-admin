import * as api from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const notifications_fetch = await api.get(`notifications/`, locals.access);

	const notifications_data = await notifications_fetch.json();

	if (!notifications_fetch.ok) {
		throw error(notifications_fetch.status, 'Error fetching notifications');
	}

	return {
		notifications: notifications_data
	};
}
