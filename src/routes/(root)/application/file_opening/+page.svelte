<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Form/Button.svelte';
	import 'shepherd.js/dist/css/shepherd.css';
	import { onMount } from 'svelte';

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
				id: 'status-step',
				text: 'You can review your status here',
				attachTo: {
					element: '#status',
					on: 'right'
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
				id: 'steps-step',
				text: 'Here you can track your progress and navigate between the pages!',
				attachTo: {
					element: '#steps',
					on: 'right'
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
				id: 'exit-step',
				text: 'Save and exit your application anytime!',
				attachTo: {
					element: '#exit',
					on: 'bottom'
				},
				modalOverlayOpeningRadius: 16,
				buttons: [
					{
						text: 'Finish',
						action: () => {
							dismissTour();
							tour.complete();
						}
					}
				]
			}
		]);

		function dismissTour() {
			if (!localStorage.getItem('fileOpen-tour')) {
				localStorage.setItem('fileOpen-tour', 'yes');
			}
		}

		tour.on('cancel', dismissTour);

		if (!localStorage.getItem('fileOpen-tour')) {
			tour.start();
		}
	});

	function handleClick() {
		goto('/application/file_opening/open_a_file');
	}
</script>

<svelte:head>
	<title>Open a File | app.aemers</title>
</svelte:head>

<div
	class="flex flex-wrap xl:flex-nowrap justify-center gap-8 px-14 py-8 xl:px-20 xl:py-12 bg-white rounded-2xl w-full"
>
	<div class="w-full xl:w-1/4">
		<img src="/images/video_file.png" alt="Video" class="w-60 md:w-80" />
	</div>
	<div class="flex flex-col justify-center w-full xl:w-2/4">
		<h3 class="text-secondary font-bold text-2xl mb-2">Opening a file is really simple!</h3>
		<p class="text-lighterText text-sm mb-4">
			All your data is stored under the file. You have to pay 15000 BDT to open a file. Trust me,
			it’s worth it!
		</p>
		<div class="flex items-center gap-x-4">
			<Button
				on:click={() => {
					goto('/application/pre_application_form');
				}}
				type="button"
				text="Skip for Now"
				defaultClass=""
				classes="bg-transparent px-8 py-3 text-lighterText font-bold border border-borderColor hover:text-secondary hover:border-secondary rounded-2xl"
			/>
			<Button
				on:click={handleClick}
				type="button"
				text="Open a File"
				classes="self-start px-8 py-3 hover:bg-primaryDarker"
			/>
		</div>
	</div>
</div>
