export class Player implements PlayerI {
	scores: scores = {
		einer: 0,
		zweier: 0,
		dreier: 0,
		vierer: 0,
		fuenfer: 0,
		sechser: 0,
		dreierPasch: 0,
		viererPasch: 0,
		fullHouse: 0,
		kleineStrase: 0,
		groseStrase: 0,
		yahtzee: 0,
		chance: 0,
	};
	name: string;
	constructor(name: string) {
		this.name = name;
	}
}

interface scores {
	einer: number;
	zweier: number;
	dreier: number;
	vierer: number;
	fuenfer: number;
	sechser: number;
	dreierPasch: number;
	viererPasch: number;
	fullHouse: number;
	kleineStrase: number;
	groseStrase: number;
	yahtzee: number;
	chance: number;
}

export interface PlayerI {
	name: string;
	scores: scores;
}
