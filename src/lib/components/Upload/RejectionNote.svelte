<script>
	import { Spinner } from 'flowbite-svelte';
	import { RedCircularCross, Upload } from '$lib/components/Icons';

	export let category_name = '',
		rejection_notes = '',
		deleting = false;

	export let handleDeleteFile;
</script>

<div class="flex flex-col gap-y-4 px-6 py-8 md:px-10 md:py-12 rounded-xl bg-[#FEEEEE]">
	<div class="flex items-center gap-x-2">
		<span class="w-10 h-10 block"><RedCircularCross /></span>
		<div class="flex flex-col">
			<span class="font-bold text-secondary text-base md:text-lg"
				>'{category_name}' is rejected</span
			>
			<span class="text-lighterText text-xs">4:22 PM, 28/07/2022</span>
		</div>
	</div>
	<div class="flex flex-col">
		<span class="font-bold text-secondary text-sm mb-1">Message from the counselor:</span>
		<span class="text-secondary text-xs">{rejection_notes}</span>
	</div>
	<button
		on:click={handleDeleteFile}
		class="self-start inline-flex items-center gap-x-2 font-bold text-white text-sm 2xl:text-base bg-primary hover:bg-primaryDarker border border-primary disabled:bg-primary/60 disabled:border-primary/60 rounded-xl px-6 py-2"
	>
		{#if deleting}
			<Spinner currentFill="white" size="3" />
		{:else}
			<span class="w-4 h-4 2xl:w-6 2xl:h-6 mt-1">
				<Upload />
			</span>
		{/if}
		Upload New</button
	>
</div>
