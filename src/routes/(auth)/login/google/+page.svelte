<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	import { login_message } from '$lib/login/stores';

	let query = decodeURIComponent($page.url.search);

	onMount(async () => {
		const res = await fetch(`/auth/google${query}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();

		if (res.ok && data.user) {
			window.location.href = '/';
		} else if (!res.ok) {
			if (
				data.non_field_errors &&
				data.non_field_errors[0] == 'User is already registered with this e-mail address.'
			) {
				$login_message.type = 'error';
				$login_message.message =
					'An account already exists with this e-mail address. Please use the form below to login.';
			}

			goto('/login');
		} else {
			console.log(data);
			throw error(500, 'Something went wrong');
		}
	});
</script>
