import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const themes = [{ id: 0, name: 'Light', value: 'light' }];

const defaultTheme: string = 'light';
const initTheme: string = browser
	? window.localStorage.getItem('@paperauth:theme') ?? defaultTheme
	: defaultTheme;

const theme = writable(initTheme);

theme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('@paperauth:theme', value);
	}
});

export { theme, themes };
