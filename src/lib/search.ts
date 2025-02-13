import FlexSearch from 'flexsearch';
import type { Lead, Resident } from './types';

let leadsIndex: FlexSearch.Index;
let leads: Lead[];

let residentsIndex: FlexSearch.Index;
let residents: Resident[];

export function createLeadsIndex(data: Lead[]) {
	leadsIndex = new FlexSearch.Index({ tokenize: 'forward' });

	data.forEach((lead, index) => {
		const item = `${lead.firstName} ${lead.lastName} ${lead.email}`;
		leadsIndex.add(index, item);
	});

	leads = data;
}

export function createResidentsIndex(data: Resident[]) {
	residentsIndex = new FlexSearch.Index({ tokenize: 'forward' });

	data.forEach((resident, index) => {
		const item = `${resident.firstName} ${resident.lastName} ${resident.email}`;
		leadsIndex.add(index, item);
	});

	residents = data;
}

export function searchIndex(searchQuery: string) {
	const match = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const leadResults = leadsIndex.search(match);
	const residentResults = residentsIndex.search(match);

	return {
		leadResults: leadResults
			.map((index) => leads[index as number])
			.map((lead) => ({
				...lead
			})),
		residentResults: residentResults
			.map((index) => residents[index as number])
			.map((resident) => ({
				...resident
			}))
	};
}
