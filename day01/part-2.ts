import * as fs from "fs";

const numbersMap: { [x: string]: string } = {
	zero: "0",
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");

	const numbers = inputLines.map((line) => {
		let firstLineNumber = 0,
			lastLineNumber = 0,
			firstLineNumberIndex = 999,
			lastLineNumberIndex = -1;

		const updateValues = (value: string, isKey = false) => {
			const firstIndex = line.indexOf(value);
			const lastIndex = line.lastIndexOf(value);

			if (firstIndex < firstLineNumberIndex && line.indexOf(value) !== -1) {
				firstLineNumberIndex = firstIndex;
				firstLineNumber = isKey ? Number(numbersMap[value]) : Number(value);
			}

			if (lastIndex > lastLineNumberIndex) {
				lastLineNumberIndex = lastIndex;
				lastLineNumber = isKey ? Number(numbersMap[value]) : Number(value);
			}
		};

		Object.entries(numbersMap).forEach(([key, value]) => {
			if (line.includes(key)) {
				updateValues(key, true);
			}
			if (line.includes(value)) {
				updateValues(value);
			}
		});

		return firstLineNumber * 10 + lastLineNumber;
	});

	return numbers.reduce((acc, curr) => acc + curr, 0);
}
