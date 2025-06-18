import { bubbleSort } from './Sorting_Algo/bubble.js';
import { selectionSort } from './Sorting_Algo/selection.js';
import { insertionSort } from './Sorting_Algo/insertion.js';
import { quickSort } from './Sorting_Algo/quick.js';
import { mergeSort } from './Sorting_Algo/merge.js';
import { heapSort } from './Sorting_Algo/heap.js';
import { shellSort } from './Sorting_Algo/shell.js';
import { radixSort } from './Sorting_Algo/radix.js';
import { countingSort } from './Sorting_Algo/counting.js'; 

let array = [];
let stepCount = 0;
let isSorting = false;
let shouldStop = false;

function generateArray(size = 30) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderArray();
}

function renderArray(highlight = [], sorted = []) {
  const container = document.getElementById('array');
  container.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    if (highlight.includes(i)) bar.classList.add('highlight');
    if (sorted.includes(i)) bar.classList.add('sorted');
    bar.style.height = `${array[i] * 3}px`;
    bar.textContent = array[i];
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getSpeed() {
  return document.getElementById('speed').value;
}

function stopSorting() {
  shouldStop = true;
}

function resetStop() {
  shouldStop = false;
}

function resetMetrics() {
  stepCount = 0;
  document.getElementById("steps").textContent = `Steps: 0`;
  document.getElementById("time").textContent = `Time: 0 ms`;
}

function incrementStep() {
  stepCount++;
  document.getElementById("steps").textContent = `Steps: ${stepCount}`;
}

async function startSorting() {
  if (isSorting) return;
  isSorting = true;
  resetStop();
  resetMetrics(); 

  const algo = document.getElementById('algorithm').value;
  const commonArgs = [array, renderArray, sleep, getSpeed, () => shouldStop, incrementStep];

  const startTime = performance.now(); 

  if (algo === 'bubble') await bubbleSort(...commonArgs);
  else if (algo === 'selection') await selectionSort(...commonArgs);
  else if (algo === 'insertion') await insertionSort(...commonArgs);
  else if (algo === 'quick') await quickSort(...commonArgs);
  else if (algo === 'merge') await mergeSort(...commonArgs);
  else if (algo === 'heap') await heapSort(...commonArgs);
  else if (algo === 'shell') await shellSort(...commonArgs);
  else if (algo === 'radix') await radixSort(...commonArgs);
  else if (algo === 'counting') await countingSort(...commonArgs);

  const endTime = performance.now(); 
  const duration = Math.round(endTime - startTime);
  document.getElementById("time").textContent = `Time: ${duration} ms`;

  isSorting = false;
}

window.addEventListener("DOMContentLoaded", () => {
  generateArray();

  window.generateArray = generateArray;
  window.startSorting = startSorting;
  window.stopSorting = stopSorting;
});

