<script>
	import { goto } from '$app/navigation';
	import { header_bg } from '$lib/login/stores';
	import { Success } from '$lib/components/Icons';
	import { Button } from '$lib/components/Form';
	$header_bg = '#F9F6FF';
</script>

<svelte:head>
	<title>app.aemers.com - Password Change Successful!</title>
</svelte:head>

<section class="flex flex-1 justify-center items-center bg-bgColor">
	<div
		class="flex flex-col items-center justify-center p-12 md:px-40 md:py-32 lg:px-60 lg:py-52 bg-white rounded-3xl"
	>
		<span class=""><Success /></span>

		<h2 class="text-3xl font-bold text-center">Your pasword was changed successfully!</h2>
		<Button on:click={() => goto('/login')} type="button" text="Login" classes="mt-6 px-12 py-3" />
	</div>
</section>
