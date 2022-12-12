<script>
	import { goto } from '$app/navigation';
	import { login_message } from '$lib/login/stores';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { onMount } from 'svelte/internal';
	import * as yup from 'yup';

	import { header_bg } from '$lib/login/stores';

	import { Success } from '$lib/components/Icons';

	import { Button, Error, Input } from '$lib/components/Form';

	export let data;

	let resend_email;

	onMount(() => {
		if (data.message === 'success') {
			$login_message.type = 'success';
			$login_message.message = 'Your account has been verified. You can login now.';
		}
	});

	const schema = yup.object({
		email: yup
			.string()
			.email('Please enter a valid email address')
			.required('Email Address is required')
	});

	const { form, errors, isValid } = createForm({
		extend: validator({ schema }),
		onSubmit(values, context) {
			handleSubmit(JSON.stringify(values));
		}
	});

	async function handleSubmit(values) {
		const res = await fetch('/auth/resend-verification', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: values
		});

		if (res.ok) {
			resend_email =
				'Verification email sent! If you do not receive the email, please check your spam folder.';
		} else {
			resend_email = 'Error sending verification email.';
			console.log(res);
		}
	}
	$header_bg = '#F9F6FF';
</script>

<section class="flex flex-1 justify-center items-center bg-bgColor">
	<div
		class="flex flex-col justify-center p-12 md:px-40 md:py-32 lg:px-60 lg:py-52 bg-white rounded-3xl"
	>
		{#if data.message === 'invalid'}
			<h2 class="text-3xl font-bold">Oops, looks like your verification email has expired!</h2>
			<p class="mt-2 text-sm text-lightText leading-normal">
				Don’t worry! We can send you the link again. Just enter your email address below:
			</p>
			<form use:form>
				<fieldset class="flex flex-col mt-8 border-b border-dividerColor">
					<div class="mb-8">
						<Input
							type="email"
							id="email"
							name="email"
							placeholder="example@example.com"
							error={$errors.email}
						/>
						{#if $errors.email}
							<Error message={$errors.email} />
						{/if}
					</div>

					<Button text="Submit" disabled={!isValid} classes="py-3 px-12" />
				</fieldset>
			</form>
		{:else if data.message === 'success'}
			<span class="self-center"><Success /></span>
			<h2 class="text-3xl font-bold">Your account has been verified!</h2>
			<Button
				on:click={() => goto('/login')}
				type="button"
				text="Login"
				classes="mt-6 px-12 py-3"
			/>
		{/if}
	</div>
</section>

<svelte:head>
	<title>app.aemers.com - Verification</title>
</svelte:head>
