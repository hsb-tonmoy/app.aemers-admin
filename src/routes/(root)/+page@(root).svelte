<script>
	import Header from '$lib/dashboard/home/Header/Header.svelte';
	import FileStats from '$lib/dashboard/home/FileStats.svelte';
	import RecentFiles from '$lib/dashboard/home/RecentFiles.svelte';
	import FileChart from '$lib/dashboard/home/FileChart.svelte';
	export let data;
</script>

<svelte:head><title>Dashboard | app.aemers</title></svelte:head>

<div class="flex flex-col gap-6">
	<Header notifications={data.notifications} first_name={data.profile.first_name} />
	<FileStats />
	<div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
		<RecentFiles />
		<FileChart />
	</div>
</div>
