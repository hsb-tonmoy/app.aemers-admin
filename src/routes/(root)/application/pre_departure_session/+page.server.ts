import * as api from '$lib/api';

export async function load({ locals }) {
	const participation = await api.get(
		`pre_departure_sessions_participants/${locals.user.pk}/`,
		locals.access
	);
	if (!participation.ok && participation.status === 404) {
		const pre_departure_sessions = await api.get(`pre_departure_sessions/`, locals.access);
		const pre_departure_sessions_data = await pre_departure_sessions.json();

		return {
			pre_departure_sessions: pre_departure_sessions_data,
			participation: null
		};
	} else {
		const participation_data = await participation.json();
		return {
			pre_departure_sessions: null,
			participation: participation_data
		};
	}
}
