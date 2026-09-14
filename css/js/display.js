import { 
  calculateFinalGrade, 
  getAcademicStatus, 
  getPerformanceRemark, 
  calculateClassAverage, 
  countPassingStudents, 
  getTopStudent 
} from './gradeUtils.js';

// Display rendered student records
export function displayStudents(students) {
  const container = document.getElementById("studentList");
  container.innerHTML = "";

  if (!students || students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage(""); // Clear message if students exist

  students.forEach(student => {
    // Object destructuring
    const { id, name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);
    const statusClass = `status-${status.replace(/\s+/g, '-')}`;

    const card = document.createElement("article");
    card.className = "student-card";
    card.setAttribute("data-id", id);

    card.innerHTML = `
      <h3>${name}</h3>
      <div class="block">Block: ${block}</div>
      <div class="scores">
        <p><span>Quiz:</span> <strong>${quiz}</strong></p>
        <p><span>Lab:</span> <strong>${lab}</strong></p>
        <p><span>Exam:</span> <strong>${exam}</strong></p>
      </div>
      <div class="result-details">
        <p><strong>Final Grade:</strong> ${finalGrade.toFixed(2)}</p>
        <p><strong>Status:</strong> <span class="status-badge ${statusClass}">${status}</span></p>
        <p><strong>Remark:</strong> ${remark}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Update summary stats
export function displaySummary(students) {
  const classAvgEl = document.getElementById("classAverage");
  const passingCountEl = document.getElementById("passingCount");
  const displayedCountEl = document.getElementById("displayedCount");
  const topStudentEl = document.getElementById("topStudent");

  displayedCountEl.textContent = students.length;

  if (!students || students.length === 0) {
    classAvgEl.textContent = "0.00";
    passingCountEl.textContent = "0";
    topStudentEl.textContent = "N/A";
    return;
  }

  const avg = calculateClassAverage(students);
  const passing = countPassingStudents(students);
  const top = getTopStudent(students);

  classAvgEl.textContent = avg.toFixed(2);
  passingCountEl.textContent = passing;
  
  if (top) {
    const topGrade = calculateFinalGrade(top).toFixed(2);
    topStudentEl.textContent = `${top.name} (${topGrade})`;
  } else {
    topStudentEl.textContent = "N/A";
  }
}

// Display feedback message
export function displayMessage(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
}