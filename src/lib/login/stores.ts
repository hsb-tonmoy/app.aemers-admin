import { writable } from 'svelte/store';

export const login_message = writable({
	type: '',
	message: ''
});

export const header_bg = writable('#FFFFFF');
