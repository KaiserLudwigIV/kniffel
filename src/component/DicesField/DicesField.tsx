import React, { useState } from "react";
import { Dice } from "./Dice";
import "./DicesFieldStyle.scss";

interface Props {
	trys: number;
	settrys: React.Dispatch<React.SetStateAction<number>>;
	diceArr: number[];
	setdiceArr: React.Dispatch<React.SetStateAction<number[]>>;
}

const fillDiceArr = (locks: boolean[], oldArr: number[]): number[] => {
	let result: number[] = oldArr;
	for (let i = 0; i < 6; i++) {
		if (!locks[i]) result[i] = Math.floor(Math.random() * 6) + 1;
	}
	return result;
};

export const DicesField = (props: Props) => {
	const [locks, setlocks] = useState<boolean[]>(new Array(6).fill(false));

	return (
		<div className="DicesFieldContainer">
			<div>
				{props.diceArr.map((evt: number, ind: number) => (
					<Dice
						augenZahl={evt}
						key={ind}
						ind={ind}
						setLock={setlocks}
						locks={locks}
					/>
				))}
			</div>
			<div>
				<h2 style={{ fontWeight: 400 }}>
					Noch <strong style={{ fontWeight: 800 }}>{props.trys}</strong>{" "}
					Versuche
				</h2>
				<button
					className="diceActionButton"
					onClick={() => {
						if (props.trys !== 0) {
							const newArr: number[] = [...fillDiceArr(locks, props.diceArr)];
							props.settrys(props.trys - 1);
							props.setdiceArr(newArr);
						}
					}}
				>
					Würfeln
				</button>
			</div>
		</div>
	);
};
