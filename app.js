// Chart.js for Life Factors Ranking
const ctx = document.getElementById("lifeChart").getContext("2d");
const lifeChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [
      "Romantic",
      "Wealth",
      "Health",
      "Career",
      "Family/Friends",
      "Spiritual",
    ],
    datasets: [
      {
        label: "Life Factors",
        data: [2, 4, 5, 10, 1, 3], // Initial data
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  },
});

// Update chart when user inputs data
document.querySelectorAll("#factors input").forEach((input) => {
  input.addEventListener("input", () => {
    const data = Array.from(document.querySelectorAll("#factors input")).map(
      (input) => +input.value || 0
    );
    lifeChart.data.datasets[0].data = data;
    lifeChart.update();
  });
});

// Microtasks (Todo List)
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    // Create a new list item
    const li = document.createElement("li");

    // Add the task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.classList.add("taskContent"); // Add class for styling

    // Add a checkbox for completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("taskCheckbox"); // Add class for styling
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        taskSpan.classList.add("completed"); // Add strikethrough
      } else {
        taskSpan.classList.remove("completed"); // Remove strikethrough
      }
    });

    // Add a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeButton");
    removeButton.addEventListener("click", function () {
      li.remove(); // Remove the task when the button is clicked
    });

    // Group checkbox and remove button in a div
    const taskActions = document.createElement("div");
    taskActions.classList.add("taskActions");
    taskActions.appendChild(checkbox);
    taskActions.appendChild(removeButton);

    // Append elements to the list item
    li.appendChild(taskSpan); // Task text on the left
    li.appendChild(taskActions); // Checkbox + remove button on the right

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
  }
}

// Add task when the "Add Task" button is clicked
addTaskButton.addEventListener("click", addTask);

// Add task when the Enter key is pressed
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
// Save data to localStorage (optional)
function saveData() {
  const data = {
    lifeVision: document.getElementById("lifeVisionText").value,
    avoidanceVision: document.getElementById("avoidanceVisionText").value,
    // Add other fields here
  };
  localStorage.setItem("lifeAppData", JSON.stringify(data));
}

// Load data from localStorage (optional)
function loadData() {
  const data = JSON.parse(localStorage.getItem("lifeAppData"));
  if (data) {
    document.getElementById("lifeVisionText").value = data.lifeVision;
    document.getElementById("avoidanceVisionText").value = data.avoidanceVision;
    // Load other fields here
  }
}

window.addEventListener("load", loadData);
window.addEventListener("beforeunload", saveData);

// Generate Document
const generateDocumentButton = document.getElementById("generateDocument");
const documentPreview = document.getElementById("documentPreview");
const documentContent = document.getElementById("documentContent");
const downloadPDFButton = document.getElementById("downloadPDF");

generateDocumentButton.addEventListener("click", () => {
  // Collect all form data
  const lifeVision = document.getElementById("lifeVisionText").value;
  const avoidanceVision = document.getElementById("avoidanceVisionText").value;
  const openness = document.getElementById("openness").value;
  const romantic = document.getElementById("romantic").value;
  const wealth = document.getElementById("wealth").value;
  const health = document.getElementById("health").value;
  const career = document.getElementById("career").value;
  const family = document.getElementById("family").value;
  const spiritual = document.getElementById("spiritual").value;

  // Extract task text (excluding the "Remove" button)
  const tasks = Array.from(document.querySelectorAll("#taskList li")).map(
    (li) => {
      return li.querySelector(".taskContent").textContent; // Only get the task text
    }
  );

  // Create the document content
  const content = `
    <h3>1. Life Vision</h3>
    <p>${lifeVision}</p>
    <h3>2. Avoidance Vision</h3>
    <p>${avoidanceVision}</p>
    <h3>3. Personality Traits</h3>
    <p>Openness: ${openness}</p>
    <h3>4. Life Factors</h3>
    <ul>
      <li>Romantic Relationship: ${romantic}</li>
      <li>Wealth/Money: ${wealth}</li>
      <li>Health: ${health}</li>
      <li>Career: ${career}</li>
      <li>Family/Friends: ${family}</li>
      <li>Spiritual/Personal Relationship: ${spiritual}</li>
    </ul>
    <h3>6. Microtasks</h3>
    <ul>
      ${tasks.map((task) => `<li>${task}</li>`).join("")}
    </ul>
  `;

  // Display the document content
  documentContent.innerHTML = content;
  documentPreview.style.display = "block";
});

// Download as PDF
downloadPDFButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add content to PDF
  doc.setFontSize(18);
  doc.text("Your Life Improvement Plan", 10, 10);
  doc.setFontSize(12);

  // Extract text content from the document preview
  const content = documentContent.innerText;

  // Split content into lines and add to PDF
  const lines = doc.splitTextToSize(content, 180); // Wrap text to fit page width
  doc.text(lines, 10, 20);

  // Save the PDF
  doc.save("Life_Improvement_Plan.pdf");
});
