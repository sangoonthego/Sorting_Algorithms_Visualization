export async function heapSort(array, renderArray, sleep, getSpeed, shouldStop, incrementStep) {
  let n = array.length;

  async function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && array[l] > array[largest]) largest = l;
    if (r < n && array[r] > array[largest]) largest = r;

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      renderArray([i, largest]);
      incrementStep();
      await sleep(getSpeed());
      await heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    renderArray([], [i]);
    await sleep(getSpeed());
    await heapify(i, 0);
  }
  renderArray([], [0]);
}