import * as fs from "fs";

export function solution(): number {
	const inputLines = fs.readFileSync("./input.txt", "utf8").split("\n");

	const [, seedsString] = inputLines[0].split(": ");
	const seeds = seedsString.split(" ").map(Number);
	const seedToSoilStrings = inputLines.slice(3, 6);
	const soilToFertilizerStrings = inputLines.slice(8, 37);
	const fertilizerToWaterStrings = inputLines.slice(39, 82);
	const waterToLightStrings = inputLines.slice(84, 125);
	const lightToTemperatureStrings = inputLines.slice(127, 158);
	const temperatureToHumidityStrings = inputLines.slice(160, 207);
	const humidityToLocationStrings = inputLines.slice(209, 250);

	const almanac: { [x: string]: number[] } = {
		seeds,
		soil: new Array(seeds.length),
		fertilizer: new Array(seeds.length),
		water: new Array(seeds.length),
		light: new Array(seeds.length),
		temperature: new Array(seeds.length),
		humidity: new Array(seeds.length),
		location: new Array(seeds.length),
	};

	const mapAlmanacValues = (mapStrings: string[], almanacSource: string, almanacDestination: string) => {
		mapStrings.forEach((mapString) => {
			const [destination, source, quantity] = mapString.split(" ").map(Number);

			almanac[almanacSource].forEach((almanacSourceValue, index) => {
				if (almanacSourceValue >= source && almanacSourceValue < source + quantity) {
					almanac[almanacDestination][index] = destination + Math.abs(almanacSourceValue - source);
				} else {
					if (!almanac[almanacDestination][index]) {
						almanac[almanacDestination][index] = almanacSourceValue;
					}
				}
			});
		});
	};

	mapAlmanacValues(seedToSoilStrings, "seeds", "soil");
	mapAlmanacValues(soilToFertilizerStrings, "soil", "fertilizer");
	mapAlmanacValues(fertilizerToWaterStrings, "fertilizer", "water");
	mapAlmanacValues(waterToLightStrings, "water", "light");
	mapAlmanacValues(lightToTemperatureStrings, "light", "temperature");
	mapAlmanacValues(temperatureToHumidityStrings, "temperature", "humidity");
	mapAlmanacValues(humidityToLocationStrings, "humidity", "location");

	return Math.min(...almanac.location);
}
