<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Logo from '$lib/dashboard/layout/Sidebar/Logo.svelte';

	const error_messages = {
		404: 'Oops! Page not found',
		500: 'Internal server error'
	};
</script>

<main class="flex flex-col gap-y-20 w-full h-screen xl:pb-60">
	<div class="flex justify-start w-full p-6">
		<Logo />
	</div>
	<div class="flex flex-col flex-1 justify-center items-center w-full">
		<h1
			class="text-primary text-9xl md:text-[10rem] xl:text-[12rem] 2xl:text-[20rem] font-black mb-4"
		>
			{$page.status}
		</h1>
		<h3 class="text-secondary font-bold text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mb-6">
			{error_messages[$page.status]}
		</h3>
		<button
			on:click={() => goto('/')}
			class="text-white bg-primary font-bold text-base md:text-lg px-6 py-3 rounded-xl"
			>Back to Home</button
		>
	</div>
</main>

<style lang="postcss">
	main {
		background-image: url(/images/error_bg_front.png), url(/images/error_bg_back.png);
		background-position: center bottom, center bottom;
		background-size: contain, contain;
		background-repeat: no-repeat, no-repeat;
	}
</style>
