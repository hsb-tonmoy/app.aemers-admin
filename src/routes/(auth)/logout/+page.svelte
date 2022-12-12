<script>
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		window.location.href = '/logout';
		if (data.logout) {
			window.location.href = '/login';
		}
	});
</script>
