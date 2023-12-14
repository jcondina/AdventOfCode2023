import * as fs from "fs";

const rules: { [x: string]: number } = {
	red: 12,
	green: 13,
	blue: 14,
};

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");

	const areValidValues = (gameValues: string): boolean => {
		const throws = gameValues.split(",");
		const throwsValues = throws.map((throwValue) => {
			const [value, color] = throwValue.trim().split(" ");
			return Number(value) <= rules[color];
		});

		return !throwsValues.includes(false);
	};

	const validGamesIds = inputLines.map((line) => {
		const [gameIdString, gameValuesString] = line.split(":");

		const gameValues = gameValuesString.split(";").map((values) => {
			return areValidValues(values);
		});

		return !gameValues.includes(false) ? Number(gameIdString.match(/\d+/g)) : 0;
	});

	return validGamesIds.reduce((acc, curr) => acc + curr, 0);
}
