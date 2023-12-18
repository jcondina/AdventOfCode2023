import * as fs from "fs";

const numbersDictionary = "0123456789";
const lineLength = 140;

export function solution(): number {
	const inputMatrix: string[][] = fs
		.readFileSync("./input.txt", "utf8")
		.split("\n")
		.map((line) => line.split(""));

	const getSymbolsIndexes = (line: string[]): number[] => {
		const indexes: number[] = [];

		line.forEach((char, index) => {
			if (char === "*") {
				indexes.push(index);
			}
		});

		return indexes;
	};

	const checkSide = (index: number, inputLine: string[], numbers: number[], isLeftSide = false): void => {
		let i = isLeftSide ? index - 1 : index + 1;
		let number = 0;
		let numberLength = 0;

		while (isLeftSide ? i >= 0 : i < lineLength) {
			if (inputLine[i] === ".") break;
			if (inputLine[i] === "*") break;

			number = isLeftSide
				? number + Number(inputLine[i]) * Math.pow(10, numberLength)
				: number * 10 + Number(inputLine[i]);
			numberLength++;
			isLeftSide ? i-- : i++;
		}

		if (number) numbers.push(number);
	};

	const getNumbersFromSymbol = (index: number, inputLine: string[]): number[] => {
		const numbers: number[] = [];

		if (numbersDictionary.includes(inputLine[index])) {
			let i = index - 1;

			while (inputLine[i] !== "." && i >= 0) {
				i--;
			}

			checkSide(i, inputLine, numbers);
		} else {
			checkSide(index, inputLine, numbers, true);
			checkSide(index, inputLine, numbers);
		}

		return numbers;
	};

	const numbers: number[] = [];

	inputMatrix.forEach((line, index) => {
		const lineIndexes = getSymbolsIndexes(line);

		lineIndexes.forEach((lineIndex) => {
			let symbolNumbers: number[] = [];

			symbolNumbers = symbolNumbers.concat(getNumbersFromSymbol(lineIndex, line));
			if (index > 0) symbolNumbers = symbolNumbers.concat(getNumbersFromSymbol(lineIndex, inputMatrix[index - 1]));
			if (index < 140) symbolNumbers = symbolNumbers.concat(getNumbersFromSymbol(lineIndex, inputMatrix[index + 1]));

			if (symbolNumbers.length === 2) numbers.push(symbolNumbers[0] * symbolNumbers[1]);
		});
	});

	return numbers.reduce((acc, curr) => acc + curr, 0);
}
