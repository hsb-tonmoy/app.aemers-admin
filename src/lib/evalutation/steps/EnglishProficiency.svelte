<script lang="ts">
	import { Error, Input } from '$lib/components/Form';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import Buttons from '../Buttons.svelte';
	import StepTemplate from '../StepTemplate.svelte';
	import { evaluationData } from './stores';

	export let steps;
	export let currentIndex: number;

	function handleNext() {
		currentIndex = Math.min(steps.length - 1, currentIndex + 1);
	}

	const items = [
		{ value: 'ielts', label: 'IELTS' },
		{ value: 'toefl', label: 'TOEFL' },
		{ value: 'duolingo', label: 'Duolingo' },
		{ value: 'plan-to', label: 'Wish to Take IELTS' },
		{ value: 'no-test', label: 'Wish to get enrolled with no test' },
		{ value: 'moi', label: 'Wish to get enrolled with Medium of Instruction' }
	];

	const schema = yup.object().shape({
		english_proficiency: yup.string().required('Please choose an option'),
		english_proficiency_score: yup.string().when('english_proficiency', {
			is: (value) => value !== 'plan-to' && value !== 'no-test' && value !== 'moi',
			then: yup.string().required('Please enter your score')
		})
	});
	const { form, data, errors, isValid, touched } = createForm({
		initialValues: {
			english_proficiency: $evaluationData.profile.english_proficiency || '',
			english_proficiency_score: $evaluationData.profile.english_proficiency_score || ''
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			$evaluationData.profile.english_proficiency = values.english_proficiency;
			$evaluationData.profile.english_proficiency_score = values.english_proficiency_score || '';
			handleNext();
		}
	});
</script>

<StepTemplate heading="Tell us about your language proficiency test">
	<form use:form>
		<fieldset class="flex flex-wrap md:flex-nowrap gap-4">
			<select
				id="english_proficiency"
				name="english_proficiency"
				class="form-select border border-borderColor focus:ring-primary focus:border-primary rounded-xl block w-80 md:w-[40rem] py-4 px-5"
			>
				<option disabled selected value="">Pick your preference</option>
				{#each items as item}
					<option value={item.value}>{item.label}</option>
				{/each}
			</select>
			{#if $data.english_proficiency === 'ielts' || $data.english_proficiency === 'toefl' || $data.english_proficiency === 'duolingo'}
				<Input
					id="english_proficiency_score"
					name="english_proficiency_score"
					type="text"
					placeholder="Score"
					touched={$touched.english_proficiency_score}
					error={$errors.english_proficiency_score}
				/>
			{/if}
		</fieldset>
		{#if $errors.english_proficiency}
			<Error classes="self-start mt-4" message={$errors.english_proficiency} />
		{/if}
		{#if $errors.english_proficiency_score}
			<Error classes="self-start mt-4" message={$errors.english_proficiency_score} />
		{/if}
		<Buttons {steps} bind:currentIndex />
	</form>
</StepTemplate>
