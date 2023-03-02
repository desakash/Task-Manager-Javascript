const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskListUl = document.getElementById("task-list");
const completedTaskListUl = document.getElementById("completed-task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on page load
displayTasks();

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to task list
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = taskInput.value.trim();

  if (taskName !== "") {
    const newTask = { name: taskName, completed: false };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskInput.value = "";
  }
});

// Display tasks in task list and completed task list
function displayTasks() {
  // Clear the task list
  taskListUl.innerHTML = "";
  completedTaskListUl.innerHTML = "";

  // Loop through tasks and add them to the task list
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="task-${index}" ${
      task.completed ? "checked" : ""
    } />
      <label for="task-${index}" class="task-name">${task.name}</label>
      <button class="delete-task-btn">Delete</button>
    `;

    if (task.completed) {
      completedTaskListUl.appendChild(li);
    } else {
      taskListUl.appendChild(li);
    }

    const checkbox = li.querySelector(`#task-${index}`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      displayTasks();
    });

    const deleteTaskBtn = li.querySelector(".delete-task-btn");
    deleteTaskBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    });
  });
}
