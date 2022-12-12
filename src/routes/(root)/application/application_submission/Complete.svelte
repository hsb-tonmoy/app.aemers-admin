<script>
	import Success from '$lib/components/UI/Success.svelte';
	import { Button } from '$lib/components/Form';
</script>

<Success width="800px" />
<h2 class="font-bold text-secondary text-xl text-center md:text-3xl mt-8 mb-2">
	Your application has been submitted successfully!
</h2>
<span class="text-lighterText text-sm"
	>Wait until you receive an <a class="text-primary font-bold" href="/application/i_20_upload"
		>I-20</a
	></span
>
<a href="/application/i_20_upload">
	<Button type="button" classes=" px-6 md:px-10 py-4 mt-6" text="Next Step: I-20 Upload" />
</a>
