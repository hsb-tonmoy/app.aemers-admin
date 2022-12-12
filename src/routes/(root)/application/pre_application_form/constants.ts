import * as yup from 'yup';

export const dependents_info = [
	{
		full_name: '',
		relationship: '',
		phone: '',
		email: '',
		address: '',
		date_of_birth: ''
	}
];
export const parents_info = {
	full_name: '',
	relationship: '',
	phone: '',
	email: '',
	address: '',
	highest_level_of_education: ''
};

export const education_data = {
	name_of_exam: '',
	name_of_board: '',
	name_of_institution: '',
	country_of_study: '',
	state_of_study: '',
	city_of_study: '',
	degree_achieved: '',
	grading_system: '',
	score: '',
	primary_language: '',
	start_date: '',
	end_date: ''
};

export const subjects_data = {
	subject: '',
	grade: ''
};

export const work_experience = [
	{
		company_name: '',
		company_address: '',
		position: '',
		job_profile: '',
		mode_of_salary: '',
		currently_working: null,
		start_date: '',
		end_date: ''
	}
];

export const education_level = [
	{
		value: 'pre-high',
		label: 'Pre-High School'
	},
	{
		value: 'high-school',
		label: 'High School'
	},
	{
		value: 'diploma',
		label: 'Diploma'
	},
	{
		value: "associate's",
		label: "Associate's Degree"
	},
	{
		value: 'bachelors',
		label: "Bachelor's Degree"
	},
	{
		value: 'masters',
		label: "Master's Degree"
	},
	{
		value: 'phd',
		label: 'PhD'
	},
	{
		value: 'doctorate',
		label: 'Doctorate'
	},
	{
		value: 'other',
		label: 'Other'
	}
];

export const english_proficiency_tests = [
	{ value: 'ielts', label: 'IELTS' },
	{ value: 'toefl', label: 'TOEFL' },
	{ value: 'duolingo', label: 'Duolingo' },
	{ value: 'plan-to', label: 'Wish to Take IELTS' },
	{ value: 'no-test', label: 'Wish to get enrolled with no test' },
	{ value: 'moi', label: 'Wish to get enrolled with Medium of Instruction' }
];

export const eca_specific_achievements = [
	{ name: 'Valedictorian', description: '' },
	{ name: 'Salutatorian', description: '' },
	{ name: 'Intel Competition Semi-Finalist/Finalist', description: '' },
	{ name: 'National Merit Semi-Finalist/Finalist', description: '' },
	{ name: 'National Achievement', description: '' },
	{ name: 'National Olympiads', description: '' },
	{ name: 'International Olympiads', description: '' }
];
export const eca_activities = [];

export const schema = yup.object({
	first_name: yup.string().required('First name is required'),
	middle_name: yup.string(),
	last_name: yup.string().required('Last name is required'),
	email: yup.string().email().required()
});
