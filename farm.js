const getYieldForPlant = (plant) => plant.yield;

const getYieldForCrop = (input) =>
  getYieldForPlant(input.crop) * input.numCrops;

const getTotalYield = ({ crops }) => {
  totalYieldCrops = crops.map((crop) => getYieldForCrop(crop));
  return totalYieldCrops.reduce((a, b) => a + b);
};

// 1
const getCostsForPlant = (input) => input.costs;

const getCostsForCrop = (input) => {
  const costsForPlant = getCostsForPlant(input.crop);
  const costsForCrop = costsForPlant * input.numCrops;
  return costsForCrop;
};

// 2
const getRevenueForPlant = (plant) => {
  return plant.salePrice * plant.yield;
};

const getRevenueForCrop = (input) => {
  const revenueForPlant = getRevenueForPlant(input.crop);
  const revenueForCrop = revenueForPlant * input.numCrops;
  return revenueForCrop;
};

// 3
const getProfitForPlant = (plant) => {
  return getRevenueForPlant(plant) - getCostsForPlant(plant);
};

const getProfitForCrop = (input) => {
  const profitForPlant = getProfitForPlant(input.crop);
  const profitForCrop = profitForPlant * input.numCrops;
  return profitForCrop;
};

// 4
const getTotalProfit = (input) => {
  let totalProfit = 0;
  input.crops.forEach((crop) => {
    totalProfit += getProfitForCrop(crop);
  });
  return totalProfit;
};

// 5-8
const getYieldForPlantEnvironmentalFacts = (plant, factors) => {
  const plantYieldNoFacts = plant.yield;
  const environFactSun = factors.sun;
  const environFactWind = factors.wind;
  const plantFactSun = plant.factors.sun[environFactSun];
  const plantFactWind = plant.factors.wind[environFactWind];
  let plantYieldFactSun = 0;
  let plantYieldFactWind = 0;

  if (plantFactSun === 0) {
    plantYieldFactSun = plantYieldNoFacts;
  } else if (Math.sign(plantFactSun) === 1) {
    plantYieldFactSun =
      (plantFactSun / 100) * plantYieldNoFacts + plantYieldNoFacts;
  } else {
    plantYieldFactSun =
      plantYieldNoFacts * (plantFactSun / 100) + plantYieldNoFacts;
  }

  if (plantFactWind === 0) {
    plantYieldFactWind = plantYieldFactSun;
    return plantYieldFactWind;
  } else if (Math.sign(plantFactWind) === 1) {
    plantYieldFactWind =
      (plantFactWind / 100) * plantYieldFactSun + plantYieldFactSun;
    return plantYieldFactWind;
  } else {
    plantYieldFactWind =
      plantYieldFactSun * (plantFactWind / 100) + plantYieldFactSun;
    return plantYieldFactWind;
  }
};

// 9
const getYieldForCropEnvironmentalFacts = (input, factors) => {
  const yieldForPlantEnvironmentalFacts = getYieldForPlantEnvironmentalFacts(
    input.crop,
    factors
  );
  const yieldForCropEnvironmentalFacts =
    yieldForPlantEnvironmentalFacts * input.numCrops;
  return yieldForCropEnvironmentalFacts;
};

// 10

const getRevenueForPlantEnvironmentalFacts = (plant, factors) => {
  return plant.salePrice * getYieldForPlantEnvironmentalFacts(plant, factors);
};

const getProfitForPlantEnvironmentalFacts = (plant, factors) => {
  return (
    getRevenueForPlantEnvironmentalFacts(plant, factors) -
    getCostsForPlant(plant)
  );
};

const getProfitForCropEnvironmentalFacts = (input, factors) => {
  const profitForPlantEnvironmentalFacts = getProfitForPlantEnvironmentalFacts(
    input.crop,
    factors
  );
  const profitForCropEnvironmentalFacts =
    profitForPlantEnvironmentalFacts * input.numCrops;
  return profitForCropEnvironmentalFacts;
};

// 11
const getTotalProfitEnvironmentalFacts = (input, factors) => {
  let totalProfitEnvironmentalFacts = 0;
  input.crops.forEach((crop) => {
    totalProfitEnvironmentalFacts += getProfitForCropEnvironmentalFacts(
      crop,
      factors
    );
  });
  return totalProfitEnvironmentalFacts;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForPlant,
  getCostsForCrop,
  getRevenueForPlant,
  getRevenueForCrop,
  getProfitForPlant,
  getProfitForCrop,
  getTotalProfit,
  getYieldForPlantEnvironmentalFacts,
  getYieldForCropEnvironmentalFacts,
  getProfitForCropEnvironmentalFacts,
  getTotalProfitEnvironmentalFacts,
};
