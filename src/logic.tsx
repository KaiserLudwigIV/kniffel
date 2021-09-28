import { PlayerI } from "./Player";

/** Tests if the desired Kniffel works and if it does, returns the given value. */
export const testKniffelCase = (
	diceArr: number[],
	action: string
): false | number => {
	const sortedDiceArr = diceArr.sort((a, b) => a - b); // For cases: kleinestrase & grosestrase

	switch (action) {
		case "Einer":
			return testCase(diceArr, 1);
		case "Zweier":
			return testCase(diceArr, 2);
		case "Dreier":
			return testCase(diceArr, 3);
		case "Vierer":
			return testCase(diceArr, 4);
		case "Fünfer":
			return testCase(diceArr, 5);
		case "Sechser":
			return testCase(diceArr, 6);
		case "Dreier Pasch":
			let success: boolean = false;
			for (let i = 0; i < 3; i++) {
				if (diceArr[i] === diceArr[i + 1] && diceArr[i + 1] === diceArr[i + 2])
					success = true;
			}
			if (success) return diceArr.reduce((prev, curr) => prev + curr);
			break;

		case "Vierer Pasch":
			success = false;
			for (let i = 0; i < 2; i++) {
				if (
					diceArr[i] === diceArr[i + 1] &&
					diceArr[i + 1] === diceArr[i + 2] &&
					diceArr[i + 2] === diceArr[i + 3]
				)
					success = true;
			}
			if (success) return diceArr.reduce((prev, curr) => prev + curr);
			break;

		case "Full House":
			if (new Set(diceArr).size === 2) return 25;

		case "Kleine Straße":
			const testString: string = Array.from(new Set(sortedDiceArr)).join("");
			const isTrue = ["1234", "2345", "3456"].map((evt) => {
				if (testString.includes(evt)) return true;
			});
			if (isTrue.includes(true)) return 30;
			break;

		case "Große Straße":
			if (new Set(sortedDiceArr).size === 5) return 40;
			return -1;

		case "Yahtzee":
			if (new Set(diceArr).size === 1) return 50;
			break;

		case "Chance":
			return diceArr.reduce((prev, curr) => prev + curr, 0);

		default:
			return -1; // If wrong case was input
	}
	return -1; // If every case fails
};

/** Tests if number is in array and returns the sum of those. */
const testCase = (arr: number[], toTest: number): false | number => {
	if (arr.includes(toTest))
		return arr.filter((evt) => evt === toTest).length * toTest;
	return -1;
};
