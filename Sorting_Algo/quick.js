export async function quickSort(array, renderArray, sleep, getSpeed, shouldStop, start = 0, end = array.length - 1, sorted = [], incrementStep) {
  if (start >= end || shouldStop()) return;
  let pivotIndex = await partition(array, renderArray, sleep, getSpeed, shouldStop, start, end);
  sorted.push(pivotIndex);
  renderArray([], sorted);
  await quickSort(array, renderArray, sleep, getSpeed, shouldStop, start, pivotIndex - 1, sorted);
  await quickSort(array, renderArray, sleep, getSpeed, shouldStop, pivotIndex + 1, end, sorted);
}

async function partition(array, renderArray, sleep, getSpeed, shouldStop, start, end) {
  let pivot = array[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (shouldStop()) return;
    renderArray([i, pivotIndex]);
    incrementStep();
    if (array[i] < pivot) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      pivotIndex++;
      await sleep(getSpeed());
    }
  }
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  return pivotIndex;
}