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