import React from "react";
import { scores, PlayerI } from "../../Player";
import "./GameEndStyle.scss";
import firstPlace from "../../content/firstPlace.svg";
import secondePlace from "../../content/secondePlace.svg";
import thirdPlace from "../../content/thirdPlace.svg";
const placeArr: any[] = [firstPlace, secondePlace, thirdPlace];

interface Props {
	allPlayers: PlayerI[];
}

export const GameEnd = (props: Props) => {
	const summTop = (evt: PlayerI): number => {
		return [
			evt.scores.Einer,
			evt.scores.Zweier,
			evt.scores.Dreier,
			evt.scores.Vierer,
			evt.scores.Fünfer,
			evt.scores.Sechser,
		].reduce((prev, curr) => prev + (curr === -1 ? 0 : curr), 0);
	};
	const sumBot = (evt: PlayerI): number => {
		return [
			evt.scores["Dreier Pasch"],
			evt.scores["Vierer Pasch"],
			evt.scores["Full House"],
			evt.scores["Kleine Straße"],
			evt.scores["Große Straße"],
			evt.scores.Yahtzee,
			evt.scores.Chance,
		].reduce((prev, curr) => prev + (curr === -1 ? 0 : curr), 0);
	};

	const allPlayerStats: {
		sumTop: number;
		sumBot: number;
		sumTot: number;
		player: PlayerI;
	}[] = props.allPlayers
		.map((evt) => {
			const sumT = summTop(evt);
			const sumB = sumBot(evt);
			const sumTotal = sumT + sumB + (sumT >= 63 ? 35 : 0);
			return {
				sumTop: sumT,
				sumBot: sumB,
				sumTot: sumTotal,
				player: evt,
			};
		})
		.sort((a, b) => b.sumTot - a.sumTot);

	return (
		<div className="gameEnd">
			{allPlayerStats.map((evt, ind) => (
				<QuickTable playerData={evt} position={ind + 1} key={Math.random()} />
			))}
		</div>
	);
};

interface QuickTableProps {
	playerData: {
		sumTop: number;
		sumBot: number;
		sumTot: number;
		player: PlayerI;
	};
	position: number;
}

const QuickTable = (props: QuickTableProps) => {
	const pS: scores = props.playerData.player.scores;

	return (
		<div className="PlayingFieldContainer">
			<div>
				<div className="oneLastClassForPosition">
					{props.position === 1 ||
					props.position === 2 ||
					props.position === 3 ? (
						<img src={placeArr[props.position - 1]} alt="Position" />
					) : (
						<h1 className="playerNamePF">{props.position}# </h1>
					)}

					<h1 className="playerNamePF">{props.playerData.player.name}</h1>
				</div>

				<table>
					<thead>
						{["Einer", "Zweier", "Dreier", "Vierer", "Fünfer", "Sechser"].map(
							(evt: string) => (
								<tr key={Math.random()}>
									<td>{evt}</td>
									<td>
										{pS[evt as keyof scores] === -1
											? "X"
											: pS[evt as keyof scores]}
									</td>
								</tr>
							)
						)}

						<tr>
							<td className="thick">Summe oben</td>
							<td>{props.playerData.sumTop}</td>
						</tr>
						<tr>
							<td className="thick">Bonus</td>
							<td>{props.playerData.sumTop >= 63 ? 35 : 0}</td>
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
							<tr key={Math.random()}>
								<td>{evt}</td>
								<td>
									{pS[evt as keyof scores] === -1
										? "X"
										: pS[evt as keyof scores]}
								</td>
							</tr>
						))}
						<tr>
							<td className="thick">Summe unten</td>
							<td>{props.playerData.sumBot}</td>
						</tr>
						<tr style={{ backgroundColor: "#103226" }}>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
					</tbody>

					<tfoot>
						<tr>
							<td className="thick">Gesamtsumme</td>
							<td>{props.playerData.sumTot}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};
