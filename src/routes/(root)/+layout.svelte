<script>
	import { page } from '$app/stores';
	import ApplicationSidebar from '$lib/dashboard/application/layout/Sidebar/Sidebar.svelte';
	import { sidebarState } from '$lib/dashboard/home/stores';
	import Footer from '$lib/dashboard/layout/Footer.svelte';
	import Sidebar from '$lib/dashboard/layout/Sidebar/Sidebar.svelte';
	import { application_status } from '$lib/data/stores';

	export let data;

	$: application_status.set(data.application_status);
</script>

<svelte:head><title>app.aemers.com - US Scholarship Mentoring</title></svelte:head>

<div class="relative flex flex-col">
	<div class="flex w-full h-full bg-bgColor">
		<aside
			class:hidden={$sidebarState}
			class="xl:block fixed xl:sticky left-0 top-0 w-3/4 md:w-2/4 xl:w-[25%] 2xl:w-[15%] h-full z-[5000] overflow-y-auto"
		>
			{#if $page.url.pathname.startsWith('/application')}
				<ApplicationSidebar user={data.profile} />
			{:else}
				<Sidebar />
			{/if}
		</aside>
		<main class="flex-1 px-6 py-10 md:px-10 md:py-16">
			<slot />
		</main>
	</div>
	<Footer />
</div>

<style lang="postcss" global>
	.shepherd-modal-overlay-container {
		opacity: 0.8 !important;
	}
	.shepherd-element {
		@apply rounded-2xl px-6 pt-6 pb-4 !important;
	}
	.shepherd-header {
		@apply bg-white p-0 !important;
	}
	.shepherd-footer {
		@apply p-0 justify-start items-center !important;
	}
	.shepherd-title {
		@apply text-primary text-lg font-bold !important;
	}
	.shepherd-text {
		@apply text-lighterText p-0 text-base mt-1 mb-4 !important;
	}
	.shepherd-button {
		@apply bg-primary hover:bg-primaryDarker text-white font-bold py-2 px-6 rounded-xl !important;
	}
	.shepherd-button-secondary {
		@apply bg-transparent text-lighterText hover:text-lightText hover:bg-transparent font-bold px-2 py-0 !important;
	}

	[data-popper-arrow]::after {
		@apply invisible;
	}
	.shepherd-arrow::before {
		@apply bg-white !important;
	}

	.shepherd-progress-bar {
		margin-right: auto;
		font-size: 14px;
		border-radius: 9px;
		height: 20px;
		width: 100%;
		max-width: 180px;
		padding: 3px;
		background: #d9d9d9;
	}
	.shepherd-progress-bar span {
		display: block;
		background: #7443ff;
		width: 50%;
		height: 100%;
		border-radius: 9px;
	}
</style>
