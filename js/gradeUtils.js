// Calculate weighted final grade (Quiz 25%, Lab 35%, Exam 40%)
export function calculateFinalGrade(student) {
  const { quiz, lab, exam } = student;
  return (quiz * 0.25) + (lab * 0.35) + (exam * 0.40);
}

// Academic Status classification
export function getAcademicStatus(grade) {
  if (grade >= 90) {
    return "Excellent";
  } else if (grade >= 75) {
    return "Passed";
  } else if (grade >= 70) {
    return "Needs Improvement";
  } else {
    return "Failed";
  }
}

// Performance Remark using switch(true)
export function getPerformanceRemark(grade) {
  switch (true) {
    case (grade >= 90):
      return "Outstanding";
    case (grade >= 85):
      return "Very Good";
    case (grade >= 80):
      return "Good";
    case (grade >= 75):
      return "Satisfactory";
    default:
      return "Unsatisfactory";
  }
}

// Case-insensitive search by student name
export function searchStudents(students, query) {
  const cleanQuery = query.trim().toLowerCase();
  return students.filter(student => student.name.toLowerCase().includes(cleanQuery));
}

// Filter students by Block
export function filterStudentsByBlock(students, block) {
  if (block === "All") return students;
  return students.filter(student => student.block === block);
}

// Filter students by Academic Status
export function filterStudentsByStatus(students, status) {
  if (status === "All") return students;
  return students.filter(student => {
    const finalGrade = calculateFinalGrade(student);
    return getAcademicStatus(finalGrade) === status;
  });
}

// Compute class average using reduce
export function calculateClassAverage(students) {
  if (!students || students.length === 0) return 0;
  const totalSum = students.reduce((acc, student) => acc + calculateFinalGrade(student), 0);
  return totalSum / students.length;
}

// Count students with passing grades (75+)
export function countPassingStudents(students) {
  return students.filter(student => calculateFinalGrade(student) >= 75).length;
}

// Identify top student with the highest final grade
export function getTopStudent(students) {
  if (!students || students.length === 0) return null;
  return students.reduce((highest, current) => {
    const currentGrade = calculateFinalGrade(current);
    const highestGrade = calculateFinalGrade(highest);
    return currentGrade > highestGrade ? current : highest;
  });
}