import { writable } from 'svelte/store';

type Uploader = {
	documentName: string;
	documentUrl: string;
	recipients: {
		id: number;
		name: string;
		email: string;
		isContact: boolean;
	}[];
};

export const uploader = writable<Uploader>({
	documentName: '',
	documentUrl: '',
	recipients: [{ id: 0, name: '', email: '', isContact: false }]
});
