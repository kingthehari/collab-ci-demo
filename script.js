const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    // Toggle completed on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent toggling complete when deleting
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
});

function addTaskToDOM(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) li.classList.add('completed');

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save current tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Modified addTask function to use addTaskToDOM and save tasks
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    addTaskToDOM(taskText);
    saveTasks();

    taskInput.value = '';
    taskInput.focus();
}