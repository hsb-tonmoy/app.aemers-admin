<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { sidebarState } from '$lib/dashboard/home/stores';
	import { formSaved } from './stores';

	import { CloudDone, Logout, Menu } from '$lib/components/Icons';
	import { onMount } from 'svelte';

	import { application_steps } from '$lib/data/stores';

	let pageTitle = '';
	let previousURL = null;
	// let nextURL = null;

	// $: $application_steps.map((step, index) => {
	// 	if ($page.url.pathname.includes(step.path)) {
	// 		pageTitle = step.text;
	// 		previousURL = $application_steps[index - 1]?.path;
	// 		nextURL =
	// 			($application_steps[index + 1]?.status >= 1 || $application_steps[index]?.status === 2) &&
	// 			$application_steps[index + 1]?.path;
	// 		return;
	// 	}
	// });

	$: $application_steps.map((step, index) => {
		if ($page.url.pathname.includes(step.path)) {
			pageTitle = step.text;
			return;
		}
	});

	onMount(() => {
		const header = document.getElementById('app-header');

		let sticky = header.offsetTop;

		window.onscroll = function () {
			myFunction();
		};

		function myFunction() {
			if (window.pageYOffset > sticky) {
				header.classList.add('sticky-header');
			} else {
				header.classList.remove('sticky-header');
			}
		}
	});
</script>

<div class="flex flex-col h-full">
	<header
		id="app-header"
		class="top-0 flex flex-col border-b border-borderColor pb-4 mb-6 transition-all ease-in-out duration-150"
	>
		<div class="flex items-center gap-x-6 w-full">
			<button
				on:click={() => ($sidebarState = !$sidebarState)}
				class="lg:hidden w-6 h-6 md:w-10 md:h-10 text-secondary hover:text-primary cursor-pointer"
				><Menu /></button
			>
			<div class="flex flex-col md:flex-row items-center gap-6">
				<h1 class="text-secondary font-bold text-xl md:text-3xl">{pageTitle}</h1>
				{#if $formSaved}
					<div class="flex items-center gap-x-1">
						<span class="block text-primary w-4 h-4 mt-1"><CloudDone /></span><span
							class="text-sm text-secondary">Saved</span
						>
					</div>
				{/if}
			</div>
			<button
				id="exit"
				on:click={() => goto('/')}
				class="ml-auto inline-flex items-center gap-x-2 border border-lighterText text-lighterText hover:text-secondary hover:border-secondary text-sm md:text-base rounded-xl px-4 md:px-5 py-2 bg-transparent font-bold"
			>
				<span class="block h-4 w-4"><Logout /></span>Exit
			</button>
		</div>
	</header>

	<div class="flex-1">
		<slot />
	</div>
</div>

<style global lang="postcss">
	.sticky-header {
		@apply md:sticky top-0 pt-4 px-6 bg-white shadow-sm z-[99999];
	}
</style>
