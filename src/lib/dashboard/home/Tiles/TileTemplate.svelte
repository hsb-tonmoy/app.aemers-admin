<script lang="ts">
	export let heading: string;
	export let subheading: string;
</script>

<div class="box rounded-2xl py-8 px-10 bg-white h-full">
	<h2 class="font-bold text-secondary text-xl md:text-2xl 2xl:text-3xl">{heading}</h2>
	<h6 class="text-xs md:text-sm text-lighterText mt-1 mb-6">
		{subheading}
	</h6>
	<slot />
</div>

<style>
	.box {
		box-shadow: 0px 4px 18px rgba(116, 67, 255, 0.15);
	}
</style>
