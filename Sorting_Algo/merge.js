export async function mergeSort(array, renderArray, sleep, getSpeed, shouldStop, start = 0, end = array.length - 1, incrementStep) {
  if (start >= end || shouldStop()) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(array, renderArray, sleep, getSpeed, shouldStop, start, mid);
  await mergeSort(array, renderArray, sleep, getSpeed, shouldStop, mid + 1, end);
  await merge(array, renderArray, sleep, getSpeed, shouldStop, start, mid, end);
  renderArray([], Array.from({ length: end - start + 1 }, (_, i) => i + start));
  await sleep(getSpeed());
}

async function merge(array, renderArray, sleep, getSpeed, shouldStop, start, mid, end) {
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;
  while (i < left.length && j < right.length) {
    if (shouldStop()) return;
    renderArray([k]);
    incrementStep();
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
    await sleep(getSpeed());
  }
  while (i < left.length) {
    array[k++] = left[i++];
    await sleep(getSpeed());
  }
  while (j < right.length) {
    array[k++] = right[j++];
    await sleep(getSpeed());
  }
}