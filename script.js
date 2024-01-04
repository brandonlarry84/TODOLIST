document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-to-do-form');
    const taskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('tasks');

    // Load tasks from local storage on page load
    loadTasks();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskTextElement = document.createElement('input');
        taskTextElement.type = 'text';
        taskTextElement.classList.add('text');
        taskTextElement.value = taskText;
        taskTextElement.setAttribute('readonly', 'true');

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', function () {
            taskDiv.classList.toggle('completed');
            saveTasks(); // Save tasks to local storage after marking as complete
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            taskTextElement.removeAttribute('readonly');
            taskTextElement.focus();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            taskDiv.classList.add('deleted');
            setTimeout(function () {
                taskDiv.remove();
                saveTasks(); 
            }, 500); 
        });

        actionsDiv.appendChild(completeButton);
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);

        taskDiv.appendChild(taskTextElement);
        taskDiv.appendChild(actionsDiv);

        taskList.appendChild(taskDiv);

        saveTasks(); 
    }

    function saveTasks() {
        const tasks = [];
        const taskElements = document.querySelectorAll('.task');

        taskElements.forEach(function (taskElement) {
            const taskText = taskElement.querySelector('.text').value;
            const isCompleted = taskElement.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');

        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);

            tasks.forEach(function (task) {
                addTask(task.text);
                const lastTask = taskList.lastElementChild;
                if (task.completed) {
                    lastTask.classList.add('completed');
                }
            });
        }
    }
});