<script>
	import Form from './Form.svelte';
	export let data;
</script>

<svelte:head>
	<title>app.aemers - Pre-Application Form</title>
</svelte:head>

<div
	class="flex px-10 py-6 xl:px-20 xl:py-12 bg-white rounded-2xl mb-6 bg-contain bg-no-repeat bg-right bg-origin-padding"
>
	<div class="flex flex-col w-full md:w-3/4">
		<h2 class="text-primary font-bold text-2xl mb-2">What is Pre-Application Form?</h2>
		<span class="text-secondary text-sm md:text-base"
			>With app.aemers, Pre-Application Form is the only form you ever have to fill up. Our
			dedicated counselors will use this information to process all your applications.</span
		>
	</div>
	<div
		class="hidden md:flex w-1/4 bg-contain bg-no-repeat bg-right bg-origin-content"
		style="background-image: url('/images/paper.png')"
	/>
</div>
<Form profile_data={data.profile_data} pre_application_form={data.pre_application_form} />
