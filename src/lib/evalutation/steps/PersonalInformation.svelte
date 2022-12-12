<script lang="ts">
	import { Error, Input, Label } from '$lib/components/Form';
	import { countries } from '$lib/data/countries';
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

	const schema = yup.object().shape({
		first_name: yup
			.string()
			.required('First Name is required')
			.matches(/^(.*)?\S+(.*)?$/, 'Field cannot be empty'),
		last_name: yup
			.string()
			.required('Last Name is required')
			.matches(/^(.*)?\S+(.*)?$/, 'Field cannot be empty'),
		phone: yup
			.string()
			.required('Phone Number is required')
			.matches(/^(.*)?\S+(.*)?$/, 'Field cannot be empty'),
		country: yup.string().required('Country is required').trim()
	});
	const { form, data, errors, isValid, touched } = createForm({
		initialValues: {
			first_name: $evaluationData.first_name || '',
			last_name: $evaluationData.last_name || '',
			phone: $evaluationData.profile.phone || '',
			country: $evaluationData.profile.country || 'Bangladesh'
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			$evaluationData.first_name = values.first_name;
			$evaluationData.last_name = values.last_name;
			$evaluationData.profile.phone = values.phone;
			$evaluationData.profile.country = values.country;

			handleNext();
		}
	});
</script>

<StepTemplate heading="Personal Information">
	<form use:form>
		<fieldset class="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6">
			<div class="">
				<Label label_for="first_name" label="First Name" />
				<Input
					id="first_name"
					name="first_name"
					type="text"
					placeholder="Ex. Abdullah"
					touched={$touched.first_name}
					error={$errors.first_name}
					classes="w-full"
				/>
				{#if $errors.first_name}
					<Error classes="self-start" message={$errors.first_name} />
				{/if}
			</div>
			<div class="">
				<Label label_for="last_name" label="Last Name" />
				<Input
					id="last_name"
					name="last_name"
					type="text"
					placeholder="Ex. Abdullah"
					touched={$touched.last_name}
					error={$errors.last_name}
					classes="w-full"
				/>
				{#if $errors.last_name}
					<Error classes="self-start" message={$errors.last_name} />
				{/if}
			</div>

			<div class="">
				<Label label_for="phone" label="Phone Number" />
				<Input
					id="phone"
					name="phone"
					type="text"
					placeholder="+8801XXXXXXXXX"
					touched={$touched.phone}
					error={$errors.phone}
					classes="w-full"
				/>
				{#if $errors.phone}
					<Error classes="self-start" message={$errors.phone} />
				{/if}
			</div>
			<div class="">
				<Label label_for="country" label="Country" />
				<select
					name="country"
					placeholder="Bangladesh"
					id="country"
					class={`form-select w-full border border-borderColor focus:border-primary focus:ring focus:ring-primary ${
						$errors.country ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''
					} ${
						$touched.country && !$errors.country
							? 'border-2 border-greenSignal ring-greenSignal'
							: ''
					} text-sm rounded-xl block py-4 px-5`}
				>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</select>
				{#if $errors.country}
					<Error classes="self-start" message={$errors.country} />
				{/if}
			</div>
		</fieldset>
		<Buttons {steps} bind:currentIndex />
	</form>
</StepTemplate>
