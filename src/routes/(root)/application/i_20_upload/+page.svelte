<script>
	import { invalidateAll } from '$app/navigation';
	import { Upload } from '$lib/components/Icons';
	import { Button } from '$lib/components/Form';
	import FileDetailsComponent from '$lib/components/Upload/FileDetailsComponent.svelte';
	import { notificationSuccessToast, notificationToast } from '$lib/NotificationToast';
	import { useMutation } from '@sveltestack/svelte-query';
	import Form from './Form.svelte';

	import { application_status } from '$lib/data/stores';

	let upload_show = false;

	export let data;

	const handleFileDelete = useMutation(
		(id) => {
			let formData = new FormData();
			formData.append('id', id);
			return fetch('/application/i_20_upload?/deleteDocument', {
				method: 'POST',
				body: formData
			});
		},
		{
			onSettled: async (data, error, variables, context) => {
				if (!data.ok || error) {
					notificationToast('Something went wrong, please try again later');
					console.log(await data.json(), error);
				} else {
					notificationSuccessToast(`Document successfully deleted!`);
					invalidateAll();
				}
			}
		}
	);
</script>

<div class="px-14 py-8 xl:px-20 xl:py-12 bg-white rounded-2xl w-full">
	<div class="flex flex-wrap xl:flex-nowrap gap-8 w-full">
		<div class="flex flex-col w-full xl:w-3/4">
			<h2>Upload your I-20 here...</h2>
			<span class="text-lighterText text-sm mb-4"
				>Wait untill you get an I20. After recieving it, upload it here. Watch the video to learn
				more about I-20.</span
			>
			{#if data.i_20 == null}
				{#if upload_show}
					<Form user={data.user} />
				{:else}
					<button
						on:click={() => (upload_show = true)}
						class="self-start inline-flex items-center gap-x-2 text-white bg-primary text-base font-bold px-12 py-4 rounded-xl"
						><span class="w-6 h-6"><Upload /></span>Upload</button
					>
				{/if}
			{:else}
				<FileDetailsComponent
					has_uploaded={true}
					loading={$handleFileDelete.isLoading}
					filename={data.i_20.title}
					url={data.i_20.document}
					status={data.i_20.status}
					date={data.i_20.uploaded_at}
					handleDeleteFile={() => $handleFileDelete.mutate(data.i_20.id)}
				/>
			{/if}
		</div>
		{#if data.i_20 == null}
			{#if !upload_show}
				<div class="w-full xl:w-1/4 flex-shrink">
					<img src="/images/i20+upload.png" alt="I-20 Upload" />
				</div>
			{/if}
		{/if}
	</div>
	{#if $application_status.i_20_upload === 2}
		<div class="flex justify-end">
			<a href="/application/ds_160">
				<Button type="button" classes=" px-6 md:px-10 py-4 mt-6" text="Next Step: DS-160" />
			</a>
		</div>
	{/if}
</div>
<svelte:head>
	<title>app.aemers - I-20 Upload</title>
</svelte:head>

<style lang="postcss">
	h2 {
		@apply text-secondary font-bold text-2xl mb-2;
	}
</style>
