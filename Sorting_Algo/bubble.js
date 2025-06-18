export async function bubbleSort(array, renderArray, sleep, getSpeed, shouldStop, incrementStep) {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (shouldStop()) return;
      renderArray([j, j + 1]);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        await sleep(getSpeed());
        incrementStep();
      }
    }
    renderArray([], [n - 1 - i]);
    await sleep(getSpeed());
  }
  renderArray([], [0]);
}