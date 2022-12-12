import { writable } from 'svelte/store';

export const evaluationData = writable({
	first_name: '',
	last_name: '',
	profile: {
		phone: '',
		country: '',
		degree: '',
		major: '',
		english_proficiency: '',
		english_proficiency_score: '',
		message: ''
	}
});
