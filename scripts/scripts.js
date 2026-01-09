// Courses data
const courses = [
  { subject: "CSE", number: 110, title: "Intro to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 121, title: "JavaScript Language", credits: 2, completed: false },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const creditDisplay = document.querySelector("#total-credits");
const buttons = document.querySelectorAll(".filters button");
const navLinks = document.querySelectorAll(".nav a");

// Display courses dynamically
function displayCourses(courseArray) {
  courseList.innerHTML = "";
  courseArray.forEach(course => {
    const card = document.createElement("article");
    card.classList.add("course");
    if(course.completed) card.classList.add("completed");
    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
      <p class="status">${course.completed ? "✔ Completed" : "⏳ In Progress"}</p>
    `;
    courseList.appendChild(card);
  });
  calculateCredits(courseArray);
}

// Calculate completed credits
function calculateCredits(courseArray) {
  const total = courseArray.filter(c => c.completed).reduce((sum, c) => sum + c.credits, 0);
  creditDisplay.textContent = total;
}

// Filter buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const subject = button.dataset.subject;
    const filtered = subject === "all" ? courses : courses.filter(c => c.subject === subject);
    displayCourses(filtered);
  });
});

// Hamburger toggle
document.querySelector("#menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("open");
});

// Navigation
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const pageId = link.dataset.page;
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(pageId).style.display = "block";
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Footer
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Initial display
displayCourses(courses);