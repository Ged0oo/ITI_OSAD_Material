function findMinMax(...numbers) {
    let max = Math.max(...numbers);
    let min = Math.min(...numbers);
    return [min, max];
}

const [minVal, maxVal] = findMinMax(15, 80, 5, 42, 100, 2);

document.getElementById("min-value").innerText = `Minimum Value: + ${minVal}`;
document.getElementById("max-value").innerText = `Maximum Value: + ${maxVal}`;
