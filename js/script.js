//Global list to store tasks
let tasks= [];

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const duedateInput = document.getElementById('task-duedate-input');

    if (taskInput.value.trim() === ''|| duedateInput.value.trim() === '') {
        alert('Please enter a task and a due date.');
        return;
    }else{
        // Create a new task object
        const newTask = {
            id: Date.now(),
            task: taskInput.value.trim(),
            dueDate: duedateInput.value.trim(),
            completed: false // Default to not completed
        };

        // Add the new task to the global task list
        tasks.push(newTask);

        // Clear the input fields
        taskInput.value = '';
        duedateInput.value = '';

        // Update the task list display
        displayTasks();
        
    }
    
}

function displayTasks() {
    const taskList = document.getElementById('task-list-gue');
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach(element => {
        /* const taskItem = document.createElement('div'); */
        const taskItem = `
        <div class="task-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px; margin-bottom: 6px; background: #f9f9f9; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div>
            <span style="font-weight: 500;">${element.task}</span>
            <span style="color: #888; margin-left: 10px; font-size: 0.95em;">(Due: ${element.dueDate})</span>
            </div>
            <button class="complete-button" style="background: #4dff8bff; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;" onclick="toggleTaskCompletion(${element.id})">${element.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-button" style="background: #ff4d4f; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;" onclick="deleteTask('${element.task}')">Delete</button>
        </div>
        `;
   
        taskList.innerHTML += taskItem;
    });
}

function deleteAllTasks() {
    tasks = []; // Clear the global task list
    displayTasks(); // Update the display
}

function deleteTask(id){
    const taskIndex =tasks.findIndex(task => task.task === id);
    if (taskIndex !==-1){
        tasks.splice(taskIndex,1);
        displayTasks();
    }
}

function toggleTaskCompletion(id){
    const task=tasks.find(task =>task.id===id);
    if(task){
        task.completed=!task.completed;
        
        displayTasks();
    }
}

    function showCompleted() {
        const completedTasks = tasks.filter(task => task.completed);
        displayFilteredTasks(completedTasks);
    }

    function showIncomplete() {
        const incompleteTasks = tasks.filter(task => !task.completed);
        displayFilteredTasks(incompleteTasks);
    }

    function showAll(){
        displayFilteredTasks(tasks);
    }

    function displayFilteredTasks(filteredTasks) {
        const taskList = document.getElementById('task-list-gue');
        taskList.innerHTML = '';
        filteredTasks.forEach(element => {
            const taskItem = `
            <div class="task-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px; margin-bottom: 6px; background: #f9f9f9; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div>
                <span style="font-weight: 500;">${element.task}</span>
                <span style="color: #888; margin-left: 10px; font-size: 0.95em;">(Due: ${element.dueDate})</span>
                </div>
                <button class="complete-button" style="background: #4dff8bff; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;" onclick="toggleTaskCompletion(${element.id})">${element.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-button" style="background: #ff4d4f; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer;" onclick="deleteTask('${element.task}')">Delete</button>
            </div>
            `;
            taskList.innerHTML += taskItem;
        });
    }