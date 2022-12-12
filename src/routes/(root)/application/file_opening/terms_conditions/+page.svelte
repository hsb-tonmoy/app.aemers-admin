<script>
	import { goto } from '$app/navigation';
	import { Button, Error, Input, Label } from '$lib/components/Form';

	let agreed = false;
</script>

<div class="flex flex-col mx-auto px-10 py-6 xl:px-20 xl:py-12 bg-white rounded-2xl">
	<object
		type="application/pdf"
		data="/files/E1a.pdf"
		aria-label="PDF preview window"
		height="900px"><embed src="/files/E1a.pdf" /></object
	>

	<div class="flex justify-end w-full mt-6">
		<label for="agree">
			<input
				class="form-checkbox border border-primary text-primary ring-primary focus:ring-0"
				bind:checked={agreed}
				type="checkbox"
				name="agree"
				id="agree"
			/>
			<span class="font-bold ml-2"
				>Yes, I have read and I agree to the terms and conditions stated above</span
			>
		</label>
	</div>

	<div class="flex justify-between items-center">
		<Button
			on:click={() => goto('/application/file_opening/confirm_info')}
			type="button"
			text="Go Back"
			classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start bg-lightText text-white"
		/>
		<Button
			disabled={!agreed}
			type="button"
			on:click={() => goto('/application/file_opening/make_payment')}
			text="Proceed"
			classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start hover:bg-primaryDarker"
		/>
	</div>
</div>
