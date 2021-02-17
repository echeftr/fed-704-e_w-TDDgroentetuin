const {
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
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

// 1
describe("getCostsForPlant", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 10,
  };
  test("getCostsForPlant", () => {
    expect(getCostsForPlant(corn)).toBe(10);
  });
});

describe("getCostsForCrop", () => {
  test("Get costs for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 10,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getCostsForCrop(input)).toBe(100);
  });
});

// 2
describe("getRevenueForPlant", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 10,
    salePrice: 2,
  };
  test("Get revenue for plant", () => {
    expect(getRevenueForPlant(corn)).toBe(6);
  });
});
describe("getRevenueForCrop", () => {
  test("Get revenue for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 10,
      salePrice: 2,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getRevenueForCrop(input)).toBe(60);
  });
});

// 3
describe("getProfitForPlant", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
    salePrice: 2,
  };
  test("Get profit for plant", () => {
    expect(getProfitForPlant(corn)).toBe(5);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getProfitForCrop(input)).toBe(50);
  });
});

// 4
describe("getTotalProfit", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 2,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(37);
  });
});

// 5-8
describe("getYieldForPlantEnvironmentalFacts", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const environmentFactsLow = {
    sun: "low",
    wind: "low",
  };
  const environmentFactsHigh = {
    sun: "high",
    wind: "low",
  };

  test("Get yield for plant environmental facts: sun = low, wind = low", () => {
    expect(getYieldForPlantEnvironmentalFacts(corn, environmentFactsLow)).toBe(
      15
    );
  });
  test("Get yield for plant environmental facts: sun = high, wind = low", () => {
    expect(getYieldForPlantEnvironmentalFacts(corn, environmentFactsHigh)).toBe(
      45
    );
  });
});

// 9
describe("getYieldForCropEnvironmentalFacts", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const environmentFactsLow = {
    sun: "low",
    wind: "low",
  };
  const environmentFactsHigh = {
    sun: "high",
    wind: "low",
  };

  const input = {
    crop: corn,
    numCrops: 10,
  };

  test("Get yield for crop environmental facts: sun = low, wind = low", () => {
    expect(getYieldForCropEnvironmentalFacts(input, environmentFactsLow)).toBe(
      150
    );
  });
  test("Get yield for crop environmental facts: sun = high, wind = low", () => {
    expect(getYieldForCropEnvironmentalFacts(input, environmentFactsHigh)).toBe(
      450
    );
  });
});

// 10
describe("getProfitForCropEnvironmentalFacts", () => {
  const corn = {
    name: "corn",
    yield: 30,
    costs: 50,
    salePrice: 25,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const environmentFactsLow = {
    sun: "low",
    wind: "low",
  };
  const environmentFactsHigh = {
    sun: "high",
    wind: "low",
  };
  const input = {
    crop: corn,
    numCrops: 10,
  };

  test("Get profit for crop environmental facts: sun = low, wind = low", () => {
    expect(getProfitForCropEnvironmentalFacts(input, environmentFactsLow)).toBe(
      3250
    );
  });
  test("Get profit for crop environmental facts: sun = high, wind = low", () => {
    expect(
      getProfitForCropEnvironmentalFacts(input, environmentFactsHigh)
    ).toBe(10750);
  });
});

// 11
describe("getTotalProfitEnvironmentalFacts", () => {
  test("calculate total profit environmental facts: sun = low, wind = low", () => {
    const corn = {
      name: "corn",
      yield: 30,
      costs: 50,
      salePrice: 25,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 30,
      costs: 50,
      salePrice: 25,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const environmentFactsLow = {
      sun: "low",
      wind: "low",
    };
    const crops = [
      { crop: corn, numCrops: 6 },
      { crop: pumpkin, numCrops: 3 },
    ];
    expect(
      getTotalProfitEnvironmentalFacts({ crops }, environmentFactsLow)
    ).toBe(2925);
  });
});

describe("getTotalProfitEnvironmentalFacts", () => {
  test("calculate total profit environmental facts: sun = high, wind = low", () => {
    const corn = {
      name: "corn",
      yield: 30,
      costs: 50,
      salePrice: 25,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 30,
      costs: 50,
      salePrice: 25,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const environmentFactsHigh = {
      sun: "high",
      wind: "low",
    };
    const crops = [
      { crop: corn, numCrops: 6 },
      { crop: pumpkin, numCrops: 3 },
    ];
    expect(
      getTotalProfitEnvironmentalFacts({ crops }, environmentFactsHigh)
    ).toBe(9675);
  });
});
