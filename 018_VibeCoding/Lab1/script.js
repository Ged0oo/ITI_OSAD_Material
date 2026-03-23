/* ═══════════════════════════════════════════════════════════════
   Sorting Algorithm Visualizer — script.js
   ═══════════════════════════════════════════════════════════════ */

/* ─── State ──────────────────────────────────────────────────── */
const state = {
  array: [],          // current numeric values
  isRunning: false,   // a sort is actively animating
  isPaused: false,    // animation paused
  stopRequested: false // user hit Reset mid-sort
};

/* ─── DOM References ─────────────────────────────────────────── */
const visualization = document.getElementById('visualization');
const speedSlider   = document.getElementById('speed');
const algorithmSel  = document.getElementById('algorithm');
const btnGenerate   = document.getElementById('btn-generate');
const btnStart      = document.getElementById('btn-start');
const btnPause      = document.getElementById('btn-pause');
const btnReset      = document.getElementById('btn-reset');

/* ─── Speed ──────────────────────────────────────────────────── */
// slider 1-100 → delay 500ms-3ms (exponential feel)
function getDelay() {
  const val = Number(speedSlider.value);           // 1 … 100
  const maxDelay = 500;
  const minDelay = 3;
  const t = (val - 1) / 99;                       // 0 … 1
  return Math.round(maxDelay * Math.pow(minDelay / maxDelay, t));
}

// Update the CSS custom property used for the slider gradient fill
function updateSliderFill() {
  speedSlider.style.setProperty('--val', speedSlider.value);
}

speedSlider.addEventListener('input', updateSliderFill);
updateSliderFill();

/* ─── Async Helpers ──────────────────────────────────────────── */
function sleep() {
  return new Promise(resolve => setTimeout(resolve, getDelay()));
}

// Suspends execution while isPaused is true
function waitIfPaused() {
  return new Promise(resolve => {
    function check() {
      if (!state.isPaused) {
        resolve();
      } else {
        setTimeout(check, 60);
      }
    }
    check();
  });
}

// Combines pause-wait + delay; returns true if a stop was requested
async function tick() {
  await waitIfPaused();
  if (state.stopRequested) return true; // signal: abort
  await sleep();
  return false;
}

/* ─── Array Generation ───────────────────────────────────────── */
function generateArray(size = 70) {
  state.array = [];
  for (let i = 0; i < size; i++) {
    state.array.push(Math.floor(Math.random() * 291) + 10); // 10-300
  }
  renderBars();
}

/* ─── Rendering ──────────────────────────────────────────────── */
function renderBars() {
  visualization.innerHTML = '';
  state.array.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = value + 'px';
    bar.dataset.index = index;
    visualization.appendChild(bar);
  });
}

function getBar(index) {
  return visualization.children[index];
}

// Removes all state classes, then optionally applies one
function setColor(index, colorClass) {
  const bar = getBar(index);
  if (!bar) return;
  bar.classList.remove('comparing', 'swapping', 'sorted');
  if (colorClass) bar.classList.add(colorClass);
}

function clearColor(index) {
  setColor(index, null);
}

function markSorted(index) {
  const bar = getBar(index);
  if (!bar) return;
  bar.classList.remove('comparing', 'swapping');
  bar.classList.add('sorted');
}

function markAllSorted() {
  for (let i = 0; i < state.array.length; i++) {
    markSorted(i);
  }
}

/* ─── Swap ───────────────────────────────────────────────────── */
// Swaps both the DOM bar heights and the underlying array values
async function swapBars(i, j) {
  setColor(i, 'swapping');
  setColor(j, 'swapping');

  // swap array values
  [state.array[i], state.array[j]] = [state.array[j], state.array[i]];

  // swap DOM heights
  const barI = getBar(i);
  const barJ = getBar(j);
  const tempHeight = barI.style.height;
  barI.style.height = barJ.style.height;
  barJ.style.height = tempHeight;
}

