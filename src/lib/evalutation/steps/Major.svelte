<script lang="ts">
	import { Error, RadioIcon } from '$lib/components/Form';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import Buttons from '../Buttons.svelte';
	import StepTemplate from '../StepTemplate.svelte';
	import { evaluationData } from './stores';

	import {
		Business,
		Computer,
		Engineering,
		GraduationCap,
		Health_Sciences,
		Humanities,
		Sciences,
		Social_Sciences
	} from '$lib/components/Icons';

	export let steps;
	export let currentIndex: number;

	function handleNext() {
		currentIndex = Math.min(steps.length - 1, currentIndex + 1);
	}

	const schema = yup.object().shape({
		major: yup.string().required('Please choose a major')
	});
	const { form, data, errors, isValid } = createForm({
		initialValues: {
			major: $evaluationData.profile.major || ''
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			$evaluationData.profile.major = values.major;
			handleNext();
		}
	});

	const options = [
		{ label: 'Computer Science', name: 'major', value: 'computer_science', icon: Computer },
		{ label: 'Engineering', name: 'major', value: 'engineering', icon: Engineering },
		{ label: 'Sciences', name: 'major', value: 'sciences', icon: Sciences },
		{ label: 'Business Studies', name: 'major', value: 'business_studies', icon: Business },
		{ label: 'Humanities', name: 'major', value: 'humanities', icon: Humanities },
		{ label: 'Social Sciences', name: 'major', value: 'social_sciences', icon: Social_Sciences },
		{ label: 'Health Sciences', name: 'major', value: 'health_sciences', icon: Health_Sciences },
		{ label: 'Other', name: 'major', value: 'other', icon: GraduationCap }
	];
</script>

<StepTemplate heading="Select the Major you wish to study!">
	<form use:form>
		<fieldset class="flex flex-wrap gap-6">
			{#each options as option}
				<RadioIcon name={option.name} value={option.label} icon={option.icon}
					>{option.label}</RadioIcon
				>
			{/each}
		</fieldset>
		{#if $errors.major}
			<Error classes="self-start mt-4" message={$errors.major} />
		{/if}
		<Buttons {steps} bind:currentIndex />
	</form>
</StepTemplate>
