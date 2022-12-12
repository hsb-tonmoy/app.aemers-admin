<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Cross } from '$lib/components/Icons';
	import Steps from '$lib/components/UI/ApplicationSteps.svelte';
	import { sidebarState } from '$lib/dashboard/home/stores';
	import Logo from '$lib/dashboard/layout/Sidebar/Logo.svelte';
	import { application_status, application_steps } from '$lib/data/stores';

	export let currentIndex = 1;

	export let user;

	let paid = false;

	$: $application_status.file_opening === 2 ? (paid = true) : (paid = false);

	$: $application_steps.map((step, index) => {
		if ($page.url.pathname.includes(step.path)) {
			currentIndex = index;
			return;
		}
	});

	function handleStatusClick() {
		if (paid) {
			return;
		}
		goto('/application/file_opening');
	}
</script>

<div class="bg-white flex flex-col min-h-screen h-full">
	<div class="flex items-center justify-between sidebarpadding py-3">
		<Logo />
		<button on:click={() => sidebarState.set(true)} class="block xl:hidden w-7 h-7 text-primary"
			><Cross /></button
		>
	</div>
	<div id="status" class="bg-cover bg-center flex flex-col text-white sidebarpadding py-6">
		<h6 class="font-bold text-white text-lg md:text-xl">Hey, {user.first_name}</h6>
		<button
			on:click={handleStatusClick}
			type="button"
			class="flex items-center gap-x-2 mt-2 text-sm"
		>
			Status: <span
				class="{paid
					? 'bg-greenSignal text-white'
					: 'bg-[#FFCD50] text-secondary'} font-bold px-3 rounded-md"
				>{paid ? 'Paid' : 'Unpaid'}</span
			>
		</button>
		<!-- <div class="self-center">
			<CircularProgress
				rotate={-90}
				size={150}
				progressWidth="2"
				width="10"
				value={$application_percentage}
			>
				<div class="flex flex-col justify-center">
					<span class="font-bold text-xl text-center">{$application_percentage}%</span>
					<span class="font-normal text-xs">Completed</span>
				</div>
			</CircularProgress>
		</div>
		<h6 class="font-bold text-xl mt-4">File Completion</h6>
		<p class="text-xs">Follow the steps to complete your File for US Admission.</p> -->
	</div>
	<div id="steps" class="sidebarpadding">
		<Steps
			steps={$application_steps}
			clickable={true}
			vertical={true}
			bind:current={currentIndex}
			size="1.5rem"
			minStepSize="4rem"
			primary={'#7443FF'}
			secondary={'#BEBEBE'}
			lineColor={'#E3E3E3'}
			iconSize="1.5rem"
			iconBorder={false}
		/>
	</div>
</div>

<style lang="postcss">
	.sidebarpadding {
		@apply px-4 md:px-6;
	}

	#status {
		background-image: url('/images/user_status_bg.png');
	}
</style>
