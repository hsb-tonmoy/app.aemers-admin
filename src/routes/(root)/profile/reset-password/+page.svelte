<script>
	import { goto } from '$app/navigation';
	import { Button, Error, Input, Label } from '$lib/components/Form';
	import { Cross, Eye, EyeOff, Trash } from '$lib/components/Icons';
	import { notificationSuccessToast, notificationToast } from '$lib/NotificationToast';
	import { validator } from '@felte/validator-yup';
	import { useMutation } from '@sveltestack/svelte-query';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import YupPassword from 'yup-password';

	YupPassword(yup);

	let oldPasswordVisible = false;

	let passwordVisible = false;

	const submitData = useMutation(
		(formData) => {
			return fetch('/profile/reset-password/submit', {
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
					notificationToast('Your current password is incorrect. Please try again.');
					console.log(await data.json(), error);
				} else {
					notificationSuccessToast('Password changed successfully!');
					goto('/profile/edit');
				}
			}
		}
	);

	const schema = yup.object().shape({
		old_password: yup.string().required('Old Password is required').trim(),
		new_password1: yup
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.minLowercase(2, 'Password must have at least 2 lowercase characters')
			.minUppercase(1, 'Password must have at least 1 uppercase character')
			.minNumbers(1, 'Password must have at least 1 numeric character')
			.minSymbols(1, 'Password must have at least 1 symbol')
			.required('New password is required'),
		new_password2: yup.string().oneOf([yup.ref('new_password1'), null], 'New passwords must match')
	});

	const { form, errors, isValid, isDirty, interacted } = createForm({
		initialValues: {
			old_password: '',
			new_password1: '',
			new_password2: ''
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			$submitData.mutate(values);
			// console.log(values);
		}
	});
</script>

<div class="flex items-center relative bg-white rounded-2xl px-10 py-12 md:px-16 md:py-20 h-full">
	<button
		on:click={() => goto('/profile/edit/')}
		class="absolute right-8 top-10 flex justify-center items-center bg-borderColor rounded-full cursor-pointer"
	>
		<span class="block p-1 w-8 h-8 md:w-12 md:h-12"><Cross /></span>
	</button>

	<form class="flex flex-col items-center w-full" use:form>
		<h6 class="text-3xl font-bold mb-2">Set a New Password</h6>
		<p class="text-lighterText text-sm">Choose a strong password..</p>
		<fieldset class="flex flex-col items-center gap-y-6 w-full xl:w-3/4 2xl:w-2/5 mt-16">
			<div class="w-full">
				<Label label_for="old_password" label="Enter your current password" />
				<div class="relative">
					<Input
						type={oldPasswordVisible ? 'text' : 'password'}
						name="old_password"
						id="old_password"
						placeholder="***********"
						classes="w-full"
						error={$errors.old_password}
					/>
					<div
						on:click={() => (oldPasswordVisible = !oldPasswordVisible)}
						class="flex absolute inset-y-0 right-0 items-center pr-6 cursor-pointer"
					>
						<span class="w-5 h-5">
							{#if oldPasswordVisible}
								<Eye />
							{:else}
								<EyeOff />
							{/if}
						</span>
					</div>
				</div>
				{#if $errors.old_password}
					<Error classes="self-start" message={$errors.old_password} />
				{/if}
			</div>
			<div class="w-full">
				<Label label_for="new_password1" label="Enter a new password" />
				<div class="relative">
					<Input
						type={passwordVisible ? 'text' : 'password'}
						name="new_password1"
						id="new_password1"
						placeholder="***********"
						classes="w-full"
						error={$errors.new_password1}
					/>
					<div
						on:click={() => (passwordVisible = !passwordVisible)}
						class="flex absolute inset-y-0 right-0 items-center pr-6 cursor-pointer"
					>
						<span class="w-5 h-5">
							{#if passwordVisible}
								<Eye />
							{:else}
								<EyeOff />
							{/if}
						</span>
					</div>
				</div>
				{#if $errors.new_password1}
					<Error classes="self-start" message={$errors.new_password1} />
				{/if}
			</div>
			<div class="w-full">
				<Label label_for="new_password2" label="Confirm your new password" />
				<div class="relative">
					<Input
						type={passwordVisible ? 'text' : 'password'}
						name="new_password2"
						id="new_password2"
						placeholder="***********"
						classes="w-full"
						error={$errors.new_password2}
					/>
					<div
						on:click={() => (passwordVisible = !passwordVisible)}
						class="flex absolute inset-y-0 right-0 items-center pr-6 cursor-pointer"
					>
						<span class="w-5 h-5">
							{#if passwordVisible}
								<Eye />
							{:else}
								<EyeOff />
							{/if}
						</span>
					</div>
				</div>
				{#if $errors.new_password2}
					<Error classes="self-start" message={$errors.new_password2} />
				{/if}
			</div>
			<Button
				disabled={!$isValid}
				loading={$submitData.isLoading}
				text="Submit"
				classes="self-center md:self-end mt-8 md:mt-4 px-8 py-3"
			/>
		</fieldset>
	</form>
</div>
