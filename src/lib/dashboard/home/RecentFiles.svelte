<script>
	const files = [
		{ name: 'Amos Stafford', date: '04:14 PM, 23/08/2022' },
		{ name: 'Amos Stafford', date: '04:14 PM, 23/08/2022' },
		{ name: 'Amos Stafford', date: '04:14 PM, 23/08/2022' },
		{ name: 'Amos Stafford', date: '04:14 PM, 23/08/2022' },
		{ name: 'Amos Stafford', date: '04:14 PM, 23/08/2022' }
	];
</script>

<div class="flex flex-col px-8 py-6 rounded-xl shadow-lg bg-white">
	<h6 class="font-bold text-secondary text-2xl">Recent Files</h6>
	<hr class="mt-2 mb-4 bg-primary h-1 w-1/4" />
	<div class="flex flex-col gap-4">
		{#each files as file}
			<div
				class="flex justify-between items-center gap-6 border border-primary px-6 py-3 rounded-xl"
			>
				<div class="flex flex-col">
					<span class="font-bold text-lg">{file.name}</span>
					<span class="text-lighterText text-xs">{file.date}</span>
				</div>
				<button class="font-bold text-white bg-primary rounded-2xl px-4 py-1">View File</button>
			</div>
		{/each}
	</div>
</div>
