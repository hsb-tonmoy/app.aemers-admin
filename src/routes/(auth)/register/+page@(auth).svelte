<script lang="ts">
	import { goto } from '$app/navigation';

	import { useMutation } from '@sveltestack/svelte-query';

	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import YupPassword from 'yup-password';

	YupPassword(yup);

	import { notificationToast } from '$lib/NotificationToast';

	import SocialLogin from '$lib/login/SocialLogin.svelte';

	import { Spinner } from 'flowbite-svelte';

	import { Eye, EyeOff } from '$lib/components/Icons';

	import { Button, Error, Input, Label } from '$lib/components/Form';

	let passwordVisible = false;

	const register = useMutation(
		(formData) => {
			return fetch('auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
		},
		{
			onError: (error, variables, context) => {
				console.log(error);
			},

			onSuccess: async (data, variables, context) => {
				const json = await data.json();
				if (json.detail && json.detail === 'Verification e-mail sent.') {
					goto('/register/confirmation');
				} else if (
					json.email &&
					json.email[0] === 'A user is already registered with this e-mail address.'
				) {
					notificationToast('You are already registered with this email address.');
				} else {
					notificationToast('Something went wrong, please try again later');
					console.log(json);
				}
			}
		}
	);

	const schema = yup.object().shape({
		email: yup
			.string()
			.email('Please enter a valid email address')
			.required('Email address is required')
			.trim(),
		password: yup
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.minLowercase(2, 'Password must have at least 2 lowercase characters')
			.minUppercase(1, 'Password must have at least 1 uppercase character')
			.minNumbers(1, 'Password must have at least 1 numeric character')
			.minSymbols(1, 'Password must have at least 1 symbol')
			.required('Password is required'),
		passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	const { form, data, errors, isValid } = createForm({
		initialValues: {
			email: '',
			password: '',
			passwordConfirmation: ''
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			$register.mutate(values);
		}
	});
</script>

<svelte:head>
	<title>app.aemers.com - Signup</title>
</svelte:head>

<main class="flex flex-wrap flex-1">
	<aside class="hidden md:block bg bg-cover bg-center bg-no-repeat w-full md:w-2/5 xl:w-1/4" />
	<aside class="flex justify-center items-center w-full md:w-3/5 xl:w-3/4">
		<div class="flex flex-col justify-center px-6 xl:px-0 xl:w-1/3">
			<h2 class="text-3xl font-bold">Create an Account</h2>
			<p class="mt-2 text-sm text-lightText leading-normal">
				Creating an account is the easiest task ever. You are about to land in the universe of
				Aemers.
			</p>

			<form use:form>
				<fieldset class="flex flex-col mt-8 border-b border-dividerColor">
					<div class="mb-8">
						<Label label_for="email" label="Email" />
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="example@example.com"
							error={$errors.email}
							classes="w-full"
						/>
						{#if $errors.email}
							<Error message={$errors.email} />
						{/if}
					</div>
					<Label label_for="password" label="Choose a Password" />
					<div class="relative">
						<Input
							type={passwordVisible ? 'text' : 'password'}
							name="password"
							id="password"
							placeholder="***********"
							error={$errors.password}
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
					{#if $errors.password}
						<Error classes="self-start" message={$errors.password} />
					{/if}
					<Label classes="mt-8" label_for="passwordConfirmation" label="Confirm Password" />
					<div class="relative">
						<Input
							type={passwordVisible ? 'text' : 'password'}
							name="passwordConfirmation"
							id="passwordConfirmation"
							placeholder="***********"
							error={$errors.passwordConfirmation}
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
					{#if $errors.passwordConfirmation}
						<Error classes="self-start" message={$errors.passwordConfirmation} />
					{/if}

					<Button type="submit" disabled={!$isValid || $register.isLoading} classes="mt-8 py-4">
						Signup
						{#if $register.isLoading}
							<Spinner class="ml-2" color="white" size="4" />
						{/if}
					</Button>
					<div class="flex flex-col items-center self-center mt-8 mb-4">
						<span class="text-xs md:text-base"
							>Already have an account? <a href="/login" class="font-bold text-primary underline"
								>Login</a
							></span
						>
					</div>
				</fieldset>
			</form>
			<SocialLogin />
		</div>
	</aside>
</main>

<style lang="postcss">
	.bg {
		background-image: url('/images/register-bg.jpg');
	}
</style>
