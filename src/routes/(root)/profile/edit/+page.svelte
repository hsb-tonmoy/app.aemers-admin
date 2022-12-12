<script>
	import { goto, invalidateAll } from '$app/navigation';
	import { Button, Error, Input, Label } from '$lib/components/Form';
	import { Cross, Trash } from '$lib/components/Icons';
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
					invalidateAll();
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
			delete values.email;
			$submitData.mutate(values);
		}
	});
</script>

<div class="relative bg-white rounded-2xl px-10 py-12 md:px-16 md:py-20">
	<button
		on:click={() => goto('/')}
		class="absolute right-8 top-10 flex justify-center items-center bg-borderColor rounded-full cursor-pointer"
	>
		<span class="block text-primary p-1 w-8 h-8 md:w-12 md:h-12"><Cross /></span>
	</button>
	<h6 class="text-3xl font-bold ml-4 mb-6">Personal Info</h6>
	<div class="flex items-center gap-x-10 mb-10">
		<div class="avatar">
			<img
				class="w-32 md:w-48"
				src={`https://ui-avatars.com/api/?name=${data.profile.first_name}+${data.profile.last_name}
				}&background=FFA26D&format=svg&rounded=true&bold=true`}
				alt={data.profile.first_name + ' ' + data.profile.last_name}
			/>
		</div>
		<div class="buttons flex flex-col gap-y-4 font-bold text-sm md:text-base">
			<button
				class="bg-primary hover:bg-primaryDarker border border-primary text-white rounded-xl px-4 py-3"
				>Change Photo</button
			>
			<button
				class="inline-flex justify-center items-center bg-white hover:bg-red-600 border border-red-600 text-red-600 hover:text-white rounded-xl px-4 py-3"
				><span class="block w-4 h-4 mr-2"><Trash /></span>Remove</button
			>
		</div>
	</div>
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
		<Button
			disabled={!$interacted || !$isValid}
			loading={$submitData.isLoading}
			text="Save Changes"
			classes="self-center md:self-end mt-8 md:mt-4 px-8 py-3"
		/>
	</form>
	<div class="divider h-px w-full bg-borderColor my-10" />
	<h6 class="text-3xl font-bold mb-2">Reset Password</h6>
	<p class="text-lighterText text-sm">Click here to reset your password.</p>
	<Button
		on:click={() => goto('/profile/reset-password/')}
		type="button"
		text="Reset Password"
		classes="mt-8 px-8 py-3"
	/>
</div>
