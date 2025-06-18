export async function countingSort(array, renderArray, sleep, getSpeed, shouldStop, incrementStep) {
  const max = Math.max(...array);
  const count = new Array(max + 1).fill(0);
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
    incrementStep();
    renderArray([i]);
    await sleep(getSpeed());
  }

  let index = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i]-- > 0) {
      array[index++] = i;
      renderArray([index - 1]);
      incrementStep();
      await sleep(getSpeed());
    }
  }
  renderArray([], Array.from({ length: array.length }, (_, i) => i));
}