<script>
	import { Button } from '$lib/components/Form';
	import CategorySection from './CategorySection.svelte';

	export let data;
</script>

<svelte:head>
	<title>app.aemers - Documents Upload</title>
</svelte:head>

<div class="flex flex-col px-6 py-4 xl:px-20 xl:py-12 bg-white rounded-2xl w-full">
	<div class="flex flex-wrap md:flex-nowrap gap-y-10 gap-x-20 w-full mb-40">
		<div class="flex flex-col justify-center w-full md:w-2/4">
			<p class="text-secondary leading-relaxed text-base">
				Submit all of your authentic documents here. Our team will review and approve these
				documents. These documents will be used in your admission process. We ensure the privacy of
				your documents.
			</p>
			<h6 class="text-primary font-bold text-xl mb-2 mt-6">Instructions</h6>
			<ol class="list-decimal list-inside flex flex-col gap-y-1 text-secondary text-sm">
				<li>Don’t provide Black and White Document.</li>
				<li>Scan and upload pdf document.</li>
				<li>Provide a clear document.</li>
				<li>Don’t provide an expired document.</li>
			</ol>
		</div>
		<div class="w-full md:w-2/4">
			<img src="/images/i20+upload.png" alt="I-20 Upload" />
		</div>
	</div>
	<CategorySection documents={data.documents} categories={data.categories} user={data.user} />
</div>
<div class="flex gap-x-4 w-full justify-end my-4">
	<a href="/application/pre_application_form">
		<Button
			type="button"
			text="Go back"
			defaultClass=""
			classes="bg-transparent px-4 md:px-6 py-4 text-lighterText font-bold border border-borderColor hover:text-secondary hover:border-secondary rounded-2xl"
		/>
	</a>
	<a href="/application/application_submission">
		<Button type="button" classes=" px-6 md:px-20 py-4" text="Save & Continue" />
	</a>
</div>
