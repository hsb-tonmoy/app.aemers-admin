<script lang="ts">
	import { Error, RadioNoIcon } from '$lib/components/Form';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import Buttons from '../Buttons.svelte';
	import StepTemplate from '../StepTemplate.svelte';
	import { evaluationData } from './stores';
	import { education_level } from '../../../routes/(root)/application/pre_application_form/constants';

	export let steps;
	export let currentIndex: number;

	function handleNext() {
		currentIndex = Math.min(steps.length - 1, currentIndex + 1);
	}

	const schema = yup.object().shape({
		degree: yup.string().required('Please choose a degree')
	});
	const { form, data, errors, isValid } = createForm({
		initialValues: {
			degree: $evaluationData.profile.degree || ''
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			$evaluationData.profile.degree = values.degree;
			handleNext();
		}
	});
</script>

<StepTemplate heading="Select the Degree you wish to achieve!">
	<form use:form>
		<fieldset class="flex flex-wrap gap-6">
			{#each education_level as level}
				<RadioNoIcon name="degree" value={level.value}>{level.label}</RadioNoIcon>
			{/each}
		</fieldset>
		{#if $errors.degree}
			<Error classes="self-start mt-4" message={$errors.degree} />
		{/if}
		<Buttons {steps} bind:currentIndex />
	</form>
</StepTemplate>