/* ─── Control Helpers ────────────────────────────────────────── */
function setControlsDisabled(disabled) {
  btnGenerate.disabled  = disabled;
  algorithmSel.disabled = disabled;
  btnStart.disabled     = disabled;
  btnPause.disabled     = !disabled; // pause only active while running
}

function resetUIState() {
  setControlsDisabled(false);
  btnPause.textContent = 'Pause';
  state.isRunning  = false;
  state.isPaused   = false;
  state.stopRequested = false;
}

/* ═══════════════════════════════════════════════════════════════
   SORTING ALGORITHMS
   Each function is async, operates on state.array, and uses
   tick() / swapBars() / setColor() / markSorted() for animation.
   Returns true if stopped early (Reset), false on completion.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Bubble Sort ────────────────────────────────────────────── */
async function bubbleSort() {
  const n = state.array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      setColor(j, 'comparing');
      setColor(j + 1, 'comparing');

      const stopped = await tick();
      if (stopped) return true;

      if (state.array[j] > state.array[j + 1]) {
        await swapBars(j, j + 1);
        const stopped2 = await tick();
        if (stopped2) return true;
      }

      clearColor(j);
      clearColor(j + 1);
    }
    markSorted(n - 1 - i);
  }
  markSorted(0);
  return false;
}

/* ─── Selection Sort ─────────────────────────────────────────── */
async function selectionSort() {
  const n = state.array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    setColor(i, 'comparing');

    for (let j = i + 1; j < n; j++) {
      setColor(j, 'comparing');
      const stopped = await tick();
      if (stopped) return true;

      if (state.array[j] < state.array[minIdx]) {
        if (minIdx !== i) clearColor(minIdx);
        minIdx = j;
        // keep minIdx highlighted
      } else {
        clearColor(j);
      }
    }

    if (minIdx !== i) {
      await swapBars(i, minIdx);
      const stopped = await tick();
      if (stopped) return true;
    }

    markSorted(i);
    clearColor(minIdx);
  }
  markSorted(n - 1);
  return false;
}

/* ─── Insertion Sort ─────────────────────────────────────────── */
async function insertionSort() {
  const n = state.array.length;
  markSorted(0);

  for (let i = 1; i < n; i++) {
    let j = i;
    setColor(j, 'comparing');

    while (j > 0 && state.array[j - 1] > state.array[j]) {
      setColor(j - 1, 'comparing');

      const stopped = await tick();
      if (stopped) return true;

      await swapBars(j - 1, j);

      clearColor(j);       // the bar that moved right is now in sorted region
      markSorted(j);

      j--;
      setColor(j, 'comparing');
    }

    markSorted(j);

    const stopped = await tick();
    if (stopped) return true;
  }
  return false;
}

/* ─── Merge Sort ─────────────────────────────────────────────── */
// Writes a sub-range of values back to bar heights after merging
function updateBarsRange(start, end) {
  for (let i = start; i <= end; i++) {
    const bar = getBar(i);
    if (bar) bar.style.height = state.array[i] + 'px';
  }
}

async function merge(left, mid, right) {
  const leftArr  = state.array.slice(left, mid + 1);
  const rightArr = state.array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    setColor(k, 'comparing');
    const stopped = await tick();
    if (stopped) return true;

    if (leftArr[i] <= rightArr[j]) {
      state.array[k] = leftArr[i];
      i++;
    } else {
      state.array[k] = rightArr[j];
      j++;
    }

    setColor(k, 'swapping');
    getBar(k).style.height = state.array[k] + 'px';
    k++;
  }

  // Copy remaining elements
  while (i < leftArr.length) {
    state.array[k] = leftArr[i];
    setColor(k, 'swapping');
    getBar(k).style.height = state.array[k] + 'px';
    i++;
    k++;
    const stopped = await tick();
    if (stopped) return true;
  }

  while (j < rightArr.length) {
    state.array[k] = rightArr[j];
    setColor(k, 'swapping');
    getBar(k).style.height = state.array[k] + 'px';
    j++;
    k++;
    const stopped = await tick();
    if (stopped) return true;
  }

  // Mark the merged range as sorted (visually)
  for (let x = left; x <= right; x++) {
    markSorted(x);
  }

  return false;
}

