document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from Local Storage on page load
    loadTasks();

    // Handle "Add Task" button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert("Please enter a task.");
        }
    });

    // Handle "Enter" key press to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            } else {
                alert("Please enter a task.");
            }
        }
    });

    /**
     * Adds a task to the DOM and optionally saves it to Local Storage
     * @param {string} taskText - The text of the task
     * @param {boolean} save - Whether to save the task to Local Storage (default: true)
     */
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Handle task removal
        removeButton.addEventListener('click', function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    /**
     * Loads all tasks from Local Storage and adds them to the DOM
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false)); // 'false' prevents double-saving
    }

    /**
     * Removes a task from Local Storage
     * @param {string} taskText - The text of the task to remove
     */
    function removeTaskFromStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
