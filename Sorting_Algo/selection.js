export async function selectionSort(array, renderArray, sleep, getSpeed, shouldStop, incrementStep) {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (shouldStop()) return;
      renderArray([minIndex, j]);
      incrementStep();
      if (array[j] < array[minIndex]) minIndex = j;
      await sleep(getSpeed());
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    renderArray([], [i]);
    await sleep(getSpeed());
  }
}