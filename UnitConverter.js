const quantity = document.querySelector("#value");
const fromUnit = document.querySelector("#fromUnit");
const toUnit = document.querySelector("#toUnit");
const result = document.querySelector("#result");
const convertButton = document.querySelector("#convertButton");

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

function convert() {
    const fromValue = parseFloat(quantity.value);
    const fromUnitValue = fromUnit.value;
    const toUnitValue = toUnit.value;

    if (isNaN(fromValue)) {
        result.textContent = "Please enter a valid number.";
        return;
    }

    let convertedValue = fromValue * TO_M.get(fromUnitValue) / TO_M.get(toUnitValue);

    result.textContent = `Converted Value: ${convertedValue}`;
}

convertButton.addEventListener("click", convert);