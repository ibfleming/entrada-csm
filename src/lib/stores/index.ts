import type { Lead, Resident } from '$lib/types';
import { writable } from 'svelte/store';

export const leadsStore = writable<Lead[]>([]);
export const residentsStore = writable<Resident[]>([]);

export function setLeads(leads: Lead[]): void {
	leadsStore.set(leads);
}

export function setResidents(residents: Resident[]): void {
	residentsStore.set(residents);
}

export function addLead(lead: Lead): void {
	leadsStore.update((leads) => [...leads, lead]);
}

export function addResident(resident: Resident): void {
	residentsStore.update((residents) => [...residents, resident]);
}

export function removeLead(id: string): void {
	leadsStore.update((leads) => leads.filter((lead) => lead.id !== id));
}

export function removeResident(id: string): void {
	residentsStore.update((residents) => residents.filter((resident) => resident.id !== id));
}

export function updateLead(updatedLead: Lead): void {
	leadsStore.update((leads) =>
		leads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
	);
}

export function updateResident(updatedResident: Resident): void {
	residentsStore.update((residents) =>
		residents.map((resident) => (resident.id === updatedResident.id ? updatedResident : resident))
	);
}
