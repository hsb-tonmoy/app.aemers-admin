<script>
	import { Trash, Upload } from '$lib/components/Icons';
	import { convertDate } from '$lib/convertDate';
	import { Spinner } from 'flowbite-svelte';
	import RejectionNote from './RejectionNote.svelte';

	export let has_uploaded = false;
	export let uploading = false;
	export let filename;
	export let url = '';
	export let status;
	export let date;
	export let deleting = false;
	export let handleRemoveFile;
	export let handleDeleteFile;

	export let file_size;

	export let category_name = '',
		rejection_notes = '';

	let statusClass = '';
	let statusText = '';

	$: {
		if (status === 0) {
			statusText = 'Pending';
			statusClass = 'text-amber-600';
		} else if (status === 1) {
			statusText = 'Accepted';
			statusClass = 'text-greenSignal';
		} else if (status === 2) {
			statusText = 'Rejected';
			statusClass = 'text-redSignal';
		} else {
			statusText = '-';
			statusClass = 'text-secondary';
		}
	}

	function handleDel() {
		if (has_uploaded) {
			handleDeleteFile();
		} else {
			handleRemoveFile();
		}
	}
</script>

<div
	class="flex flex-col gap-y-6 md:grid md:grid-cols-2 xl:grid-cols-4 xl:justify-items-center gap-x-4 rounded-xl px-6 py-8 md:px-10 md:py-12 bg-[#fafafa]"
>
	<div class="prop-container">
		<span class="prop-header">File Name</span>
		<a href={url} class="text-primary font-bold text-base underline">{filename}</a>
		{#if file_size && file_size > 2000000}
			<span class="text-redSignal text-xs">File size cannot be more than 2 MB</span>
		{/if}
	</div>
	<div class="prop-container">
		<span class="prop-header">Status</span>
		<span class={`font-bold text-base ${statusClass}`}>{statusText}</span>
	</div>
	<div class="prop-container">
		<span class="prop-header">Upload Date</span>
		<span class="text-secondary text-base">{convertDate(date)}</span>
	</div>
	{#if status != 1}
		<div class="flex gap-x-4 self-end col-span-4 md:col-span-1">
			<button
				type="button"
				disabled={deleting}
				on:click={handleDel}
				class="inline-flex items-center gap-x-2 font-bold {has_uploaded
					? 'bg-redSignal hover:bg-red-600 text-white'
					: 'hover:bg-redSignal text-redSignal hover:text-white'} border border-redSignal text-base rounded-lg px-5 py-3"
			>
				{#if deleting}
					<Spinner currentFill="red" size="3" />
				{:else}
					<span class="w-4 h-4">
						<Trash />
					</span>
				{/if}</button
			>
			{#if !has_uploaded}
				<button
					disabled={uploading || (file_size && file_size > 2000000)}
					class="inline-flex items-center gap-x-2 font-bold text-white text-sm 2xl:text-base bg-primary hover:bg-primaryDarker border border-primary disabled:bg-primary/60 disabled:border-primary/60 rounded-xl px-6 py-3"
				>
					{#if uploading}
						<Spinner currentFill="white" size="3" />
					{:else}
						<span class="w-4 h-4 2xl:w-6 2xl:h-6 mt-1">
							<Upload />
						</span>
					{/if} Submit</button
				>
			{/if}
		</div>
	{/if}
	{#if status === 2 && rejection_notes}
		<div class="col-span-4 w-full">
			<RejectionNote {deleting} {handleDeleteFile} {category_name} {rejection_notes} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.prop-container {
		@apply flex flex-col md:gap-y-3;
	}
	.prop-header {
		@apply text-lighterText font-medium text-base;
	}
</style>
