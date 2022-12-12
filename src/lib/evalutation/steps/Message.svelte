<script lang="ts">
	import { goto } from '$app/navigation';
	import { notificationToast } from '$lib/NotificationToast';
	import { validator } from '@felte/validator-yup';
	import { useMutation } from '@sveltestack/svelte-query';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import Buttons from '../Buttons.svelte';
	import StepTemplate from '../StepTemplate.svelte';
	import { evaluationData } from './stores';

	export let steps;
	export let currentIndex: number;

	const submitData = useMutation(
		(formData) => {
			return fetch('/profile/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
		},
		{
			onSettled: async (data, error, variables, context) => {
				if (!data.ok || error) {
					notificationToast('Something went wrong, please try again later');
					console.log(await data.json(), error);
				} else {
					goto('/evaluation/success');
				}
			}
		}
	);

	const schema = yup.object().shape({
		message: yup.string()
	});
	const { form, data, errors, isValid, touched } = createForm({
		initialValues: {
			message: $evaluationData.profile.message || ''
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			$evaluationData.profile.message = values.message;

			$submitData.mutate($evaluationData);
		}
	});
</script>

<StepTemplate heading="Tell us something about yourself!">
	<form use:form>
		<fieldset class="flex flex-wrap gap-4 xl:w-3/4">
			<textarea
				name="message"
				id="message"
				placeholder="Type something here..."
				rows="10"
				class="form-textarea w-full rounded-xl border-borderColor focus:border-primary focus:ring focus:ring-primary"
			/>
		</fieldset>

		<Buttons loading={$submitData.isLoading} {steps} bind:currentIndex />
	</form>
</StepTemplate>
