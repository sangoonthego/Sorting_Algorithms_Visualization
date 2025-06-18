export async function radixSort(array, renderArray, sleep, getSpeed, shouldStop, incrementStep) {
  const max = Math.max(...array);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    let output = Array(array.length).fill(0);
    let count = Array(10).fill(0);

    for (let i = 0; i < array.length; i++) {
      count[Math.floor(array[i] / exp) % 10]++;
    }
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    for (let i = array.length - 1; i >= 0; i--) {
      let idx = Math.floor(array[i] / exp) % 10;
      output[--count[idx]] = array[i];
      incrementStep();
    }
    for (let i = 0; i < array.length; i++) {
      array[i] = output[i];
      renderArray([i]);
      await sleep(getSpeed());
    }
    exp *= 10;
  }
  renderArray([], Array.from({ length: array.length }, (_, i) => i));
}