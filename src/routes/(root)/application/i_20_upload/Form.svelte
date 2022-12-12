<script>
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/Form/Button.svelte';
	import UploadComponent from '$lib/components/Upload/UploadComponent.svelte';
	import { notificationSuccessToast, notificationToast } from '$lib/NotificationToast';
	import { useMutation } from '@sveltestack/svelte-query';
	import { createForm } from 'felte';

	export let user;

	let files = {
		accepted: []
	};

	const submitData = useMutation(
		(values) => {
			let formData = new FormData();
			formData.append('document', values.document);
			formData.append('title', values.title);
			formData.append('user', user.pk);

			return fetch('/application/i_20_upload?/upload', {
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
					notificationSuccessToast(`I-20 successfully uploaded!`);
					invalidateAll();
				}
			}
		}
	);

	const { form, data, isValid } = createForm({
		initialValues: {
			title: '',
			document: null
		},
		onSubmit: async (values) => {
			$submitData.mutate(values);
		}
	});

	$: $data.document = files.accepted && files.accepted[0];
	$: $data.title = $data.document && files.accepted[0].name;
</script>

<form use:form>
	<UploadComponent bind:files />
	{#if files.accepted.length > 0}
		<Button
			loading={$submitData.isLoading}
			disabled={$submitData.isLoading}
			text="Upload"
			classes="mt-4 self-end px-6 py-3"
		/>
	{/if}
</form>
