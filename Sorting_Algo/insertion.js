export async function insertionSort(array, renderArray, sleep, getSpeed, shouldStop, incrementStep) {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      if (shouldStop()) return;
      renderArray([j, j + 1]);
      incrementStep();
      array[j + 1] = array[j];
      j--;
      await sleep(getSpeed());
    }
    array[j + 1] = key;
    renderArray([], Array.from({ length: i + 1 }, (_, k) => k));
    await sleep(getSpeed());
  }
}
