<script>
	import Header from '$lib/dashboard/home/Header/Header.svelte';
	import ApplicationTile from '$lib/dashboard/home/Tiles/ApplicationTile/Tile.svelte';
	import KnowledgebaseTile from '$lib/dashboard/home/Tiles/KnowledgebaseTile/Tile.svelte';
	import MentorshipTile from '$lib/dashboard/home/Tiles/MentorshipTile/Tile.svelte';
	import MockVisaTile from '$lib/dashboard/home/Tiles/MockVisaTile/Tile.svelte';
	import NewsPortalTile from '$lib/dashboard/home/Tiles/NewsPortalTile/Tile.svelte';
	import 'shepherd.js/dist/css/shepherd.css';
	import { onMount } from 'svelte';

	export let data;

	let tour;

	onMount(async () => {
		const obj = await import('shepherd.js');
		const Shepherd = obj.default;

		const shepherdContainer = document.getElementById('svelte');
		tour = new Shepherd.Tour({
			modalContainer: shepherdContainer,
			stepsContainer: shepherdContainer,
			useModalOverlay: true,
			defaultStepOptions: {
				title: "Let's show you around...",
				scrollTo: true,
				popperOptions: {
					modifiers: [{ name: 'offset', options: { offset: [0, 20] } }]
				},
				modalOverlayOpeningRadius: 16,
				when: {
					show: function () {
						const currentStepElement = tour.currentStep.el;
						const header = currentStepElement.querySelector('.shepherd-footer');
						//create progress holder
						const progress = document.createElement('div');
						//create the progress bar
						const innerBar = document.createElement('span');
						//calculate the progress in percentages
						const progressPercentage =
							((tour.steps.indexOf(tour.currentStep) + 1) / tour.steps.length) * 100 + '%';

						//add class to the progress holder
						progress.className = 'shepherd-progress-bar';
						//add the width dynamically
						innerBar.style.width = progressPercentage;
						//if it is only one button, expand progress holder
						if (document.getElementsByClassName('shepherd-button').length == 1) {
							progress.style.minWidth = '260px';
						}
						progress.appendChild(innerBar);
						header.insertBefore(progress, currentStepElement.querySelector('.shepherd-button'));
					}
				}
			}
		});

		tour.addSteps([
			{
				id: 'application-step',
				text: 'Here you can start and review your study abroad application!',
				attachTo: {
					element: '#application',
					on: 'bottom'
				},
				buttons: [
					{
						text: 'Next',
						action: tour.next
					},
					{
						text: 'Skip',
						action: tour.cancel,
						secondary: true
					}
				]
			},
			{
				id: 'knowledgebase-step',
				text: 'Here you will find a well curated collection of study abroad articles!',
				attachTo: {
					element: '#knowledgebase',
					on: 'bottom'
				},
				buttons: [
					{
						text: 'Next',
						action: tour.next
					},
					{
						text: 'Skip',
						action: tour.cancel,
						secondary: true
					}
				]
			},
			{
				id: 'interview-step',
				text: 'Here you can take a FREE Visa Interview Mock Test!',
				attachTo: {
					element: '#interview',
					on: 'bottom'
				},
				buttons: [
					{
						text: 'Next',
						action: tour.next
					},
					{
						text: 'Skip',
						action: tour.cancel,
						secondary: true
					}
				]
			},
			{
				id: 'mentorship-step',
				text: 'Here you can explore the mentorship opportunities available to you!',
				attachTo: {
					element: '#mentorship',
					on: 'bottom'
				},
				buttons: [
					{
						text: 'Next',
						action: tour.next
					},
					{
						text: 'Skip',
						action: tour.cancel,
						secondary: true
					}
				]
			},
			{
				id: 'notif-step',
				text: 'All your important notifications can be found here!',
				attachTo: {
					element: '#notif-tour',
					on: 'left'
				},
				buttons: [
					{
						text: 'Finish',
						action: () => {
							dismissTour();
							tour.complete();
						}
					}
				],
				modalOverlayOpeningPadding: 5,
				modalOverlayOpeningRadius: 25
			}
		]);

		function dismissTour() {
			if (!localStorage.getItem('dashboard-tour')) {
				localStorage.setItem('dashboard-tour', 'yes');
			}
		}

		tour.on('cancel', dismissTour);

		if (!localStorage.getItem('dashboard-tour')) {
			tour.start();
		}
	});
</script>

<svelte:head><title>Dashboard | app.aemers</title></svelte:head>

<div class="flex flex-col">
	<Header notifications={data.notifications} first_name={data.profile.first_name} />
	<div class="relative grid grid-cols-1 xl:grid-cols-2 gap-6 mt-5">
		<div id="application">
			<ApplicationTile />
		</div>

		<div id="knowledgebase">
			<KnowledgebaseTile />
		</div>
		<div id="interview">
			<MockVisaTile />
		</div>
		<!-- <NewsPortalTile /> -->
		<div id="mentorship">
			<MentorshipTile />
		</div>
	</div>
</div>
