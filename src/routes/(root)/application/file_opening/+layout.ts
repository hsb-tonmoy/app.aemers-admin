import { redirect } from '@sveltejs/kit';

export async function load({ url, parent }) {
	const { application_status } = await parent();

	if (application_status.file_opening === 2) {
		if (!url.pathname.includes('complete')) {
			throw redirect(302, '/application/file_opening/complete');
		}
	}
}
