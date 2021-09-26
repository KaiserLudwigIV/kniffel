import React, { useState, useReducer } from "react";
import "./PlayerCreation.scss";
import { Player, PlayerI } from "../../Player";
import { Play } from "akar-icons";

interface Props {
	setAllPlayers: React.Dispatch<React.SetStateAction<PlayerI[]>>;
}

const addPlayer = (
	players: any,
	fnInput: {
		mode: "addPlayer" | "removePlayer";
		playerName: string | undefined;
	}
) => {
	switch (fnInput.mode) {
		case "addPlayer":
			if (fnInput.playerName === "" || players.includes(fnInput.playerName))
				return players;
			return [...players, fnInput.playerName];
		case "removePlayer":
			return players.filter((e: string) => e !== fnInput.playerName);
	}
};

export const PlayerCreation = (props: Props) => {
	const [playerInput, setPlayerInput] = useState<string | undefined>("");
	const [players, dispatch] = useReducer(addPlayer, []);

	return (
		<span className="PlayerCreationContainer">
			<div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: ".5rem",
						alignItems: "center",
					}}
				>
					{players?.map((evt: string, ind: number) => (
						<div className="PlayerCreationFlex" key={ind}>
							<h2 style={{ color: "#fff" }}>{evt}</h2>
							<button
								className="PlayerCreationActionButton"
								style={{ width: "2.3rem", height: "2.3rem" }}
								onClick={() => {
									dispatch({ mode: "removePlayer", playerName: evt });
									setPlayerInput("");
								}}
							>
								-
							</button>
						</div>
					))}
				</div>
				<span
					style={{
						paddingTop: players[0] === undefined ? "0" : "1rem",
					}}
				>
					<button
						onClick={(e) => {
							{
								dispatch({ mode: "addPlayer", playerName: playerInput });
								if (!players.includes(playerInput)) setPlayerInput("");
							}
						}}
						className="PlayerCreationActionButton"
					>
						+
					</button>
					<input
						type="text"
						name="playerName"
						id="playerName"
						value={playerInput}
						onChange={(evt) => setPlayerInput(evt.currentTarget.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								dispatch({ mode: "addPlayer", playerName: playerInput });
								if (!players.includes(playerInput)) setPlayerInput("");
							}
						}}
					/>
					<button
						className="StartGameButton"
						onClick={() => {
							const allPlayers: PlayerI[] = players.map(
								(e: string) => new Player(e)
							);
							props.setAllPlayers(allPlayers);
						}}
					>
						Start Game
					</button>
				</span>
			</div>
		</span>
	);
};
