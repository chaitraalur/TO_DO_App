document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load tasks from local storage
    tasks.forEach(task => createTaskElement(task));

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const task = {
            text: taskText,
            completed: false,
            priority: false
        };

        tasks.push(task);
        saveTasks();
        createTaskElement(task);
        taskInput.value = '';
    });

    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
        taskItem.classList.toggle('priority', task.priority);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.addEventListener('click', () => {
            task.completed = !task.completed;
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit task', task.text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                task.text = newTaskText.trim();
                taskText.textContent = task.text;
                saveTasks();
            }
        });

        const priorityButton = document.createElement('button');
        priorityButton.textContent = 'Priority';
        priorityButton.classList.add('priority-button');
        priorityButton.addEventListener('click', () => {
            task.priority = !task.priority;
            taskItem.classList.toggle('priority');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(priorityButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});


