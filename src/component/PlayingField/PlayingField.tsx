import React from "react";
import { PlayerI } from "../../Player";
import "./PlayingFieldStyle.scss";

interface Props {
	playerData: PlayerI;
	trys: number;
	settrys: React.Dispatch<React.SetStateAction<number>>;
	setdiceArr: React.Dispatch<React.SetStateAction<number[]>>;
}

export const PlayingField = (props: Props) => {
	const pS = props.playerData.scores; // PropSelector
	const summeOben: number =
		pS.einer + pS.zweier + pS.dreier + pS.vierer + pS.fuenfer + pS.sechser;
	const summeUnten: number =
		pS.dreierPasch + pS.viererPasch + pS.fullHouse + pS.yahtzee + pS.chance;
	const gesamtSumme: number =
		summeOben + summeUnten + (summeOben >= 63 ? 35 : 0);

	return (
		<div className="PlayingFieldContainer">
			<div>
				<span>
					<h1 className="playerNamePF">{props.playerData.name}</h1>
					<table>
						<thead>
							<tr
								onClick={() => {
									if (props.trys < 3) {
										props.settrys(3);
										props.setdiceArr([]);
									}
								}}
							>
								<td>Einer</td>
								<td>{pS.einer}</td>
							</tr>
							<tr>
								<td>Zweier</td>
								<td>{pS.zweier}</td>
							</tr>
							<tr>
								<td>Dreier</td>
								<td>{pS.dreier}</td>
							</tr>
							<tr>
								<td>Vierer</td>
								<td>{pS.vierer}</td>
							</tr>
							<tr>
								<td>Fünfer</td>
								<td>{pS.fuenfer}</td>
							</tr>
							<tr>
								<td>Sechser</td>
								<td>{pS.sechser}</td>
							</tr>
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
							<tr>
								<td>Dreier Pasch</td>
								<td>{pS.dreierPasch}</td>
							</tr>
							<tr>
								<td>Vierer Pasch</td>
								<td>{pS.viererPasch}</td>
							</tr>
							<tr>
								<td>Full House</td>
								<td>{pS.fullHouse}</td>
							</tr>
							<tr>
								<td>Yahtzee</td>
								<td>{pS.yahtzee}</td>
							</tr>
							<tr>
								<td>Chance</td>
								<td>{pS.chance}</td>
							</tr>
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
				</span>
			</div>
		</div>
	);
};
