import { writable } from 'svelte/store';
import type { Lead, Resident } from '$lib/types';

// Stores for centralized state
export const leadsStore = writable<Lead[]>([]);
export const residentsStore = writable<Resident[]>([]);

// Function to update data dynamically (used after mutations like delete)
export function setLeads(newLeads: Lead[]) {
	leadsStore.set(newLeads);
}

export function setResidents(newResidents: Resident[]) {
	residentsStore.set(newResidents);
}
