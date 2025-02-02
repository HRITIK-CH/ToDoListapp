const API_URL = "http://localhost:8080/api/todo";

// Fetch and display tasks
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `list-group-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
            <span onclick="toggleTask(${task.id}, ${task.completed})">${task.title}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})"><center>❌</center></button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
async function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskInput.value, completed: false })
    });

    taskInput.value = "";
    fetchTasks();
}

// Toggle task completion
async function toggleTask(id, completed) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
    });

    fetchTasks();
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Add an event listener to the input to allow Enter key submission
document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Fetch tasks when the document is ready
document.addEventListener("DOMContentLoaded", fetchTasks);
