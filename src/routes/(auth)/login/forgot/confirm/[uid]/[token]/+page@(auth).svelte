<script>
	import { page } from '$app/stores';

	import { goto } from '$app/navigation';

	import { notificationToast } from '$lib/NotificationToast';

	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import YupPassword from 'yup-password';

	import { header_bg } from '$lib/login/stores';

	import { Button, Error, Input, Label } from '$lib/components/Form';

	import { Eye, EyeOff } from '$lib/components/Icons';

	YupPassword(yup);

	const { uid, token } = $page.params;

	let success = false;

	let passwordVisible = false;

	const schema = yup.object({
		new_password1: yup
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.minLowercase(2, 'Password must have at least 2 lowercase characters')
			.minUppercase(1, 'Password must have at least 1 uppercase character')
			.minNumbers(1, 'Password must have at least 1 numeric character')
			.minSymbols(1, 'Password must have at least 1 symbol')
			.required('Password is required'),
		new_password2: yup
			.string()
			.oneOf([yup.ref('new_password1'), null], 'Passwords must match')
			.required('Confirm Password is required')
	});
	const { form, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			uid: uid,
			token: token,
			new_password1: '',
			new_password2: ''
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			handleReset(JSON.stringify(values));
		}
	});

	async function handleReset(body) {
		try {
			const response = await fetch('/auth/forgot-confirm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body
			});
			const data = await response.json();

			if (response.ok) {
				success = true;
				setTimeout(() => {
					goto('/login/forgot/success');
				}, 3000);
			} else if (data.token) {
				notificationToast(
					'Your password reset link has expired. Please request a new one.',
					false,
					5000
				);
			} else if (data.new_password2) {
				notificationToast(
					'Your password does not meet the minimum requirements. Please try again.',
					false,
					5000
				);
			}
		} catch (e) {
			console.log(e);
		}
	}
	$header_bg = '#F9F6FF';
</script>

<svelte:head>
	<title>app.aemers.com - Set New Password</title>
</svelte:head>

<section class="flex flex-1 justify-center items-center bg-bgColor">
	<div class="relative flex flex-col p-12 md:px-40 md:py-32 lg:px-60 lg:py-52 bg-white rounded-3xl">
		<h2 class="text-3xl font-bold">Set a New Password</h2>
		<p class="mt-2 text-sm text-lightText leading-normal">
			You are just one step away! Set a new password for your account.
		</p>

		<form use:form>
			<fieldset class="flex flex-col mt-8 border-b border-dividerColor">
				<Label label="Password" label_for="new_password1" />
				<div class="relative">
					<Input
						type={passwordVisible ? 'text' : 'password'}
						name="new_password1"
						id="new_password1"
						placeholder="**************"
						error={$errors.new_password1}
						classes="w-full"
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
					<Error classes="self-start mt-2" message={$errors.new_password1} />
				{/if}
				<Label label="Confirm Password" label_for="new_password2" classes="mt-8" />
				<div class="relative">
					<Input
						type={passwordVisible ? 'text' : 'password'}
						name="new_password2"
						id="new_password2"
						placeholder="**************"
						error={$errors.new_password2}
						classes="w-full"
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
					<Error classes="self-start mt-2 w-full" message={$errors.new_password2} />
				{/if}

				<Button
					loading={$isSubmitting}
					type="submit"
					text="Submit"
					classes="py-4 mt-8"
					disabled={!$isValid}
				/>
			</fieldset>
		</form>
	</div>
</section>
