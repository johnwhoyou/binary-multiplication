import { writable } from 'svelte/store';

export const multiplyDisabled = writable(true);
export const decMultiplicand = writable('');
export const binMultiplicand = writable('');
export const decMultiplier = writable('');
export const binMultiplier = writable('');