import * as fs from "fs";

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");
	const cardCopies = inputLines.map(() => 1);

	inputLines.forEach((line, index) => {
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

		if (numberAmount > 0) {
			for (let i = 1; i <= numberAmount; i++) {
				cardCopies[index + i] += cardCopies[index];
			}
		}
	});

	return cardCopies.reduce((acc, curr) => acc + curr, 0);
}
