export class Player implements PlayerI {
	scores: scores = {
		Einer: 0,
		Zweier: 0,
		Dreier: 0,
		Vierer: 0,
		Fünfer: 0,
		Sechser: 0,
		"Dreier Pasch": 0,
		"Vierer Pasch": 0,
		"Full House": 0,
		"Kleine Straße": 0,
		"Große Straße": 0,
		Yahtzee: 0,
		Chance: 0,
	};
	name: string;
	constructor(name: string) {
		this.name = name;
	}
}

export interface scores {
	Einer: number;
	Zweier: number;
	Dreier: number;
	Vierer: number;
	Fünfer: number;
	Sechser: number;
	"Dreier Pasch": number;
	"Vierer Pasch": number;
	"Full House": number;
	"Kleine Straße": number;
	"Große Straße": number;
	Yahtzee: number;
	Chance: number;
}

export interface PlayerI {
	name: string;
	scores: scores;
}

export interface hooksI<T> {
	state: T;
	set: React.Dispatch<React.SetStateAction<T>>;
}
