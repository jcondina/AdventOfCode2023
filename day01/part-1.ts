import * as fs from "fs";

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");

	const numbers = inputLines.map((line) => {
		const digits = line.match(/\d+/g)?.join("").split("");
		return Number(digits?.[0]) * 10 + Number(digits?.pop());
	});

	const sum = numbers.reduce((acc, curr) => acc + curr, 0);

	return sum;
}
