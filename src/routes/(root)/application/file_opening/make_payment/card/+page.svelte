<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Form/Button.svelte';
	import { notificationToast } from '$lib/NotificationToast';
	import { loadStripe } from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import { Elements, LinkAuthenticationElement, PaymentElement } from 'svelte-stripe';

	let stripe = null;
	let clientSecret = null;
	let error = null;
	let elements;
	let processing = false;

	onMount(async () => {
		stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

		// create payment intent server side
		clientSecret = await createPaymentIntent();
	});

	async function createPaymentIntent() {
		const response = await fetch('/application/file_opening/stripe/intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({})
		});
		const { clientSecret } = await response.json();

		return clientSecret;
	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return;

		processing = true;

		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		// log results, for debugging
		console.log({ result });

		if (result.error) {
			// payment failed, notify user
			error = result.error;
			console.log(error);
			notificationToast(error);
			processing = false;
		} else {
			// payment succeeded, redirect to "thank you" page
			goto('/application/file_opening/complete');
		}
	}
</script>

{#if error}
	<p class="error">{error.message} Please try again.</p>
{/if}

<div class="flex flex-col mx-auto px-10 py-6 xl:px-20 xl:py-12 bg-white rounded-2xl">
	{#if stripe && clientSecret}
		<Elements {stripe} {clientSecret} bind:elements>
			<form on:submit|preventDefault={submit}>
				<LinkAuthenticationElement />
				<PaymentElement />

				<div class="flex justify-between items-center w-full">
					<Button
						on:click={() => goto('/application/file_opening/make_payment')}
						type="button"
						text="Go Back"
						classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start bg-lightText text-white"
					/>
					<Button
						disabled={processing}
						loading={processing}
						text="Pay"
						classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start hover:bg-primaryDarker"
					/>
				</div>
			</form>
		</Elements>
	{:else}
		Loading...
	{/if}
</div>

<style global lang="postcss">
	.Input {
		@apply form-input border border-borderColor focus:border-primary focus:ring focus:ring-primary disabled:bg-gray-300 text-sm rounded-xl block py-4 px-5;
	}
</style>
