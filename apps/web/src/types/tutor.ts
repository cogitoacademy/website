export interface Tutor {
	_id: string;
	name: string;
	profilePicture: {
		asset: {
			_id: string;
			url: string;
			altText?: string;
		};
	};
	jurusan: Array<{ _key: string; value: string }>;
	competitionFields: CompetitionCategory[];
	location: Location;
	achievements: Array<{ text: Array<{ _key: string; value: string }> }>;
	experiences: Array<{ text: Array<{ _key: string; value: string }> }>;
}

export interface CompetitionCategory {
	_id: string;
	name: string;
}

export interface Location {
	_id: string;
	name: string;
}
