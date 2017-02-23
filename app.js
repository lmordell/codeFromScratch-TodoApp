// Storage for the todos
var todos = [];

// Grab elements we need
var todoList = document.getElementById('todo-list');
var todoInput = document.getElementById('todo-input');

function addTodo() {
	// Get the input's value
	var todoText = todoInput.value;
	
	// Add todo to storage
	todos.push(todoText);

	// Render the todo
	displayNewTodo();

	// Clear the input's value
	todoInput.value = '';
}

function displayNewTodo() {

	// Grab the most recent todo
	var todoIndex = todos.length - 1;
	var todo = todos[todoIndex];

	// Create todo element and add id property and text
	var newTodo = document.createElement('li');
	newTodo.id = todoIndex;
	newTodo.innerHTML = todo;

	// Add todo to the DOM
	todoList.appendChild(newTodo);

	//Append edit and delete buttons to the todo
	//Pass in the todo index and the li element to append buttons to
	appendOptionButtons(todoIndex, newTodo);	
}

function removeTodo(index) {
	// Remove the todo from storage
	todos.splice(index, 1);

	// Grab the todo to remove
	var toDoToRemove = document.getElementById('' + index + '');

	// Remove the element from the DOM
	todoList.removeChild(toDoToRemove);
}

function addEditField(index) {
	// Grab the todo that we want to edit
	var toDoToChange = document.getElementById('' + index + '');

	// Create a new input where we can update the todo
	var editInput = document.createElement('input');
	editInput.type = "text";
	editInput.id = 'edit' + index;
	editInput.className = 'edit-input';
	editInput.placeholder = "Edit the todo";

	// Create a new button to submit changes
	var editButton = document.createElement('button');
	editButton.innerHTML = "Update todo";
	editButton.onclick = function() {
		updateTodo(index);
	}

	//Add the input and button to the DOM
	toDoToChange.appendChild(editInput);
	toDoToChange.appendChild(editButton);
}

function updateTodo(index) {
	// Grab the update todo input and its value
	var editInput = document.getElementById('edit' + index + '');
	var updatedTodo = editInput.value;

	// Grab the input at the index in storage and update its value
	todos[index] = updatedTodo;

	// Update the text value in the DOM
	var todo = document.getElementById('' + index + '');

	todo.innerHTML = updatedTodo;
	appendOptionButtons(index, todo);
}

function appendOptionButtons(index, todo) {
	// Functionality to delete the todo
	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'x';
	deleteButton.onclick = function() {
		removeTodo(index);
	}

	// Functionality to edit the todo
	var editButton = document.createElement('button');
	editButton.innerHTML = 'edit';
	editButton.onclick = function() {
		addEditField(index);
	}

	//Append option buttons to the todo
	todo.appendChild(deleteButton);
	todo.appendChild(editButton);
}
