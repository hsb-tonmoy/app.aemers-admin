<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Button,
		Error,
		IconInput,
		IconInputExposed,
		Input,
		InputExposed,
		Label,
		Select,
		SelectExposed,
		TextArea
	} from '$lib/components/Form';
	import { CalendarDays } from '$lib/components/Icons';
	import { countries } from '$lib/data/countries';
	import { notificationToast } from '$lib/NotificationToast';
	import { validator } from '@felte/validator-yup';
	import { useMutation } from '@sveltestack/svelte-query';
	import { createForm } from 'felte';
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { formSaved } from '../stores';
	import {
		dependents_info,
		parents_info,
		education_data,
		subjects_data,
		education_level,
		english_proficiency_tests,
		eca_specific_achievements,
		eca_activities,
		schema,
		work_experience
	} from './constants';

	export let profile_data;
	export let pre_application_form;

	function addWorkExperience() {
		$data.work_experience = $data.work_experience.concat(work_experience);
	}

	function deleteWorkExperience() {
		$data.work_experience = $data.work_experience.slice(0, -1);
	}

	const submitData = useMutation(
		(formData) => {
			return fetch('/application/pre_application_form', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
		},
		{
			onSettled: async (data, error, variables, context) => {
				if (!data.ok || error) {
					notificationToast('Something went wrong, please try again later');
					console.log(await data.json(), error);
				} else {
					formSaved.set(true);
					goto('/application/documents_upload');
				}
			}
		}
	);

	onDestroy(() => {
		formSaved.set(false);
	});

	const { form, data, errors, isValid, isDirty, interacted } = createForm({
		initialValues: {
			first_name: pre_application_form.first_name || profile_data.first_name,
			middle_initials: pre_application_form.middle_initials,
			last_name: pre_application_form.last_name || profile_data.last_name,
			email: pre_application_form.email || profile_data.email,
			desired_level_of_study:
				pre_application_form.desired_level_of_study || profile_data.profile.degree,
			desired_field_of_study:
				pre_application_form.desired_field_of_study || profile_data.profile.major,
			total_number_of_visa_needed: pre_application_form.total_number_of_visa_needed || 1,
			phone: pre_application_form.phone || profile_data.profile.phone,
			date_of_birth: pre_application_form.date_of_birth,
			gender: pre_application_form.gender,
			marital_status: pre_application_form.marital_status,
			address_line_1: pre_application_form.address_line_1,
			address_line_2: pre_application_form.address_line_2,
			city: pre_application_form.city,
			state: pre_application_form.state,
			zip_code: pre_application_form.zip_code,
			country: pre_application_form.country || profile_data.profile.country,
			perma_address_line_1: pre_application_form.perma_address_line_1,
			perma_address_line_2: pre_application_form.perma_address_line_2,
			perma_city: pre_application_form.perma_city,
			perma_state: pre_application_form.perma_state,
			perma_zip_code: pre_application_form.perma_zip_code,
			perma_country: pre_application_form.perma_country,
			passport_number: pre_application_form.passport_number,
			passport_issue_date: pre_application_form.passport_issue_date,
			passport_expiry_date: pre_application_form.passport_expiry_date,
			passport_issue_country: pre_application_form.passport_issue_country,
			city_of_birth: pre_application_form.city_of_birth,
			country_of_birth: pre_application_form.country_of_birth,
			nationality: pre_application_form.nationality,
			country_of_citizenship: pre_application_form.country_of_citizenship,
			are_you_citizen_of_more_than_one_country: String(
				pre_application_form.are_you_citizen_of_more_than_one_country
			),
			names_of_countries_of_citizenship: pre_application_form.names_of_countries_of_citizenship,
			are_you_living_in_other_country: String(pre_application_form.are_you_living_in_other_country),
			names_of_countries_living_in: pre_application_form.names_of_countries_living_in,
			has_applied_for_immigration: String(pre_application_form.has_applied_for_immigration),
			has_been_refused_Visa: String(pre_application_form.has_been_refused_Visa),
			has_been_convicted: String(pre_application_form.has_been_convicted),
			emergency_contact_name: pre_application_form.emergency_contact_name,
			emergency_contact_phone: pre_application_form.emergency_contact_phone,
			emergency_contact_email: pre_application_form.emergency_contact_email,
			emergency_contact_relationship: pre_application_form.emergency_contact_relationship,
			dependents: pre_application_form.dependents || dependents_info,
			parents: pre_application_form.parents || parents_info,
			highest_education_level: pre_application_form.highest_education_level,
			country_of_education: pre_application_form.country_of_education,
			grade_10th_or_equivalent: pre_application_form.grade_10th_or_equivalent || education_data,
			grade_10th_subjects: pre_application_form.grade_10th_subjects || subjects_data,
			grade_12th_or_equivalent: pre_application_form.grade_12th_or_equivalent || education_data,
			grade_12th_subjects: pre_application_form.grade_12th_subjects || subjects_data,
			undergraduate_degree_or_equivalent:
				pre_application_form.undergraduate_degree_or_equivalent || education_data,
			undergraduate_degree_subjects:
				pre_application_form.undergraduate_degree_subjects || subjects_data,
			graduate_degree_or_equivalent:
				pre_application_form.graduate_degree_or_equivalent || education_data,
			graduate_degree_subjects: pre_application_form.graduate_degree_subjects || subjects_data,
			english_proficiency:
				pre_application_form.english_proficiency || profile_data.profile.english_proficiency,
			english_proficiency_score: pre_application_form.english_proficiency_score,
			english_proficiency_date_of_examination:
				pre_application_form.english_proficiency_date_of_examination,
			english_proficiency_trf_no: pre_application_form.english_proficiency_trf_no,
			english_proficiency_waivers: String(pre_application_form.english_proficiency_waivers),
			english_proficiency_listening: pre_application_form.english_proficiency_listening,
			english_proficiency_speaking: pre_application_form.english_proficiency_speaking,
			english_proficiency_reading: pre_application_form.english_proficiency_reading,
			english_proficiency_writing: pre_application_form.english_proficiency_writing,
			sat_score: pre_application_form.sat_score,
			sat_date_of_examination: pre_application_form.sat_date_of_examination,
			sat_ebrw: pre_application_form.sat_ebrw,
			sat_math: pre_application_form.sat_math,
			sat_reading: pre_application_form.sat_reading,
			sat_writing: pre_application_form.sat_writing,
			act_score: pre_application_form.act_score,
			act_date_of_examination: pre_application_form.act_date_of_examination,
			act_english: pre_application_form.act_english,
			act_math: pre_application_form.act_math,
			act_reading: pre_application_form.act_reading,
			act_science: pre_application_form.act_science,
			act_writing: pre_application_form.act_writing,
			eca_specific_achievements:
				pre_application_form.eca_specific_achievements || eca_specific_achievements,
			eca_activities: pre_application_form.eca_activities || eca_activities,
			has_gap: String(pre_application_form.has_gap),
			gap_explanation: pre_application_form.gap_explanation,
			work_experience: pre_application_form.work_experience || work_experience
		},

		extend: validator({ schema }),
		onSubmit(values, context) {
			$submitData.mutate(values);
		}
	});

	let education_level_value: number;

	$: {
		education_level.findIndex((item, index) => {
			if (item.value === $data.highest_education_level) {
				education_level_value = index;
			}
		});
	}
</script>

<form use:form class="w-full mt-8">
	<section class="form-section">
		<h2>Personal Information</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="">
				<Label label_for="first_name" label="First Name" />
				<Input
					id="first_name"
					name="first_name"
					type="text"
					placeholder="Ex. Abdullah"
					error={$errors.first_name}
				/>

				<Error message={$errors.first_name} />
			</div>
			<div class="">
				<Label label_for="middle_name" label="Middle Name" />
				<Input
					id="middle_name"
					name="middle_name"
					type="text"
					placeholder="Ex. Abdullah"
					error={$errors.middle_initials}
				/>

				<Error message={$errors.middle_initials} />
			</div>
			<div class="">
				<Label label_for="last_name" label="Last Name" />
				<Input
					id="last_name"
					name="last_name"
					type="text"
					placeholder="Ex. Abdullah"
					error={$errors.last_name}
				/>

				<Error message={$errors.last_name} />
			</div>
			<div class="">
				<Label label_for="date_of_birth" label="Date of Birth" />
				<IconInput
					type="date"
					id="date_of_birth"
					name="date_of_birth"
					placeholder="Date of Birth"
					error={$errors.date_of_birth}
					><CalendarDays />
				</IconInput>

				<Error message={$errors.date_of_birth} />
			</div>
			<div class="">
				<Label label_for="gender" label="Gender" />
				<Select id="gender" name="gender" placeholder="Gender" error={$errors.gender}>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
					<option value="prefer_not">Prefer Not to Say</option>
				</Select>
				<Error message={$errors.gender} />
			</div>
			<div class="">
				<Label label_for="marital_status" label="Marital Status" />
				<Select
					id="marital_status"
					name="marital_status"
					placeholder="Marital Status"
					error={$errors.marital_status}
				>
					<option value="single">Single</option>
					<option value="married">Married</option>
					<option value="divorced">Divorced</option>
					<option value="other">Other</option>
					<option value="prefer_not">Prefer Not to Say</option>
				</Select>
				<Error message={$errors.marital_status} />
			</div>
			<div class="">
				<Label label_for="desired_level_of_study" label="Desired Level of Study" />
				<Select
					id="desired_level_of_study"
					name="desired_level_of_study"
					placeholder="Desired Level of Study"
					error={$errors.desired_level_of_study}
				>
					{#each education_level as level}
						<option value={level.value}>{level.label}</option>
					{/each}
				</Select>
				<Error message={$errors.desired_level_of_study} />
			</div>
			<div class="">
				<Label label_for="desired_field_of_study" label="Desired Field of Study" />
				<Input
					id="desired_field_of_study"
					name="desired_field_of_study"
					type="text"
					error={$errors.desired_field_of_study}
				/>
				<Error message={$errors.desired_field_of_study} />
			</div>
			<div class="">
				<Label label_for="total_number_of_visa_needed" label="Total Number of Visa Needed" />
				<Input
					id="total_number_of_visa_needed"
					name="total_number_of_visa_needed"
					type="text"
					error={$errors.total_number_of_visa_needed}
				/>
				<Error message={$errors.total_number_of_visa_needed} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>Contact Information</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="">
				<Label label_for="phone" label="Phone Number" />
				<Input
					id="phone"
					name="phone"
					type="text"
					placeholder="+8801XXXXXXXXX"
					error={$errors.phone}
				/>

				<Error message={$errors.phone} />
			</div>
			<div class="">
				<Label label_for="email" label="Email" />
				<Input
					id="email"
					name="email"
					type="text"
					placeholder="example@example.com"
					error={$errors.email}
				/>

				<Error message={$errors.email} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>Emergency Contact Information</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="">
				<Label label_for="emergency_contact_name" label="Name" />
				<Input
					id="emergency_contact_name"
					name="emergency_contact_name"
					type="text"
					placeholder="Ex. Abdullah"
					error={$errors.emergency_contact_name}
				/>

				<Error message={$errors.emergency_contact_name} />
			</div>
			<div class="">
				<Label label_for="emergency_contact_relationship" label="Relation" />
				<Input
					id="emergency_contact_relationship"
					name="emergency_contact_relationship"
					type="text"
					placeholder="Ex. Father"
					error={$errors.emergency_contact_relationship}
				/>

				<Error message={$errors.emergency_contact_relationship} />
			</div>

			<div class="">
				<Label label_for="emergency_contact_phone" label="Phone Number" />
				<Input
					id="emergency_contact_phone"
					name="emergency_contact_phone"
					type="text"
					placeholder="+8801XXXXXXXXX"
					error={$errors.emergency_contact_phone}
				/>

				<Error message={$errors.emergency_contact_phone} />
			</div>
			<div class="">
				<Label label_for="emergency_contact_email" label="Email" />
				<Input
					id="emergency_contact_email"
					name="emergency_contact_email"
					type="text"
					placeholder="example@example.com"
					error={$errors.emergency_contact_email}
				/>

				<Error message={$errors.emergency_contact_email} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>Present Address</h2>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
			<div class="md:col-span-4">
				<Label label_for="address_line_1" label="Address Line 1" />
				<Input
					id="address_line_1"
					name="address_line_1"
					type="text"
					error={$errors.address_line_1}
				/>

				<Error message={$errors.address_line_1} />
			</div>
			<div class="md:col-span-4">
				<Label label_for="address_line_2" label="Address Line 2" />
				<Input
					id="address_line_2"
					name="address_line_2"
					type="text"
					error={$errors.address_line_2}
				/>

				<Error message={$errors.address_line_2} />
			</div>
			<div class="">
				<Label label_for="city" label="City" />
				<Input id="city" name="city" type="text" error={$errors.city} />

				<Error message={$errors.city} />
			</div>

			<div class="">
				<Label label_for="state" label="State" />
				<Input id="state" name="state" type="text" error={$errors.state} />

				<Error message={$errors.state} />
			</div>
			<div class="">
				<Label label_for="country" label="Country" />
				<Select id="country" name="country" error={$errors.country}>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</Select>

				<Error message={$errors.country} />
			</div>
			<div class="">
				<Label label_for="zip_code" label="Zip Code" />
				<Input id="zip_code" name="zip_code" type="text" error={$errors.zip_code} />

				<Error message={$errors.zip_code} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>Permanent Address</h2>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
			<div class="md:col-span-4">
				<Label label_for="perma_address_line_1" label="Address Line 1" />
				<Input
					id="perma_address_line_1"
					name="perma_address_line_1"
					type="text"
					error={$errors.perma_address_line_1}
				/>

				<Error message={$errors.perma_address_line_1} />
			</div>
			<div class="md:col-span-4">
				<Label label_for="perma_address_line_2" label="Address Line 2" />
				<Input
					id="perma_address_line_2"
					name="perma_address_line_2"
					type="text"
					error={$errors.perma_address_line_2}
				/>

				<Error message={$errors.perma_address_line_2} />
			</div>
			<div class="">
				<Label label_for="perma_city" label="City" />
				<Input id="perma_city" name="perma_city" type="text" error={$errors.perma_city} />

				<Error message={$errors.perma_city} />
			</div>

			<div class="">
				<Label label_for="perma_state" label="State" />
				<Input id="perma_state" name="perma_state" type="text" error={$errors.perma_state} />

				<Error message={$errors.perma_state} />
			</div>
			<div class="">
				<Label label_for="perma_country" label="Country" />
				<Select id="perma_country" name="perma_country" error={$errors.perma_country}>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</Select>

				<Error message={$errors.perma_country} />
			</div>
			<div class="">
				<Label label_for="perma_zip_code" label="Zip Code" />
				<Input
					id="perma_zip_code"
					name="perma_zip_code"
					type="text"
					error={$errors.perma_zip_code}
				/>

				<Error message={$errors.perma_zip_code} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>Passport Information</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="">
				<Label label_for="passport_number" label="Passpot No." />
				<Input
					id="passport_number"
					name="passport_number"
					type="text"
					error={$errors.passport_number}
				/>

				<Error message={$errors.passport_number} />
			</div>
			<div class="">
				<Label label_for="passport_issue_date" label="Issue Date" />
				<IconInput
					type="date"
					id="passport_issue_date"
					name="passport_issue_date"
					error={$errors.passport_issue_date}
					><CalendarDays />
				</IconInput>

				<Error message={$errors.passport_issue_date} />
			</div>
			<div class="">
				<Label label_for="passport_expiry_date" label="Expiry Date" />
				<IconInput
					type="date"
					id="passport_expiry_date"
					name="passport_expiry_date"
					error={$errors.passport_expiry_date}
					><CalendarDays />
				</IconInput>

				<Error message={$errors.passport_expiry_date} />
			</div>

			<div class="">
				<Label label_for="passport_issue_country" label="Passport Issue Country" />
				<Select
					id="passport_issue_country"
					name="passport_issue_country"
					error={$errors.passport_issue_country}
				>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</Select>

				<Error message={$errors.passport_issue_country} />
			</div>
			<div class="">
				<Label label_for="city_of_birth" label="City of Birth" />
				<Input id="city_of_birth" name="city_of_birth" type="text" error={$errors.city_of_birth} />

				<Error message={$errors.city_of_birth} />
			</div>
			<div class="">
				<Label label_for="country_of_birth" label="Country of Birth" />
				<Select id="country_of_birth" name="country_of_birth" error={$errors.country_of_birth}>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</Select>

				<Error message={$errors.country_of_birth} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>Background Information</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="">
				<Label label_for="nationality" label="Nationality" />
				<Input id="nationality" name="nationality" type="text" error={$errors.nationality} />

				<Error message={$errors.nationality} />
			</div>

			<div class="">
				<Label label_for="country_of_citizenship" label="Country of Citizenship" />
				<Select
					id="country_of_citizenship"
					name="country_of_citizenship"
					error={$errors.country_of_citizenship}
				>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</Select>

				<Error message={$errors.country_of_citizenship} />
			</div>
			<div class="col-span-2">
				<Label
					label_for="are_you_citizen_of_more_than_one_country"
					label="Are you a citizen of more than one country?"
				/>
				<Select
					id="are_you_citizen_of_more_than_one_country"
					name="are_you_citizen_of_more_than_one_country"
					error={$errors.are_you_citizen_of_more_than_one_country}
				>
					<option value={false}>No</option>
					<option value={true}>Yes</option>
				</Select>

				<Error message={$errors.are_you_citizen_of_more_than_one_country} />
			</div>
			{#if $data.are_you_citizen_of_more_than_one_country == 'true'}
				<div
					in:fly={{ y: -50, duration: 500 }}
					out:fly={{ y: 50, duration: 300 }}
					class="col-span-2"
				>
					<Label
						label_for="names_of_countries_of_citizenship"
						label="Names of Countries of Citizenship"
					/>
					<Input
						type="text"
						id="names_of_countries_of_citizenship"
						name="names_of_countries_of_citizenship"
						placeholder="Separate by commas"
						error={$errors.names_of_countries_of_citizenship}
					/>
					<Error message={$errors.names_of_countries_of_citizenship} />
				</div>
			{/if}
			<div class="col-span-2">
				<Label
					label_for="are_you_living_in_other_country"
					label="Are you living and studying in any other country?"
				/>
				<Select
					id="are_you_living_in_other_country"
					name="are_you_living_in_other_country"
					error={$errors.are_you_living_in_other_country}
				>
					<option value={false}>No</option>
					<option value={true}>Yes</option>
				</Select>

				<Error message={$errors.are_you_living_in_other_country} />
			</div>
			{#if $data.are_you_living_in_other_country == 'true'}
				<div
					in:fly={{ y: -50, duration: 500 }}
					out:fly={{ y: 50, duration: 300 }}
					class="col-span-2"
				>
					<Label
						label_for="names_of_countries_living_in"
						label="Name of the country you are living in"
					/>
					<Select
						id="names_of_countries_living_in"
						name="names_of_countries_living_in"
						error={$errors.names_of_countries_living_in}
					>
						{#each countries as country}
							<option value={country.name}>{country.name}</option>
						{/each}
					</Select>

					<Error message={$errors.names_of_countries_living_in} />
				</div>
			{/if}
			<div class="col-span-2">
				<Label
					label_for="has_applied_for_immigration"
					label="Have you applied for any type of immigration into any country?"
				/>
				<Select
					id="has_applied_for_immigration"
					name="has_applied_for_immigration"
					error={$errors.has_applied_for_immigration}
				>
					<option value={false}>No</option>
					<option value={true}>Yes</option>
				</Select>

				<Error message={$errors.has_applied_for_immigration} />
			</div>
			<div class="col-span-2">
				<Label
					label_for="has_been_refused_Visa"
					label="Have you been refused Visa for any country?"
				/>
				<Select
					id="has_been_refused_Visa"
					name="has_been_refused_Visa"
					error={$errors.has_been_refused_Visa}
				>
					<option value={false}>No</option>
					<option value={true}>Yes</option>
				</Select>

				<Error message={$errors.has_been_refused_Visa} />
			</div>
			<div class="col-span-2">
				<Label
					label_for="has_been_convicted"
					label="Have you ever been convicted of a criminal offence?"
				/>
				<Select
					id="has_been_convicted"
					name="has_been_convicted"
					error={$errors.has_been_convicted}
				>
					<option value={false}>No</option>
					<option value={true}>Yes</option>
				</Select>

				<Error message={$errors.has_been_convicted} />
			</div>
		</div>
	</section>
	{#if $data.total_number_of_visa_needed > 1}
		{#each $data.dependents as _, i}
			<section
				in:fly={{ y: -50, duration: 500 }}
				out:fly={{ y: 50, duration: 300 }}
				class="form-section"
			>
				<h2>Dependent {i + 1}</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div class="col-span-2">
						<Label label_for="dependent_full_name_{i}" label="Full Name" />
						<InputExposed
							bind:value={$data.dependents[i].full_name}
							type="text"
							id="dependent_full_name_{i}"
							name="dependent_full_name_{i}"
							placeholder="Full Name of Dependent"
						/>
					</div>
					<div class="">
						<Label label_for="dependent_relationship_{i}" label="Relationship" />
						<SelectExposed
							bind:value={$data.dependents[i].relationship}
							id="dependent_relationship{i}"
							name="dependent_relationship{i}"
						>
							<option value="spouse">Spouse</option>
							<option value="child">Child</option>
						</SelectExposed>
					</div>
					<div class="">
						<Label label_for="dependent_phone{i}" label="Phone" />
						<InputExposed
							bind:value={$data.dependents[i].phone}
							type="text"
							id="dependent_phone{i}"
							name="dependent_phone{i}"
							placeholder="+8801XXXXXXXXX"
						/>
					</div>
					<div class="">
						<Label label_for="dependent_email{i}" label="Email" />
						<InputExposed
							bind:value={$data.dependents[i].phone}
							type="text"
							id="dependent_email{i}"
							name="dependent_email{i}"
							placeholder="example@example.com"
						/>
					</div>
					<div class="">
						<Label label_for="dependent_address{i}" label="Phone" />
						<InputExposed
							bind:value={$data.dependents[i].address}
							type="text"
							id="dependent_address{i}"
							name="dependent_address{i}"
							placeholder=""
						/>
					</div>
					<div class="">
						<Label label_for="dependent_dob{i}" label="Date of Birth" />
						<IconInputExposed
							bind:value={$data.dependents[i].date_of_birth}
							type="date"
							id="dependent_dob{i}"
							name="dependent_dob{i}"><CalendarDays /></IconInputExposed
						>
					</div>
				</div>
			</section>
		{/each}
	{/if}
	<section class="form-section">
		<h2>Academic Qualifications</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="">
				<Label label_for="highest_education_level" label="Highest Education Level" />
				<Select
					id="highest_education_level"
					name="highest_education_level"
					error={$errors.highest_education_level}
				>
					{#each education_level as level}
						<option value={level.value}>{level.label}</option>
					{/each}
				</Select>
				<Error message={$errors.highest_education_level} />
			</div>
			<div class="">
				<Label label_for="country_of_education" label="Country of Education" />
				<SelectExposed
					bind:value={$data.country_of_education}
					id="country_of_education"
					name="country_of_education"
				>
					{#each countries as country}
						<option value={country.name}>{country.name}</option>
					{/each}
				</SelectExposed>
				<Error message={$errors.country_of_education} />
			</div>
		</div>
	</section>
	{#if education_level_value >= 1}
		<section
			in:fly={{ y: -50, duration: 500 }}
			out:fly={{ y: 50, duration: 300 }}
			class="form-section"
		>
			<h2>Grade 10th or Equivalent</h2>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div class="col-span-3">
					<Label label_for="grade_10th_name_of_exam" label="Name of the Examination" />
					<InputExposed
						type="text"
						id="grade_10th_name_of_exam"
						name="grade_10th_name_of_exam"
						placeholder="Name of the Examination"
						bind:value={$data.grade_10th_or_equivalent.name_of_exam}
					/>
				</div>
				<div class="">
					<Label label_for="grade_10th_primary_language" label="Primary Language of Study" />
					<InputExposed
						type="text"
						id="grade_10th_primary_language"
						name="grade_10th_primary_language"
						placeholder="Primary Language of Study"
						bind:value={$data.grade_10th_or_equivalent.primary_language}
					/>
				</div>
				<div class="">
					<Label label_for="grade_10th_name_of_board" label="Name of Board" />
					<InputExposed
						type="text"
						id="grade_10th_name_of_board"
						name="grade_10th_name_of_board"
						placeholder="Name of Board"
						bind:value={$data.grade_10th_or_equivalent.name_of_board}
					/>
				</div>
				<div class="col-span-2">
					<Label label_for="grade_10th_name_of_institution" label="Name of Institution" />
					<InputExposed
						type="text"
						id="grade_10th_name_of_institution"
						name="grade_10th_name_of_institution"
						placeholder="Name of Institution"
						bind:value={$data.grade_10th_or_equivalent.name_of_institution}
					/>
				</div>
				<div class="">
					<Label label_for="grade_10th_country_of_study" label="Country of Education" />
					<SelectExposed
						bind:value={$data.grade_10th_or_equivalent.country_of_study}
						id="grade_10th_country_of_study"
						name="grade_10th_country_of_study"
					>
						{#each countries as country}
							<option value={country.name}>{country.name}</option>
						{/each}
					</SelectExposed>
				</div>
				<div class="">
					<Label label_for="grade_10th_grading_system" label="Grading System" />
					<InputExposed
						type="text"
						id="grade_10th_grading_system"
						name="grade_10th_grading_system"
						placeholder="Grading System"
						bind:value={$data.grade_10th_or_equivalent.grading_system}
					/>
				</div>
				<div class="">
					<Label label_for="grade_10th_score" label="Score" />
					<InputExposed
						type="text"
						id="grade_10th_score"
						name="grade_10th_score"
						placeholder="Score"
						bind:value={$data.grade_10th_or_equivalent.score}
					/>
				</div>
				<div class="">
					<Label label_for="grade_10th_start_date" label="Start Date" />
					<IconInputExposed
						type="date"
						id="grade_10th_start_date"
						name="grade_10th_start_date"
						placeholder="Start Date"
						bind:value={$data.grade_10th_or_equivalent.start_date}
						><CalendarDays /></IconInputExposed
					>
				</div>
				<div class="">
					<Label label_for="grade_10th_end_date" label="End Date" />
					<IconInputExposed
						type="date"
						id="grade_10th_end_date"
						name="grade_10th_end_date"
						placeholder="End Date"
						bind:value={$data.grade_10th_or_equivalent.end_date}><CalendarDays /></IconInputExposed
					>
				</div>
			</div>
		</section>
		<section class="form-section">
			<h2>Grade 12th or Equivalent</h2>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div class="col-span-3">
					<Label label_for="grade_12th_name_of_exam" label="Name of the Examination" />
					<InputExposed
						type="text"
						id="grade_12th_name_of_exam"
						name="grade_12th_name_of_exam"
						placeholder="Name of the Examination"
						bind:value={$data.grade_12th_or_equivalent.name_of_exam}
					/>
				</div>
				<div class="">
					<Label label_for="grade_12th_primary_language" label="Primary Language of Study" />
					<InputExposed
						type="text"
						id="grade_12th_primary_language"
						name="grade_12th_primary_language"
						placeholder="Primary Language of Study"
						bind:value={$data.grade_12th_or_equivalent.primary_language}
					/>
				</div>
				<div class="">
					<Label label_for="grade_12th_name_of_board" label="Name of Board" />
					<InputExposed
						type="text"
						id="grade_12th_name_of_board"
						name="grade_12th_name_of_board"
						placeholder="Name of Board"
						bind:value={$data.grade_12th_or_equivalent.name_of_board}
					/>
				</div>
				<div class="col-span-2">
					<Label label_for="grade_12th_name_of_institution" label="Name of Institution" />
					<InputExposed
						type="text"
						id="grade_12th_name_of_institution"
						name="grade_12th_name_of_institution"
						placeholder="Name of Institution"
						bind:value={$data.grade_12th_or_equivalent.name_of_institution}
					/>
				</div>
				<div class="">
					<Label label_for="grade_12th_country_of_study" label="Country of Education" />
					<SelectExposed
						bind:value={$data.grade_12th_or_equivalent.country_of_study}
						id="grade_12th_country_of_study"
						name="grade_12th_country_of_study"
					>
						{#each countries as country}
							<option value={country.name}>{country.name}</option>
						{/each}
					</SelectExposed>
				</div>
				<div class="">
					<Label label_for="grade_12th_grading_system" label="Grading System" />
					<InputExposed
						type="text"
						id="grade_12th_grading_system"
						name="grade_12th_grading_system"
						placeholder="Grading System"
						bind:value={$data.grade_12th_or_equivalent.grading_system}
					/>
				</div>
				<div class="">
					<Label label_for="grade_12th_score" label="Score" />
					<InputExposed
						type="text"
						id="grade_12th_score"
						name="grade_12th_score"
						placeholder="Score"
						bind:value={$data.grade_12th_or_equivalent.score}
					/>
				</div>
				<div class="">
					<Label label_for="grade_12th_start_date" label="Start Date" />
					<IconInputExposed
						type="date"
						id="grade_12th_start_date"
						name="grade_12th_start_date"
						placeholder="Start Date"
						bind:value={$data.grade_12th_or_equivalent.start_date}
						><CalendarDays /></IconInputExposed
					>
				</div>
				<div class="">
					<Label label_for="grade_12th_end_date" label="End Date" />
					<IconInputExposed
						type="date"
						id="grade_12th_end_date"
						name="grade_12th_end_date"
						placeholder="End Date"
						bind:value={$data.grade_12th_or_equivalent.end_date}><CalendarDays /></IconInputExposed
					>
				</div>
			</div>
		</section>
		{#if education_level_value >= 4}
			<section
				in:fly={{ y: -50, duration: 500 }}
				out:fly={{ y: 50, duration: 300 }}
				class="form-section"
			>
				<h2>Undergraduate (Bachelor's) or Equivalent</h2>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div class="col-span-3">
						<Label label_for="undergraduate_degree_name_of_exam" label="Name of the Examination" />
						<InputExposed
							type="text"
							id="undergraduate_degree_name_of_exam"
							name="undergraduate_degree_name_of_exam"
							placeholder="Name of the Examination"
							bind:value={$data.undergraduate_degree_or_equivalent.name_of_exam}
						/>
					</div>
					<div class="">
						<Label
							label_for="undergraduate_degree_primary_language"
							label="Primary Language of Study"
						/>
						<InputExposed
							type="text"
							id="undergraduate_degree_primary_language"
							name="undergraduate_degree_primary_language"
							placeholder="Primary Language of Study"
							bind:value={$data.undergraduate_degree_or_equivalent.primary_language}
						/>
					</div>
					<div class="">
						<Label label_for="undergraduate_degree_name_of_board" label="Name of Board" />
						<InputExposed
							type="text"
							id="undergraduate_degree_name_of_board"
							name="undergraduate_degree_name_of_board"
							placeholder="Name of Board"
							bind:value={$data.undergraduate_degree_or_equivalent.name_of_board}
						/>
					</div>
					<div class="col-span-2">
						<Label
							label_for="undergraduate_degree_name_of_institution"
							label="Name of Institution"
						/>
						<InputExposed
							type="text"
							id="undergraduate_degree_name_of_institution"
							name="undergraduate_degree_name_of_institution"
							placeholder="Name of Institution"
							bind:value={$data.undergraduate_degree_or_equivalent.name_of_institution}
						/>
					</div>
					<div class="">
						<Label label_for="undergraduate_degree_country_of_study" label="Country of Education" />
						<SelectExposed
							bind:value={$data.undergraduate_degree_or_equivalent.country_of_study}
							id="undergraduate_degree_country_of_study"
							name="undergraduate_degree_country_of_study"
						>
							{#each countries as country}
								<option value={country.name}>{country.name}</option>
							{/each}
						</SelectExposed>
					</div>
					<div class="">
						<Label label_for="undergraduate_degree_grading_system" label="Grading System" />
						<InputExposed
							type="text"
							id="undergraduate_degree_grading_system"
							name="undergraduate_degree_grading_system"
							placeholder="Grading System"
							bind:value={$data.undergraduate_degree_or_equivalent.grading_system}
						/>
					</div>
					<div class="">
						<Label label_for="undergraduate_degree_score" label="Score" />
						<InputExposed
							type="text"
							id="undergraduate_degree_score"
							name="undergraduate_degree_score"
							placeholder="Score"
							bind:value={$data.undergraduate_degree_or_equivalent.score}
						/>
					</div>
					<div class="">
						<Label label_for="undergraduate_degree_start_date" label="Start Date" />
						<IconInputExposed
							type="date"
							id="undergraduate_degree_start_date"
							name="undergraduate_degree_start_date"
							placeholder="Start Date"
							bind:value={$data.undergraduate_degree_or_equivalent.start_date}
							><CalendarDays /></IconInputExposed
						>
					</div>
					<div class="">
						<Label label_for="undergraduate_degree_end_date" label="End Date" />
						<IconInputExposed
							type="date"
							id="undergraduate_degree_end_date"
							name="undergraduate_degree_end_date"
							placeholder="End Date"
							bind:value={$data.undergraduate_degree_or_equivalent.end_date}
							><CalendarDays /></IconInputExposed
						>
					</div>
				</div>
			</section>
		{/if}
		{#if education_level_value >= 5}
			<section
				in:fly={{ y: -50, duration: 500 }}
				out:fly={{ y: 50, duration: 300 }}
				class="form-section"
			>
				<h2>Graduate (Master's) or Equivalent</h2>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div class="col-span-3">
						<Label label_for="graduate_degree_name_of_exam" label="Name of the Examination" />
						<InputExposed
							type="text"
							id="graduate_degree_name_of_exam"
							name="graduate_degree_name_of_exam"
							placeholder="Name of the Examination"
							bind:value={$data.graduate_degree_or_equivalent.name_of_exam}
						/>
					</div>
					<div class="">
						<Label label_for="graduate_degree_primary_language" label="Primary Language of Study" />
						<InputExposed
							type="text"
							id="graduate_degree_primary_language"
							name="graduate_degree_primary_language"
							placeholder="Primary Language of Study"
							bind:value={$data.graduate_degree_or_equivalent.primary_language}
						/>
					</div>
					<div class="">
						<Label label_for="graduate_degree_name_of_board" label="Name of Board" />
						<InputExposed
							type="text"
							id="graduate_degree_name_of_board"
							name="graduate_degree_name_of_board"
							placeholder="Name of Board"
							bind:value={$data.graduate_degree_or_equivalent.name_of_board}
						/>
					</div>
					<div class="col-span-2">
						<Label label_for="graduate_degree_name_of_institution" label="Name of Institution" />
						<InputExposed
							type="text"
							id="graduate_degree_name_of_institution"
							name="graduate_degree_name_of_institution"
							placeholder="Name of Institution"
							bind:value={$data.graduate_degree_or_equivalent.name_of_institution}
						/>
					</div>
					<div class="">
						<Label label_for="graduate_degree_country_of_study" label="Country of Education" />
						<SelectExposed
							bind:value={$data.graduate_degree_or_equivalent.country_of_study}
							id="graduate_degree_country_of_study"
							name="graduate_degree_country_of_study"
						>
							{#each countries as country}
								<option value={country.name}>{country.name}</option>
							{/each}
						</SelectExposed>
					</div>
					<div class="">
						<Label label_for="graduate_degree_grading_system" label="Grading System" />
						<InputExposed
							type="text"
							id="graduate_degree_grading_system"
							name="graduate_degree_grading_system"
							placeholder="Grading System"
							bind:value={$data.graduate_degree_or_equivalent.grading_system}
						/>
					</div>
					<div class="">
						<Label label_for="graduate_degree_score" label="Score" />
						<InputExposed
							type="text"
							id="graduate_degree_score"
							name="graduate_degree_score"
							placeholder="Score"
							bind:value={$data.graduate_degree_or_equivalent.score}
						/>
					</div>
					<div class="">
						<Label label_for="graduate_degree_start_date" label="Start Date" />
						<IconInputExposed
							type="date"
							id="graduate_degree_start_date"
							name="graduate_degree_start_date"
							placeholder="Start Date"
							bind:value={$data.graduate_degree_or_equivalent.start_date}
							><CalendarDays /></IconInputExposed
						>
					</div>
					<div class="">
						<Label label_for="graduate_degree_end_date" label="End Date" />
						<IconInputExposed
							type="date"
							id="graduate_degree_end_date"
							name="graduate_degree_end_date"
							placeholder="End Date"
							bind:value={$data.graduate_degree_or_equivalent.end_date}
							><CalendarDays /></IconInputExposed
						>
					</div>
				</div>
			</section>
		{/if}
	{/if}
	<section class="form-section">
		<h2>Language Proficiency Test</h2>
		<div class="grid grid-cols-1 md:grid-cols-6 gap-6">
			<div class="col-span-4">
				<Label label_for="english_proficiency" label="Name of the Test" />
				<Select id="english_proficiency" name="english_proficiency" placeholder="Name of the Test">
					{#each english_proficiency_tests as test}
						<option value={test.value}>{test.label}</option>
					{/each}
				</Select>
				<Error message={$errors.english_proficiency} />
			</div>
			<div class="col-start-1 col-span-2">
				<Label label_for="english_proficiency_waivers" label="Do you have IELTS Waiver?" />
				<Select
					id="english_proficiency_waivers"
					name="english_proficiency_waivers"
					placeholder="Do you have IELTS Waiver?"
				>
					<option value={false}>No</option>
					<option value={true}>Yes</option>
				</Select>
				<Error message={$errors.english_proficiency_waivers} />
			</div>
			<div class="col-span-2">
				<Label label_for="english_proficiency_date_of_examination" label="Date of Examination" />
				<IconInput
					type="date"
					id="english_proficiency_date_of_examination"
					name="english_proficiency_date_of_examination"
					placeholder="Date of Examination"><CalendarDays /></IconInput
				>
				<Error message={$errors.english_proficiency_date_of_examination} />
			</div>
			<div class="col-start-1 col-span-2">
				<Label label_for="english_proficiency_score" label="Overall Score" />
				<Input
					type="text"
					id="english_proficiency_score"
					name="english_proficiency_score"
					placeholder="Overall Score"
				/>
				<Error message={$errors.english_proficiency_score} />
			</div>
			<div class="col-span-2">
				<Label label_for="english_proficiency_trf_no" label="IELTS TRF No." />
				<Input
					type="text"
					id="english_proficiency_trf_no"
					name="english_proficiency_trf_no"
					placeholder="IELTS TRF No."
				/>
				<Error message={$errors.english_proficiency_trf_no} />
			</div>
			<div class="col-start-1">
				<Label label_for="english_proficiency_listening" label="Listening" />
				<Input
					type="text"
					id="english_proficiency_listening"
					name="english_proficiency_listening"
					placeholder="Listening"
				/>
				<Error message={$errors.english_proficiency_listening} />
			</div>
			<div class="">
				<Label label_for="english_proficiency_speaking" label="Speaking" />
				<Input
					type="text"
					id="english_proficiency_speaking"
					name="english_proficiency_speaking"
					placeholder="Speaking"
				/>
				<Error message={$errors.english_proficiency_speaking} />
			</div>
			<div class="">
				<Label label_for="english_proficiency_reading" label="Reading" />
				<Input
					type="text"
					id="english_proficiency_reading"
					name="english_proficiency_reading"
					placeholder="Reading"
				/>
				<Error message={$errors.english_proficiency_reading} />
			</div>
			<div class="">
				<Label label_for="english_proficiency_writing" label="Writing" />
				<Input
					type="text"
					id="english_proficiency_writing"
					name="english_proficiency_writing"
					placeholder="Writing"
				/>
				<Error message={$errors.english_proficiency_writing} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>SAT</h2>
		<div class="grid grid-cols-1 md:grid-cols-6 gap-6">
			<div class="col-span-2">
				<Label label_for="sat_score" label="SAT Score" />
				<Input type="text" id="sat_score" name="sat_score" placeholder="SAT Score" />
				<Error message={$errors.sat_score} />
			</div>
			<div class="col-span-2">
				<Label label_for="sat_date_of_examination" label="Date of Examination" />
				<IconInput
					type="date"
					id="sat_date_of_examination"
					name="sat_date_of_examination"
					placeholder="Date of Examination"><CalendarDays /></IconInput
				>
				<Error message={$errors.sat_date_of_examination} />
			</div>
			<div class="col-start-1 col-span-6">
				<Label label_for="sat_ebrw" label="SAT EBRW" />
				<Input type="text" id="sat_ebrw" name="sat_ebrw" placeholder="SAT Score" />
				<Error message={$errors.sat_ebrw} />
			</div>
			<div class="col-start-1 col-span-6">
				<Label label_for="sat_math" label="SAT Math" />
				<Input type="text" id="sat_math" name="sat_math" placeholder="SAT Math" />
				<Error message={$errors.sat_math} />
			</div>
		</div>
	</section>
	<section class="form-section">
		<h2>ACT</h2>
		<div class="grid grid-cols-1 md:grid-cols-6 gap-6">
			<div class="col-span-2">
				<Label label_for="act_score" label="ACT Score" />
				<Input type="text" id="act_score" name="act_score" placeholder="ACT Score" />
				<Error message={$errors.act_score} />
			</div>
			<div class="col-span-2">
				<Label label_for="act_date_of_examination" label="Date of Examination" />
				<IconInput
					type="date"
					id="act_date_of_examination"
					name="act_date_of_examination"
					placeholder="Date of Examination"><CalendarDays /></IconInput
				>
				<Error message={$errors.act_date_of_examination} />
			</div>
			<div class="col-start-1">
				<Label label_for="act_english" label="English" />
				<Input type="text" id="act_english" name="act_english" placeholder="English" />
				<Error message={$errors.act_english} />
			</div>
			<div class="">
				<Label label_for="act_math" label="Math" />
				<Input type="text" id="act_math" name="act_math" placeholder="Math" />
				<Error message={$errors.act_math} />
			</div>
			<div class="">
				<Label label_for="act_reading" label="Reading" />
				<Input type="text" id="act_reading" name="act_reading" placeholder="Reading" />
				<Error message={$errors.act_reading} />
			</div>
			<div class="">
				<Label label_for="act_science" label="Science" />
				<Input type="text" id="act_science" name="act_science" placeholder="Science" />
				<Error message={$errors.act_science} />
			</div>
			<div class="">
				<Label label_for="act_writing" label="Writing" />
				<Input type="text" id="act_writing" name="act_writing" placeholder="Writing" />
				<Error message={$errors.act_writing} />
			</div>
		</div>
	</section>
	{#each $data.work_experience as _, i}
		<section
			in:fly={{ y: -50, duration: 500 }}
			out:fly={{ y: 50, duration: 300 }}
			class="form-section"
		>
			<h2>Work Experience {i + 1}</h2>
			<div class="grid grid-cols-1 md:grid-cols-6 gap-6">
				<div class="col-span-4">
					<Label label_for="company_name_{i}" label="Company Name" />
					<InputExposed
						bind:value={$data.work_experience[i].company_name}
						type="text"
						id="company_name_{i}"
						name="company_name_{i}"
						placeholder="Company Name"
					/>
				</div>
				<div class="col-span-4">
					<Label label_for="company_address_{i}" label="Company Address" />
					<InputExposed
						bind:value={$data.work_experience[i].company_address}
						type="text"
						id="company_address_{i}"
						name="company_address_{i}"
						placeholder="Company Address"
					/>
				</div>
				<div class="col-start-1 col-span-2">
					<Label label_for="company_designation_{i}" label="Designation" />
					<InputExposed
						bind:value={$data.work_experience[i].position}
						type="text"
						id="company_designation_{i}"
						name="company_designation_{i}"
						placeholder="Designation"
					/>
				</div>
				<div class="col-span-2">
					<Label label_for="company_mode_of_salary_{i}" label="Mode of Salary" />
					<InputExposed
						bind:value={$data.work_experience[i].mode_of_salary}
						type="text"
						id="company_mode_of_salary_{i}"
						name="company_mode_of_salary_{i}"
						placeholder="Mode of Salary"
					/>
				</div>
				<div class="col-start-1 col-span-2">
					<Label label_for="company_start_date_{i}" label="Start Date" />
					<IconInputExposed
						type="date"
						id="company_start_date_{i}"
						name="company_start_date_{i}"
						placeholder="Start Date"
						bind:value={$data.work_experience[i].start_date}><CalendarDays /></IconInputExposed
					>
				</div>
				<div class="col-span-2">
					<Label label_for="company_end_date_{i}" label="End Date" />
					<IconInputExposed
						type="date"
						id="company_end_date_{i}"
						name="company_end_date_{i}"
						placeholder="End Date"
						bind:value={$data.work_experience[i].end_date}><CalendarDays /></IconInputExposed
					>
				</div>
				<div class="flex items-center gap-x-4 col-start-1 col-span-3">
					<Button
						type="button"
						on:click={addWorkExperience}
						text="Add work experience"
						defaultClass=""
						classes="bg-white hover:bg-primary border border-primary text-primary hover:text-white font-bold px-4 py-3 w-full rounded-xl"
					/>
					{#if $data.work_experience.length > 1}
						<Button
							type="button"
							on:click={deleteWorkExperience}
							text="Remove"
							defaultClass=""
							classes="bg-white border-0 text-red-600 hover:text-red-700 font-bold"
						/>
					{/if}
				</div>
			</div>
		</section>
	{/each}
	<section class="form-section">
		<h2>Study Gap</h2>
		<div class="grid grid-cols-1 md:grid-cols-6 gap-6">
			<div class="col-span-4">
				<Label label_for="has_gap" label="Do you have study gap?" />
				<Select id="has_gap" name="has_gap" error={$errors.has_gap}>
					<option value={false}>No</option>
					<option value={true}>Yes</option>
				</Select>
				<Error message={$errors.has_gap} />
			</div>
			{#if $data.has_gap === 'true'}
				<div
					in:fly={{ y: -50, duration: 500 }}
					out:fly={{ y: 50, duration: 300 }}
					class="col-span-4"
				>
					<Label label_for="gap_explanation" label="Provide an explanation for your study gap" />
					<TextArea
						rows={8}
						id="gap_explanation"
						name="gap_explanation"
						placeholder="Provide an explanation for your study gap"
					/>
					<Error message={$errors.gap_explanation} />
				</div>
			{/if}
		</div>
	</section>

	<div class="flex gap-x-4 w-full justify-end">
		<a href="/application/file_opening">
			<Button
				type="button"
				text="Go back"
				defaultClass=""
				classes="bg-transparent px-4 md:px-6 py-4 text-lighterText font-bold border border-borderColor hover:text-secondary hover:border-secondary rounded-2xl"
			/>
		</a>
		<Button
			classes="px-6 md:px-20 py-4"
			text="Save & Continue"
			loading={$submitData.isLoading}
			disabled={!$isValid}
		/>
	</div>
</form>

<style lang="postcss">
	.form-section {
		@apply flex flex-col mx-auto px-10 py-6 xl:px-20 xl:py-12 bg-white rounded-2xl mb-6;
	}

	h2 {
		@apply text-secondary font-bold text-2xl mb-8;
	}
</style>
