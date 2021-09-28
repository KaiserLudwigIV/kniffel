import React from "react";
import { PlayerI, hooksI, scores } from "../../Player";
import "./PlayingFieldStyle.scss";
import { testKniffelCase } from "../../logic";

interface Props {
	playerData: PlayerI;
	trysHook: hooksI<number>;
	diceArrHook: hooksI<number[]>;
	allPlayersHook: hooksI<PlayerI[]>;
	setNextPlayer: () => void;
}

export const PlayingField = (props: Props) => {
	const pS: scores = props.playerData.scores; // PropSelector for readability
	const summeOben: number = [
		pS.Einer,
		pS.Zweier,
		pS.Dreier,
		pS.Vierer,
		pS.Fünfer,
		pS.Sechser,
	].reduce((prev, curr) => prev + (curr === -1 ? 0 : curr), 0);

	const summeUnten: number = [
		pS["Dreier Pasch"],
		pS["Vierer Pasch"],
		pS["Full House"],
		pS["Kleine Straße"],
		pS["Große Straße"],
		pS.Yahtzee,
		pS.Chance,
	].reduce((prev, curr) => prev + (curr === -1 ? 0 : curr), 0);

	const gesamtSumme: number =
		summeOben + summeUnten + (summeOben >= 63 ? 35 : 0);

	const checkIfDiced = () => {
		if (!(props.trysHook.state < 3)) {
			alert("Bitte Würfel erst!");
			return false;
		}
		return true;
	};
	const nextPlayer = () => {
		props.trysHook.set(3);
		props.diceArrHook.set([]);
		props.setNextPlayer();
	};

	const testNReset = (action: string) => {
		if (checkIfDiced()) {
			const kniffelScore = testKniffelCase(props.diceArrHook.state, action);
			if (kniffelScore || kniffelScore === -1) {
				const playersInd: number = props.allPlayersHook.state.findIndex(
					(evt) => evt === props.playerData
				);
				return {
					toSetValue: kniffelScore,
					pIndex: playersInd,
					copyOfPlayer: { ...props.playerData },
					copyOfPlayerArr: [...props.allPlayersHook.state],
				};
			}
			alert("Dieses Feld geht nicht");
		}
		return false;
	};

	return (
		<div className="PlayingFieldContainer">
			<div>
				<h1 className="playerNamePF">{props.playerData.name}</h1>
				<table>
					<thead>
						{["Einer", "Zweier", "Dreier", "Vierer", "Fünfer", "Sechser"].map(
							(evt: string) => (
								<TrComponent
									key={Math.random()}
									textNValue={{
										text: evt,
										value: props.playerData.scores[evt as keyof scores],
									}}
									testNnextPlayer={{
										nextPlayer: nextPlayer,
										testNReset: testNReset,
									}}
									setAllPlayer={props.allPlayersHook.set}
								/>
							)
						)}

						<tr>
							<td className="thick">Summe oben</td>
							<td>{summeOben}</td>
						</tr>
						<tr>
							<td className="thick">Bonus</td>
							<td>{summeOben >= 63 ? 35 : 0}</td>
						</tr>
						<tr style={{ backgroundColor: "#103226" }}>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
					</thead>
					<tbody>
						{[
							"Dreier Pasch",
							"Vierer Pasch",
							"Full House",
							"Kleine Straße",
							"Große Straße",
							"Yahtzee",
							"Chance",
						].map((evt: string) => (
							<TrComponent
								key={Math.random()}
								textNValue={{
									text: evt,
									value: props.playerData.scores[evt as keyof scores],
								}}
								testNnextPlayer={{
									nextPlayer: nextPlayer,
									testNReset: testNReset,
								}}
								setAllPlayer={props.allPlayersHook.set}
							/>
						))}
						<tr>
							<td className="thick">Summe unten</td>
							<td>{summeUnten}</td>
						</tr>
						<tr style={{ backgroundColor: "#103226" }}>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
					</tbody>

					<tfoot>
						<tr>
							<td className="thick">Gesamtsumme</td>
							<td>{gesamtSumme}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

interface TrPropsI {
	// Some props are getting stuffed into a object for readability in the PlayingField Component
	// Gets destructured later. Also please dont mind those long types thank you :)
	textNValue: { text: string; value: number };
	testNnextPlayer: {
		testNReset: (action: string) =>
			| false
			| {
					toSetValue: number;
					pIndex: number;
					copyOfPlayer: {
						name: string;
						scores: scores;
					};
					copyOfPlayerArr: PlayerI[];
			  };
		nextPlayer: () => void;
	};
	setAllPlayer: React.Dispatch<React.SetStateAction<PlayerI[]>>;
}

const TrComponent = (props: TrPropsI) => {
	const text = props.textNValue.text;
	const value = props.textNValue.value;
	const testNResetFn = props.testNnextPlayer.testNReset;

	return (
		<tr
			onClick={() => {
				if (value !== 0 || value + 1 === -1) return;
				const setterObj = testNResetFn(text);
				if (setterObj) {
					setterObj.copyOfPlayerArr[setterObj.pIndex].scores[
						text as keyof scores
					] = setterObj.toSetValue;

					props.setAllPlayer(setterObj.copyOfPlayerArr);
					props.testNnextPlayer.nextPlayer();
				}
			}}
		>
			<td>{text}</td>
			<td>{value === -1 ? "X" : value}</td>
		</tr>
	);
};
