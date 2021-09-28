import React from "react";
import { hooksI } from "../../Player";
//#region ContentImport & Array
import Dice1 from "../../content/Dice1.svg";
import Dice2 from "../../content/Dice2.svg";
import Dice3 from "../../content/Dice3.svg";
import Dice4 from "../../content/Dice4.svg";
import Dice5 from "../../content/Dice5.svg";
import Dice6 from "../../content/Dice6.svg";
import Lock from "../../content/Lock.svg";
const DiceArray: any[] = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
//#endregion

interface Props {
	augenZahl: number;
	ind: number;
	locksHook: hooksI<boolean[]>;
}

export const Dice = (props: Props) => {
	return (
		<span className="diceLock">
			<img
				src={DiceArray[props.augenZahl - 1]}
				alt="Dice"
				onClick={() => {
					let newArr = [...props.locksHook.state];
					newArr[props.ind] = !newArr[props.ind];
					props.locksHook.set(newArr);
				}}
			/>
			{props.locksHook.state[props.ind] && (
				<img
					src={Lock}
					alt="Lock"
					onClick={() => {
						let newArr = [...props.locksHook.state];
						newArr[props.ind] = !newArr[props.ind];
						props.locksHook.set(newArr);
					}}
				/>
			)}
		</span>
	);
};
