<script lang="ts">
	export let img: string;
	export let img_alt: string;
	export let heading: string;
	export let description: string;
	export let button: string;
	export let url: string;
</script>

<div class="card flex flex-col bg-bgColor rounded-2xl">
	<img src={img} class="object-cover" alt={img_alt} />
	<div class="p-6 flex flex-col">
		<h6 class="text-secondary font-bold text-lg md:text-xl mb-2">
			{heading}
		</h6>
		<span class="text-lighterText text-xs md:text-sm">{description}</span>
		<a
			href={url}
			class="self-start bg-secondary hover:bg-primary text-white font-bold text-sm md:text-base px-4 py-2 mt-4 rounded-xl"
			>{button}</a
		>
	</div>
</div>
