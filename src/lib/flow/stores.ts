import { writable } from 'svelte/store';

type FlowUser = {
	addr: string;
	cid: string;
	expiresAt: number;
	f_type: string;
	f_vsn: string;
	loggedIn: boolean;
	services: [];
} | null;

export const flowUser = writable<FlowUser>(null);
