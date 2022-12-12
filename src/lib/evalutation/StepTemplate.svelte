<script lang="ts">
	export let heading: string;
</script>

<div class="flex flex-col justify-between w-full lg:w-11/12 2xl:w-2/3">
	<div class="mb-16">
		<h2 class="font-bold text-secondary text-3xl md:text-4xl mb-8 leading-normal">{heading}</h2>
		<slot />
	</div>
</div>
