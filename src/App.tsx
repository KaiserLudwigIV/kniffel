//#region Imports
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PlayerCreation } from "./component/PlayerCreation/PlayerCreation";
import { PlayerI } from "./Player";
import { PlayingField } from "./component/PlayingField/PlayingField";
import { DicesField } from "./component/DicesField/DicesField";

import "./globalStyles.scss";
import { GameEnd } from "./component/GameEnd/GameEnd";
//#endregion

let roundCounter: number = 0;

const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState<PlayerI | undefined>();
	const setNextPlayer = () => {
		const indCurrentPlayer = allPlayers.findIndex(
			(evt) => evt === currentPlayer
		);
		if (indCurrentPlayer + 1 === allPlayers.length) {
			setCurrentPlayer(allPlayers[0]);
			roundCounter += 1;
		} else {
			setCurrentPlayer(allPlayers[indCurrentPlayer + 1]);
		}
	};
	const [allPlayers, setallPlayers] = useState<PlayerI[]>([]);

	const [diceArr, setdiceArr] = useState<number[]>([]);
	const [trys, settrys] = useState<number>(3);

	return (
		<div>
			<h1 style={{ textAlign: "center", color: "red", padding: "2rem 0" }}>
				Kniffel
			</h1>
			{currentPlayer && roundCounter < 13 ? (
				<div className="containerGame">
					<div>
						{/**Es wurde mir zu blöd ewig viele Props untereinander einzeln durchzugeben.*/}
						<PlayingField
							playerData={currentPlayer}
							trysHook={{ state: trys, set: settrys }}
							diceArrHook={{ state: diceArr, set: setdiceArr }}
							setNextPlayer={setNextPlayer}
							allPlayersHook={{ state: allPlayers, set: setallPlayers }}
						/>
						<DicesField
							trysHook={{ state: trys, set: settrys }}
							diceArrHook={{ state: diceArr, set: setdiceArr }}
						/>
					</div>
				</div>
			) : (
				roundCounter < 13 && (
					<PlayerCreation
						setAllPlayers={setallPlayers}
						setCurrentPlayer={setCurrentPlayer}
					/>
				)
			)}
			{roundCounter === 13 && <GameEnd allPlayers={allPlayers} />}
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
