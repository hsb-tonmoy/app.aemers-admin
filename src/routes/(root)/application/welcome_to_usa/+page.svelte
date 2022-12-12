<script>
	import { Button } from '$lib/components/Form';

	const backgrounds = [
		'welcome_to_usa_1.jpg',
		'welcome_to_usa_2.jpg',
		'welcome_to_usa_3.jpg',
		'welcome_to_usa_4.jpg'
	];
</script>

<svelte:head>
	<title>app.aemers - Welcome to USA</title>
</svelte:head>

<div
	style="background-image:
  linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 1)),
  url('/images/{backgrounds[Math.floor(Math.random() * backgrounds.length)]}')"
	class="welcome bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-14 py-8 xl:px-20 xl:py-12 bg-white rounded-2xl w-full h-full"
>
	<img src="/images/i20+upload.png" alt="I-20 Upload" />
	<h6 class="font-bold text-secondary text-xl md:text-3xl mt-10">
		We are here to guide you in the USA!
	</h6>
	<span class="text-lighterText text-sm md:text-base mt-2"
		>Contact us for any help you need. Our support extends beyond borders.</span
	>
	<Button type="button" text="Get Support" classes="text-base md:text-lg px-8 py-3 mt-6" />
</div>
