const courses = [
  { subject: "CSE", number: 110, title: "Intro to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 121, title: "JavaScript Language", credits: 2, completed: false },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const creditDisplay = document.querySelector("#total-credits");
const buttons = document.querySelectorAll("button");

function displayCourses(courseArray) {
  courseList.innerHTML = "";

  courseArray.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");

    if (course.completed) {
      div.classList.add("completed");
    }

    div.innerHTML = `
      <strong>${course.subject} ${course.number}</strong><br>
      ${course.title}<br>
      Credits: ${course.credits}
    `;

    courseList.appendChild(div);
  });

  const totalCredits = courseArray.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  creditDisplay.textContent = totalCredits;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const subject = button.dataset.subject;

    if (subject === "all") {
      displayCourses(courses);
    } else {
      const filtered = courses.filter(course => course.subject === subject);
      displayCourses(filtered);
    }
  });
});

// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Initial load
displayCourses(courses);
