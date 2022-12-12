<script>
	import { Upload } from '$lib/components/Icons';
	import Dropzone from 'svelte-file-dropzone';
	import FileDetailsComponent from './FileDetailsComponent.svelte';
	export let files = {
		accepted: []
	};

	let drag_entered = false;

	export let file_dropped = false;

	export let uploading = false;

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...acceptedFiles];
		file_dropped = true;
	}

	function handleRemoveFile() {
		files.accepted.splice(0, 1);
		files.accepted = [...files.accepted];
		file_dropped = false;
	}

	$: dropzone_container_classes = `flex flex-col justify-center items-center rounded-xl px-6 py-12 ${
		drag_entered ? 'dropzone-container-entered' : 'dropzone-container'
	}`;
</script>

{#if !file_dropped}
	<Dropzone
		on:drop={handleFilesSelect}
		on:dragenter={() => (drag_entered = true)}
		on:dragleave={() => (drag_entered = false)}
		multiple={false}
		accept={['.pdf', '.doc', '.docx', '.jpg', '.png', '.jpeg']}
		disableDefaultStyles={true}
		containerClasses={dropzone_container_classes}
	>
		<span class="block w-10 h-10 text-dividerColor mb-2"><Upload /></span>
		<p class="text-lighterText text-center flex flex-wrap md:flex-nowrap justify-center">
			<span>Drop your document here or</span>&nbsp;<button
				type="button"
				class="text-primary font-bold bg-transparent underline">Browse</button
			>
		</p>
		<input id="hidden-input" type="file" class="hidden" />
	</Dropzone>
{:else}
	<FileDetailsComponent
		{uploading}
		file_size={files.accepted[0].size}
		filename={files.accepted[0].name}
		date={Date.now()}
		{handleRemoveFile}
	/>
{/if}

<style global>
	.dropzone-container {
		background-color: #fafafa;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E3D9FFFF' stroke-width='2' stroke-dasharray='9%2c 20%2c 11%2c 21' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	}

	.dropzone-container-entered {
		background-color: #eeeeee;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E3D9FFFF' stroke-width='6' stroke-dasharray='9%2c 20%2c 11%2c 21' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	}
</style>
