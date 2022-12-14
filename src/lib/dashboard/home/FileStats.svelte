<script>
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
	<button class="stat-container bg-primary text-white">
		<span class="text-base mb-2">Pending Files</span>
		<span class="font-bold text-4xl">27</span>
	</button>
	<button class="stat-container group">
		<span class="text-base mb-2">Active Files</span>
		<span class="font-bold text-4xl text-primary group-hover:text-white">146</span>
	</button>
	<button class="stat-container group">
		<span class="text-base mb-2">Completed Files</span>
		<span class="font-bold text-4xl text-primary group-hover:text-white">856</span>
	</button>
	<button class="stat-container group">
		<span class="text-base mb-2">Total Students</span>
		<span class="font-bold text-4xl text-primary group-hover:text-white">1952</span>
	</button>
</div>

<style lang="postcss">
	.stat-container {
		@apply flex flex-col items-start hover:bg-primary hover:text-white rounded-2xl border border-primary px-6 py-6 xl:py-8;
	}
</style>
