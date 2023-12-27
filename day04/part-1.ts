import * as fs from "fs";

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");

	const cardPoints: number[] = inputLines.map((line) => {
		const [, cardNumbers] = line.split(":");
		const [winningNumbersString, gotNumbersString] = cardNumbers.split("|");
		const winningNumbers = winningNumbersString.match(/\d+/g)?.map(Number);
		const gotNumbers = gotNumbersString.match(/\d+/g)?.map(Number);

		let numberAmount = 0;

		winningNumbers?.forEach((number) => {
			if (gotNumbers?.includes(number)) {
				numberAmount++;
			}
		});

		if (numberAmount === 0) {
			return 0;
		}

		return Math.pow(2, numberAmount - 1);
	});

	return cardPoints.reduce((a, b) => a + b, 0);
}
