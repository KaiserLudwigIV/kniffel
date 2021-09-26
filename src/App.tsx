//#region Imports
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { PlayerCreation } from "./component/PlayerCreation/PlayerCreation";
import { PlayerI } from "./Player";
import { PlayingField } from "./component/PlayingField/PlayingField";
import { DicesField } from "./component/DicesField/DicesField";

import "./globalStyles.scss";
//#endregion

const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState<PlayerI | undefined>();
	const [allPlayers, setallPlayers] = useState<PlayerI[]>([]);
	useEffect(() => {
		setCurrentPlayer(allPlayers[0]);
	}, [allPlayers]);

	const [diceArr, setdiceArr] = useState<number[]>([]);
	const [trys, settrys] = useState(3);

	return (
		<div>
			<h1 style={{ textAlign: "center", color: "red", padding: "2rem 0" }}>
				Kniffel
			</h1>
			{currentPlayer ? (
				<div className="containerGame">
					<div>
						<PlayingField
							playerData={currentPlayer}
							trys={trys}
							settrys={settrys}
							setdiceArr={setdiceArr}
						/>
						<DicesField
							trys={trys}
							settrys={settrys}
							diceArr={diceArr}
							setdiceArr={setdiceArr}
						/>
					</div>
				</div>
			) : (
				<PlayerCreation setAllPlayers={setallPlayers} key={Math.random()} />
			)}
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
