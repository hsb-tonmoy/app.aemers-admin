<script lang="ts">
	import { Spinner } from 'flowbite-svelte';

	export let currentIndex: number = 0;
	export let steps;
	export let loading: boolean = false;
	function handleBack() {
		currentIndex = Math.max(0, currentIndex - 1);
	}
</script>

<div class="flex gap-x-4 mt-20">
	<button
		type="button"
		on:click={handleBack}
		disabled={currentIndex === 0}
		class="border border-borderColor hover:border-secondary bg-white rounded-2xl text-lighterText font-bold text-base md:text-lg px-4 md:px-6 py-3"
		>Go back</button
	>
	<button
		type="submit"
		disabled={loading}
		class="inline-flex items-center border border-primary bg-primary hover:bg-primaryDarker disabled:bg-borderColor disabled:border-borderColor rounded-2xl text-white font-bold text-base md:text-lg px-14 md:px-24 py-3"
		>{currentIndex === steps.length - 1 ? 'Finish!' : 'Next'}
		{#if loading}
			<Spinner class="ml-2" color="white" size="4" />
		{/if}
	</button>
</div>
