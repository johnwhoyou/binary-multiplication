import { writable } from 'svelte/store';

export const decMultiplicand = writable('');
export const binMultiplicand = writable('');
export const decMultiplier = writable('');
export const binMultiplier = writable('');

export const multiplyDisabled = writable(true);
export const stepCounter = writable(-1);
export const solvingMode = writable('Solving Mode');
export const algorithm = writable('Algorithm');

export const penPaper = writable({});
export const booths = writable({});
export const boothsExt = writable({});
export const seqCircuit = writable({});
