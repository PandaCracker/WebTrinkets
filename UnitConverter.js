const domainUnits = new Map([
    ["length", ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"]],
    ["area", ["m²", "km²", "in²", "ft²", "mi²", "hectare", "acre"]],
    ["volume", ["cm³","m³", "ml", "l", "in³", "ft³", "oz", "cup", "qt", "pt", "gal", "tsp", "tbsp"]],
    ["mass", ["mg", "g", "kg", "oz", "lb", "ton", "tonne"]],
    ["temperature", ["C", "F", "K"]]
])

const TO_M = new Map([
    ["mm", 0.001],
    ["cm", 0.01],
    ["m" , 1],
    ["km", 1000],
    ["in", 0.0254],
    ["ft", 0.3048],
    ["yd", 0.9144],
    ["mi", 1609.34],
])

const To_M2 = new Map([
    ["m²", 1],
    ["km²", 1000000],
    ["in²", 0.00064516],
    ["ft²", 0.092903],
    ["mi²", 2589988.11],
    ["hectare", 10000],
    ["acre", 4046.86],
])

const TO_CM3 = new Map([
    ["cm³", 1],
    ["m³", 1000000],
    ["ml", 1],
    ["l", 1000],
    ["in³", 16.3871],
    ["ft³", 28316.8],
    ["oz", 29.5735],
    ["cup", 236.588],
    ["qt", 946.353],
    ["pt", 473.176],
    ["gal", 3785.41],
    ["tsp", 4.92892],
    ["tbsp", 14.7868],
])

const TO_G = new Map([
    ["mg", 0.000001],
    ["g", 1],
    ["kg", 1000],
    ["oz", 28.3495],
    ["lb", 453.592],
    ["ton", 907185],
    ["tonne", 1000000],
])

// Temperature conversion is a bit different, so we handle it separately

const quantity = document.querySelector("#value");
const fromUnit = document.querySelector("#fromUnit");
const toUnit = document.querySelector("#toUnit");
const result = document.querySelector("#result");
const convertButton = document.querySelector("#convertButton");
const unitDomain = document.querySelector("#unitDomain");
const domainButton = document.querySelector("#domainButton");
const domainLegend = document.querySelector("#domainLegend");


function populateUnits(domain) {
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
    domainLegend.textContent = `${domain.charAt(0).toUpperCase() + domain.slice(1)} Converter`;
    domainUnits.get(domain).forEach(unit => {
        const option = document.createElement("option");
        option.value = unit;
        option.textContent = unit;
        fromUnit.appendChild(option);
        toUnit.appendChild(option.cloneNode(true)); // Clone the option for the toUnit select
    });
}

function convert() {
    const fromValue = parseFloat(quantity.value);
    const fromUnitValue = fromUnit.value;
    const toUnitValue = toUnit.value;

    if (isNaN(fromValue)) {
        result.textContent = "Please enter a valid number.";
        return;
    }

    let conversionTable;
    if (unitDomain.value === "length") {
        conversionTable = TO_M;
    } else if (unitDomain.value === "area") {
        conversionTable = To_M2;
    } else if (unitDomain.value === "volume") {
        conversionTable = TO_CM3;
    } else if (unitDomain.value === "mass") {
        conversionTable = TO_G;
    }
    

    let convertedValue = fromValue * TO_M.get(fromUnitValue) / TO_M.get(toUnitValue);

    result.textContent = `Converted Value: ${convertedValue}`;
}


for (const domain of domainUnits.keys()) {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain.charAt(0).toUpperCase() + domain.slice(1);
    unitDomain.appendChild(option);
}
domainButton.addEventListener("click", () => {
    const selectedDomain = unitDomain.value;
    populateUnits(selectedDomain);
});
convertButton.addEventListener("click", convert);