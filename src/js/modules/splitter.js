import LocalStorage from "../lib/localstorage.js";

const STORAGE_KEY = "editorSplitPercent";
const DEFAULT_SPLIT = 50;

function init() {
  const workstation = document.getElementById("workstation");
  const divider = document.getElementById("workstation-divider");
  const editor = document.getElementById("editor");
  const preview = document.getElementById("render");
  const stacked = window.matchMedia("(max-width: 1023px)");
  let share;
  let drag;

  function setSplit(value) {
    share = Math.min(100, Math.max(0, value));
    workstation.style.setProperty("--editor-share", share);
    editor.hidden = share === 0;
    preview.hidden = share === 100;
    divider.setAttribute("aria-valuenow", Math.round(share));
  }

  function saveSplit() {
    LocalStorage.set(STORAGE_KEY, share);
  }

  const stored = LocalStorage.get(STORAGE_KEY);
  const saved = Number(stored);
  setSplit(stored?.trim() && saved >= 0 && saved <= 100 ? saved : DEFAULT_SPLIT);

  function updateOrientation() {
    divider.setAttribute("aria-orientation", stacked.matches ? "horizontal" : "vertical");
  }
  updateOrientation();
  stacked.addEventListener("change", updateOrientation);

  divider.addEventListener("pointerdown", (event) => {
    if (drag || !event.isPrimary || event.button !== 0) return;
    const axis = stacked.matches ? "pageY" : "pageX";
    const space = stacked.matches
      ? workstation.clientHeight - divider.offsetHeight
      : workstation.clientWidth - divider.offsetWidth;
    drag = { pointerId: event.pointerId, axis, start: event[axis], space, share };
    divider.setPointerCapture(event.pointerId);
  });

  divider.addEventListener("pointermove", (event) => {
    if (event.pointerId !== drag?.pointerId) return;
    const delta = event[drag.axis] - drag.start;
    setSplit(drag.share + (100 * delta) / drag.space);
  });

  divider.addEventListener("lostpointercapture", (event) => {
    if (event.pointerId !== drag?.pointerId) return;
    drag = null;
    saveSplit();
  });

  divider.addEventListener("dblclick", () => {
    setSplit(DEFAULT_SPLIT);
    saveSplit();
  });

  divider.addEventListener("keydown", (event) => {
    switch (event.key) {
      case stacked.matches ? "ArrowUp" : "ArrowLeft":
        setSplit(share - 5);
        break;
      case stacked.matches ? "ArrowDown" : "ArrowRight":
        setSplit(share + 5);
        break;
      case "Home":
        setSplit(0);
        break;
      case "End":
        setSplit(100);
        break;
      case "Enter":
        setSplit(DEFAULT_SPLIT);
        break;
      default:
        return;
    }
    event.preventDefault();
    saveSplit();
  });
}

export default { init };
