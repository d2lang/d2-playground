import Editor from "./editor.js";

import QueryParams from "../lib/queryparams";

let layout = "dagre";

function init() {
  document.getElementById("layout-btn").addEventListener("click", toggleMenu);
  document.getElementById("layout-menu").addEventListener("mouseleave", hideMenu);

  for (const el of document.getElementsByClassName("layout-menu-item")) {
    el.addEventListener("click", changeLayout);
  }

  readQueryParam();
}

function readQueryParam() {
  const paramLayout = QueryParams.get("layout");
  if (!paramLayout) {
    return;
  }

  let valid = false;
  for (const el of document.getElementsByClassName("layout-menu-item")) {
    if (paramLayout.toLowerCase() === el.textContent.toLowerCase()) {
      valid = true;
      document.getElementById("current-layout").textContent = el.textContent;
      layout = el.textContent.toLowerCase();
    }
  }

  if (!valid) {
    QueryParams.del("layout");
  }
}

function changeLayout(e) {
  layout = e.target.textContent.toLowerCase();
  document.getElementById("current-layout").textContent = e.target.textContent;
  QueryParams.set("layout", layout);
  hideMenu();
  if (Editor.getDiagramSVG()) {
    Editor.compile();
  }
}

function toggleMenu() {
  const menu = document.getElementById("layout-menu");
  if (menu.style.display == "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

function hideMenu() {
  document.getElementById("layout-menu").style.display = "none";
}

function getLayout() {
  return layout;
}

export default {
  init,
  getLayout,
};
