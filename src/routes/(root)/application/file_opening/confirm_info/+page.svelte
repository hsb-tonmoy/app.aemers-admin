<script>
	import { goto } from '$app/navigation';
	import { Button, Error, Input, Label } from '$lib/components/Form';
	import { countries } from '$lib/data/countries';
	import { notificationSuccessToast, notificationToast } from '$lib/NotificationToast';
	import { validator } from '@felte/validator-yup';
	import { useMutation } from '@sveltestack/svelte-query';
	import { createForm } from 'felte';
	import { Tooltip } from 'flowbite-svelte';
	import * as yup from 'yup';

	export let data;

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
					notificationSuccessToast('Changes successfully saved!');
				}
			}
		}
	);

	const schema = yup.object().shape({
		first_name: yup.string().required('First Name is required').trim(),
		last_name: yup.string().required('Last Name is required').trim(),
		profile: yup.object({
			phone: yup.string().required('Phone Number is required').trim(),
			country: yup.string().required('Country is required').trim()
		})
	});

	const { form, errors, isValid, isDirty, interacted } = createForm({
		initialValues: {
			first_name: data.profile_data.first_name || '',
			last_name: data.profile_data.last_name || '',
			email: data.profile_data.email || '',
			profile: {
				phone: data.profile_data.profile.phone || '',
				country: data.profile_data.profile.country || ''
			}
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			if ($isDirty) {
				delete values.email;
				$submitData.mutate(values);
			}
			goto('/application/file_opening/terms_conditions');
		}
	});
</script>

<div class="flex flex-col mx-auto px-10 py-6 xl:px-20 xl:py-12 bg-white rounded-2xl">
	<h3 class="text-secondary font-bold text-2xl mb-2">Confirm Your Information</h3>
	<p class="text-lightText text-sm mb-10">
		Make sure your information is correct before you continue.
	</p>
	<form class="flex flex-col" use:form>
		<fieldset class="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6">
			<div class="">
				<Label label_for="first_name" label="First Name" />
				<Input
					id="first_name"
					name="first_name"
					type="text"
					placeholder="Ex. Abdullah"
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
					error={$errors.last_name}
					classes="w-full"
				/>
				{#if $errors.last_name}
					<Error classes="self-start" message={$errors.last_name} />
				{/if}
			</div>
			<div class="">
				<Label label_for="email" label="Email" />
				<Input id="email" name="email" type="text" disabled={true} classes="w-full" />
				<Tooltip style="custom" color="bg-primary text-white px-3 py-2" triggeredBy="#email"
					>Please contact <a href="mailto:support@aemers.com">support@aemers.com</a> for email change</Tooltip
				>
			</div>

			<div class="">
				<Label label_for="profile.phone" label="Phone Number" />
				<Input
					id="profile.phone"
					name="profile.phone"
					type="text"
					placeholder="+8801XXXXXXXXX"
					error={$errors.profile.phone}
					classes="w-full"
				/>
				{#if $errors.profile.phone}
					<Error classes="self-start" message={$errors.profile.phone} />
				{/if}
			</div>
			<div class="">
				<Label label_for="profile.country" label="Country" />
				<select
					name="profile.country"
					placeholder="Bangladesh"
					id="profile.country"
					class={`form-select w-full border border-borderColor focus:border-primary focus:ring focus:ring-primary ${
						$errors.profile.country ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''
					}  text-sm rounded-xl block py-4 px-5`}
				>
					<option value="" disabled selected hidden>Bangladesh</option>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</select>
				{#if $errors.profile.country}
					<Error classes="self-start" message={$errors.profile.country} />
				{/if}
			</div>
		</fieldset>
		<div class="flex justify-between items-center">
			<Button
				on:click={() => goto('/application/file_opening/open_a_file')}
				type="button"
				text="Go Back"
				classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start bg-lightText text-white"
			/>
			<Button
				type="submit"
				disabled={!$isValid}
				loading={$submitData.isLoading}
				text="Confirm"
				classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start hover:bg-primaryDarker"
			/>
		</div>
	</form>
</div>
