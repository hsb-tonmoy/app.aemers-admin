import { derived, writable } from 'svelte/store';

export const application_status = writable();
export const application_percentage = derived(application_status, ($application_status) => {
	const items = [
		$application_status.application_started,
		$application_status.file_opening,
		$application_status.pre_application_form,
		$application_status.documents_upload,
		$application_status.applicaton_submission,
		$application_status.i_20_upload,
		$application_status.ds_160_filed,
		$application_status.sevis_payment,
		$application_status.visa_fee_payment,
		$application_status.visa_interview,
		$application_status.pre_departure_session,
		$application_status.welcome_to_usa
	];
	const done = items.filter((item) => item === 2 || item == true).length;

	const percentage = Math.round((((done + 1) / items.length) * 100) / 10) * 10;
	return percentage;
});

export const application_steps = derived(application_status, ($application_status) => {
	return [
		{
			text: 'Open a File',
			path: '/application/file_opening',

			status: $application_status.file_opening
		},
		{
			text: 'Pre-Application Form',
			path: '/application/pre_application_form',

			status: $application_status.pre_application_form
		},
		{
			text: 'Documents Upload',
			path: '/application/documents_upload',

			status: $application_status.documents_upload
		},
		{
			text: 'Application Submission',
			path: '/application/application_submission',

			status: $application_status.application_submission
		},
		{
			text: 'I-20 Upload',
			path: '/application/i_20_upload',

			status: $application_status.i_20_upload
		},
		{
			text: 'DS-160 Filed',
			path: '/application/ds_160',

			status: $application_status.ds_160_filed
		},
		{
			text: 'SEVIS Payment',
			path: '/application/sevis_payment',

			status: $application_status.sevis_payment
		},
		{
			text: 'Visa Fee Payment',
			path: '/application/visa_fee_payment',

			status: $application_status.visa_fee_payment
		},
		{
			text: 'Visa Interview',
			path: '/application/visa_interview',

			status: $application_status.visa_interview
		},
		{
			text: 'Pre-Departure Session',
			path: '/application/pre_departure_session',

			status: $application_status.pre_departure_session
		},
		{
			text: 'Welcome to USA',
			path: '/application/welcome_to_usa',

			status: $application_status.welcome_to_usa
		}
	];
});