async function mergeSortRecursive(left, right) {
  if (left >= right) {
    markSorted(left);
    return false;
  }

  const mid = Math.floor((left + right) / 2);

  let stopped = await mergeSortRecursive(left, mid);
  if (stopped) return true;

  stopped = await mergeSortRecursive(mid + 1, right);
  if (stopped) return true;

  stopped = await merge(left, mid, right);
  return stopped;
}

async function mergeSort() {
  return mergeSortRecursive(0, state.array.length - 1);
}

/* ─── Quick Sort ─────────────────────────────────────────────── */
async function partition(low, high) {
  const pivotValue = state.array[high];
  setColor(high, 'comparing'); // pivot highlighted

  let i = low - 1;

  for (let j = low; j < high; j++) {
    setColor(j, 'comparing');
    const stopped = await tick();
    if (stopped) return { pivotIdx: -1, stopped: true };

    if (state.array[j] <= pivotValue) {
      i++;
      await swapBars(i, j);
      const stopped2 = await tick();
      if (stopped2) return { pivotIdx: -1, stopped: true };
      clearColor(i);
    }
    clearColor(j);
  }

  // Place pivot in correct position
  const pivotIdx = i + 1;
  await swapBars(pivotIdx, high);
  const stopped3 = await tick();
  if (stopped3) return { pivotIdx: -1, stopped: true };

  clearColor(high);
  markSorted(pivotIdx);

  return { pivotIdx, stopped: false };
}

async function quickSortRecursive(low, high) {
  if (low >= high) {
    if (low === high) markSorted(low);
    return false;
  }

  const { pivotIdx, stopped } = await partition(low, high);
  if (stopped) return true;

  let s = await quickSortRecursive(low, pivotIdx - 1);
  if (s) return true;

  s = await quickSortRecursive(pivotIdx + 1, high);
  return s;
}

async function quickSort() {
  return quickSortRecursive(0, state.array.length - 1);
}

/* ═══════════════════════════════════════════════════════════════
   ALGORITHM REGISTRY
   To add a new algorithm: add an entry here — no other changes
   needed.
   ═══════════════════════════════════════════════════════════════ */
const algorithms = {
  bubble:    bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge:     mergeSort,
  quick:     quickSort
};

/* ─── Event: Generate ────────────────────────────────────────── */
btnGenerate.addEventListener('click', () => {
  if (state.isRunning) return;
  generateArray();
});

/* ─── Event: Start ───────────────────────────────────────────── */
btnStart.addEventListener('click', async () => {
  if (state.isRunning) return;

  const selectedKey  = algorithmSel.value;
  const sortFunction = algorithms[selectedKey];
  if (!sortFunction) return;

  state.isRunning     = true;
  state.isPaused      = false;
  state.stopRequested = false;

  setControlsDisabled(true);

  const stopped = await sortFunction();

  if (!stopped) {
    // Ensure every bar is green on natural completion
    markAllSorted();
  }

  resetUIState();
});

/* ─── Event: Pause / Resume ──────────────────────────────────── */
btnPause.addEventListener('click', () => {
  if (!state.isRunning) return;
  state.isPaused = !state.isPaused;
  btnPause.textContent = state.isPaused ? 'Resume' : 'Pause';
});

/* ─── Event: Reset ───────────────────────────────────────────── */
btnReset.addEventListener('click', () => {
  if (state.isRunning) {
    // Signal the running sort to abort, then wait one event-loop
    // tick before regenerating so any pending tick() sees the flag.
    state.stopRequested = true;
    state.isPaused      = false; // unblock waitIfPaused if paused
    setTimeout(() => {
      generateArray();
      resetUIState();
    }, 80);
  } else {
    generateArray();
    resetUIState();
  }
});

/* ─── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  generateArray();
});
