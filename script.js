class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const showEdgesCheckbox = document.getElementById("showEdges");
let root = null;

function drawTree(node, x, y, offsetX) {
  if (node) {
    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI);
    context.stroke();
    context.fillText(node.value, x - 5, y + 5);

    if (node.left) {
      context.beginPath();
      context.moveTo(x, y + 20);
      context.lineTo(x - offsetX, y + 60);
      context.stroke();
      drawTree(node.left, x - offsetX, y + 60, offsetX / 2);
    }
    if (node.right) {
      context.beginPath();
      context.moveTo(x, y + 20);
      context.lineTo(x + offsetX, y + 60);
      context.stroke();
      drawTree(node.right, x + offsetX, y + 60, offsetX / 2);
    }
  }
}

function insertNode() {
  const value = parseInt(document.getElementById("nodeValue").value);
  if (!isNaN(value)) {
    root = insert(root, value);
    redraw();
  }
}

function insert(node, value) {
  if (!node) {
    return new Node(value);
  }
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else {
    node.right = insert(node.right, value);
  }
  return node;
}

function clearTree() {
  root = null;
  redraw();
}

function redraw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (showEdgesCheckbox.checked) {
    drawTree(root, canvas.width / 2, 30, 100);
  }
}