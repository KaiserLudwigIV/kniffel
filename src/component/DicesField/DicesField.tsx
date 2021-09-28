import React, { useEffect, useState } from "react";
import { Dice } from "./Dice";
import "./DicesFieldStyle.scss";
import { hooksI } from "../../Player";

interface Props {
	trysHook: hooksI<number>;
	diceArrHook: hooksI<number[]>;
}

const fillDiceArr = (locks: boolean[], oldArr: number[]): number[] => {
	let result: number[] = oldArr;
	for (let i = 0; i < 5; i++) {
		if (!locks[i]) result[i] = Math.floor(Math.random() * 6) + 1;
	}
	return result;
};

export const DicesField = (props: Props) => {
	const [locks, setlocks] = useState<boolean[]>(new Array(5).fill(false));
	useEffect(() => {
		setlocks(new Array(5).fill(false));
	}, [props.trysHook.state === 3]);

	useEffect(() => {
		window.addEventListener("keydown", ({ key }) => {
			if (key === "Enter") {
				document.getElementById("wuerfelBtn")?.click();
			}
		});
	}, []);

	return (
		<div className="DicesFieldContainer">
			<div>
				<div>
					{props.diceArrHook.state.map((evt: number, ind: number) => (
						<Dice
							key={ind}
							augenZahl={evt}
							ind={ind}
							locksHook={{ state: locks, set: setlocks }}
						/>
					))}
				</div>
			</div>
			<div>
				<h2 style={{ fontWeight: 400 }}>
					Noch{" "}
					<strong style={{ fontWeight: 800 }}>{props.trysHook.state}</strong>{" "}
					Versuche
				</h2>
				<button
					className="diceActionButton"
					onClick={() => {
						if (props.trysHook.state !== 0) {
							const newArr: number[] = [
								...fillDiceArr(locks, props.diceArrHook.state),
							];
							props.trysHook.set(props.trysHook.state - 1);
							props.diceArrHook.set(newArr);
						}
					}}
					id="wuerfelBtn"
				>
					Würfeln
				</button>
			</div>
		</div>
	);
};
