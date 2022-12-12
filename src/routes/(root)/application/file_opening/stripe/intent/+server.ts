import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export async function POST() {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 100,
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true
		}
	});

	return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
		status: 200,
		statusText: 'OK'
	});
}
