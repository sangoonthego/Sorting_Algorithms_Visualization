export async function shellSort(array, renderArray, sleep, getSpeed, shouldStop, incrementStep) {
  let n = array.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = array[i];
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
        renderArray([j, j - gap]);
        incrementStep();
        await sleep(getSpeed());
      }
      array[j] = temp;
    }
  }
  renderArray([], Array.from({ length: n }, (_, i) => i));
}