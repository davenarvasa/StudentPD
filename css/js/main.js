import { students } from './students.js';
import { 
  searchStudents, 
  filterStudentsByBlock, 
  filterStudentsByStatus 
} from './gradeUtils.js';
import { 
  displayStudents, 
  displaySummary, 
  displayMessage 
} from './display.js';

// DOM Element Selectors
const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

// Filter and render logic
function processAndDisplay() {
  const query = searchInput.value;
  const selectedBlock = blockFilter.value;
  const selectedStatus = statusFilter.value;

  let result = searchStudents(students, query);
  result = filterStudentsByBlock(result, selectedBlock);
  result = filterStudentsByStatus(result, selectedStatus);

  displayStudents(result);
  displaySummary(result);
}

// Reset logic
function handleReset() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";
  displayMessage("");

  displayStudents(students);
  displaySummary(students);
}

// Event Listeners Registration
document.addEventListener("DOMContentLoaded", () => {
  // Initial load
  displayStudents(students);
  displaySummary(students);

  // Button actions
  applyBtn.addEventListener("click", processAndDisplay);
  resetBtn.addEventListener("click", handleReset);

  // Real-time input listening
  searchInput.addEventListener("input", processAndDisplay);
  blockFilter.addEventListener("change", processAndDisplay);
  statusFilter.addEventListener("change", processAndDisplay);
});