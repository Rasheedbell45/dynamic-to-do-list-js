document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add task on button click
    addButton.onclick = function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
        } else {
            alert("Please enter a task.");
        }
    };

     addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
        } else {
            alert("Please enter a task.");
        }
         
    // Add task on Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
            } else {
                alert("Please enter a task.");
            }
        }
    });

    function addTask(taskText, save = true) {
        // Create <li> and set text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn'; // Not using classList.add

        // Assign click event to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append button and li to task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save to Local Storage
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false)); // false = don't re-save
    }

    function removeTaskFromStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
