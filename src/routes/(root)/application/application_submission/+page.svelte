<script>
	import Complete from './Complete.svelte';
	import Pending from './Pending.svelte';
	export let data;
</script>

<svelte:head>
	<title>app.aemers - Application Submission</title>
</svelte:head>

<div
	class="flex flex-col justify-center items-center px-10 py-8 xl:px-20 xl:py-12 bg-white rounded-2xl w-full"
>
	{#if data.application_status.application_submission != 2}
		<Pending />
	{:else}
		<Complete />
	{/if}
</div>
