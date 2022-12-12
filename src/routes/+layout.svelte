<script>
	import { navigating } from '$app/stores';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import '../app.postcss';

	import Loader from '$lib/loading/Loader.svelte';
	import { loading } from '$lib/loading/loading';

	$: loading.setNavigate(!!$navigating);

	const queryClient = new QueryClient();
</script>

<Loader />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
