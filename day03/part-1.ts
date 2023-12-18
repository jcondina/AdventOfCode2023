import * as fs from "fs";

const symbols = " * + = - / % & # @ $ / ";

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");

	const getSymbolsIndexes = (line: string): number[] => {
		const indexes: number[] = [];
		line.split("").forEach((char, index) => {
			if (symbols.includes(char)) {
				indexes.push(index);
			}
		});

		return indexes;
	};
}
