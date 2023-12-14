import * as fs from "fs";

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");

	const gamesPows = inputLines.map((line) => {
		let minValues: { [x: string]: number } = {
			red: 0,
			green: 0,
			blue: 0,
		};

		const [gameIdString, gameValuesString] = line.split(":");

		gameValuesString.split(";").forEach((gameValues) => {
			gameValues.split(",").forEach((throwValues) => {
				const [value, color] = throwValues.trim().split(" ");
				if (minValues[color] < Number(value)) {
					minValues[color] = Number(value);
				}
			});
		});

		return Object.values(minValues).reduce((acc, curr) => acc * curr, 1);
	});

	return gamesPows.reduce((acc, curr) => acc + curr, 0);
}
