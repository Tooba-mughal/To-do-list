document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskContent) {
        if (taskContent.trim() === '') return;

        const taskId = Date.now();
        const task = {
            id: taskId,
            content: taskContent,
        };

        saveTaskToLocalStorage(task);
        renderTask(task);
    }

    function saveTaskToLocalStorage(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => renderTask(task));
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.content}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    window.editTask = (taskId) => {
        const tasks = getTasksFromLocalStorage();
        const task = tasks.find(task => task.id === taskId);
        const newContent = prompt('Edit task:', task.content);

        if (newContent === null || newContent.trim() === '') return;

        task.content = newContent;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        document.getElementById('task-list').innerHTML = '';
        loadTasks();
    };

    window.deleteTask = (taskId) => {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        document.getElementById('task-list').innerHTML = '';
        loadTasks();
    };
});
