<script>
	import { invalidateAll } from '$app/navigation';
	import { Cross } from '$lib/components/Icons';
	import { notificationSuccessToast, notificationToast } from '$lib/NotificationToast';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	export let editingTitle = false;
	export let title;

	const schema = yup.object({
		title: yup.string().required()
	});

	const { form, errors, touched } = createForm({
		initialValues: {
			title: title
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			const res = await fetch('', {
				method: 'PATCH',
				body: JSON.stringify(values)
			});
			if (!res.ok) {
				notificationToast('Something went wrong, please try again later');
			} else {
				editingTitle = false;
				invalidateAll();
			}
		}
	});
</script>

<form class="relative" use:form>
	<input
		id="title"
		name="title"
		type="text"
		class={`form-input border border-borderColor focus:border-primary focus:ring focus:ring-primary disabled:bg-gray-300 ${
			$errors.title ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''
		} ${
			$touched.title && !$errors.title ? 'border-2 border-greenSignal ring-greenSignal' : ''
		} text-sm rounded-lg block py-1 px-5`}
	/>
	<div class="flex absolute inset-y-0 right-0 items-center pr-3">
		<button type="button" on:click={() => (editingTitle = false)} class="w-4 h-4 text-redSignal">
			<Cross />
		</button>
	</div>
</form>
