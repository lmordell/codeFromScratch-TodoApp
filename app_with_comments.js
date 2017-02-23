/*
The first thing we're going to do is create an 'Array' to store
our todos. An array is something in Javascript we use to store
a list of data. To make an array, you first create a variable to
store the array so you can reference it later. Below, we're creating a
variable called 'todos' and setting its value to an empty array.

See the link below for more information about arrays:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
*/
var todos = [];

/*
Next, we want to be able to acess both the place where we write
the todo (the input from index.html) and the place we're going to
display the todo (the ul tag from index.html). Javacript has a handy
method for getting elements from index.html. We use the 'document' 
(the place where our HTML exists) and we call a function called
'getElementById' like below. For this to work, the element in our
HTML file must have an 'id' attribute. Inside the parentheses of
getElementById, we can pass in the name of the element's id. We can
also store this in a variable to reference the element later
*/
var todoList = document.getElementById('todo-list');
var todoInput = document.getElementById('todo-input');

/*
Below we have a function called 'addTodo'. A function is a series of
instructions that, when given an input, will return an output. 
For example, if I write a function called addTwoNumbers, the input should
be 2 numbers and the output would be the sum of those numbers. In the
addTodo function, we add the todo that the user has written into our
todos array.
*/
function addTodo() {
	/*
	Get the input's value. Remember we saved the input as a variable
	called todoInput? Now we can reference that variable and get 
	whatever todo the user has written. We do this by creating a new
	variable called 'todoText'. There we store the 'value' of the input
	(ie. what the user has written in the input box) 
	*/
	var todoText = todoInput.value;
	
	/*
	To add a todo to our todos array, we can use a method called 'push'.
	This adds whatever value we pass in to the parentheses to the end
	of the array. Here we're adding the todoText to the end of the
	todos array
	*/
	todos.push(todoText);

	/*
	When the user click the submit button, we want to do 2 things:
		1) Add the todo to our stroage array
		2) Display the new todo on the page
	The 'addTodo' function only adds the todo to the storage so we'll
	write a separate function called displayNewTodo to handle the second
	part. Since we want to do both actions at the same time, we call
	out displayNewTodo function below by wrtiting it's name then 
	and set of parentheses like below.
	*/
	displayNewTodo();

	/*
	After the user adds a todo, the value of the input doesn't 
	change. We have to manually reset the inputs value to a blank
	string like below
	*/
	todoInput.value = '';
}



/*
	The displayNewTodo function is responsible for displaying
	our new todo on the page.
*/
function displayNewTodo() {

	/*
	If you studied up on arrays you know the todo we just added will be
	at the last index of our todos array. First we create a variable
	called 'todoIndex' which is the index of the last element in the 
	array. Take a look at the link at the beginning of this file
	on arrays to see what todos.length - 1 does. To get the most recent
	todo, we create a variable called 'todo' and we set that to the value
	of the todos array at the todoIndex
	*/
	var todoIndex = todos.length - 1;
	var todo = todos[todoIndex];

	/*
	So now that we have our most recent todo, let's add it to the page.
	Since the element doesn't already exist, we can create the element
	and store it in a variable called newTodo. We want to reference 
	the element later, so let's give it an id of the todoIndex. innerHTML
	allows us to add text to the element we created, so we set innerHTML
	to the todo. Lastly, we want to add the element to the todo list
	on the page. Remember we created a variable above to reference
	this todo list? We use a method called 'appendChild' to our
	to do list which will place the element we just created as a child
	to the list. Think of the todos list on the page as a parent which
	can have many children ()
	*/
	var newTodo = document.createElement('li');
	newTodo.id = todoIndex;
	newTodo.innerHTML = todo;
	todoList.appendChild(newTodo);

	/*
	At the end of this function, we can add some options buttons
	to our todo. Options include removing and editing a todo. Since we
	want these buttons to correspond to the element we just created, we 
	create a function to do this and pass in the index of the todo 
	and the todo element itself.
	*/
	appendOptionButtons(todoIndex, newTodo);	
}



/*
	In the function below, we handle adding 2 buttons to a given todo.
	To reference the right todo, we pass in the todo's index and
	the todo element itself
*/
function appendOptionButtons(index, todo) {
	/*
	First, let's add functionality to remove a todo. We create
	a new button, set its text to 'x'. Since we want the button
	to do something when we click it, we attach an onclick event
	handler and call the removeTodo function (which we'll create
	below), which will handle 
	removing the todo from the storage and page.
	*/
	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'x';
	deleteButton.onclick = function() {
		removeTodo(index);
	}

	// Functionality to edit the todo (Explanation similar to
	// one above)
	var editButton = document.createElement('button');
	editButton.innerHTML = 'edit';
	editButton.onclick = function() {
		addEditField(index);
	}

	/*
	Lastly, let's add both of these buttons to a todo. 
	Since we passed in a reference to the todo element itself in the
	function, we cn directly append each button to the right todo.
	*/
	todo.appendChild(deleteButton);
	todo.appendChild(editButton);
}



/*
	The removeTodo function is responsible for removing
	a todo from the page and the todos storage array. 
	To do this, we pass in an index so we can remove the element 
	from both the storage and the page.
*/
function removeTodo(index) {
	/*
	There's a useful method called splice which lets us delete
	an element from an array. We reference the array 'todos' and 
	use the splice method. Splice takes in 2 arguments: An index and
	a delete count. So we delete the element from the todos array
	at the index where it exists and we only need to delete one,
	so we write 1 as the delete count
	*/
	todos.splice(index, 1);

	/*
	After removing the element from storage, let's remove it from the
	page. We create a variable called toDoToRemove and grab it using
	document.getElementById and the index we passed into this function. 
	Since we must pass in a string, we add an empty string before and
	after the index.
	*/
	var toDoToRemove = document.getElementById('' + index + '');

	/*
	Lastly, we reference our todoList and remove the todo
	we referenced above using the 'removeChild' button
	*/
	todoList.removeChild(toDoToRemove);
}

/*
	When we want to edit a todo, we need to create a new input
	field where we can type in the new value of our todo. Here, 
	we'e just concerened with creating the elements that will
	allow us to update our todo'.
*/

function addEditField(index) {
	// Grab the todo that we want to edit
	var toDoToChange = document.getElementById('' + index + '');

	/*
	Create a new input where we can update the todo. Since
	this is an input we have to give it a type, so we set its type
	to text. Since we'll have to reference this input field later,
	let's give it a unique id with the string 'edit' + the index
	we passed in. To style the input, let's add a class called
	'edit-input'. Lastly, we'll add some placeholder text
	*/
	var editInput = document.createElement('input');
	editInput.type = "text";
	editInput.id = 'edit' + index;
	editInput.className = 'edit-input';
	editInput.placeholder = "Edit the todo";

	/*
	Ok, now that I have a place where I can edit my todo,
	I need a button to click to submit my changes. Let's create that
	button. We want this button to do something when we click it,
	so we create an onclick event handler which calls our updateTodo
	function, which will actually do the work of updating
	the todo on the page and in storage
	*/
	var editButton = document.createElement('button');
	editButton.innerHTML = "Update todo";
	editButton.onclick = function() {
		updateTodo(index);
	}

	//Lastly, add the input and button to the todo we want to change
	toDoToChange.appendChild(editInput);
	toDoToChange.appendChild(editButton);
}



/*
	In the function below, we handle updating a todo in the storage
	and on the page.
*/
function updateTodo(index) {
	// Grab the update todo input and its value
	var editInput = document.getElementById('edit' + index + '');
	var updatedTodo = editInput.value;

	// Grab the input at the index in storage and update its value
	todos[index] = updatedTodo;

	// Grab the element we want to update and set its innerHTML
	// to the text of the updatedTodo
	var todo = document.getElementById('' + index + '');
	todo.innerHTML = updatedTodo;

	/*
	 An unfortunate feature of using innerHTML is that using it
	 destroys all of it's children. In this case, the children of our todo 
	 are our edit and delete buttons. Luckily we have a function to add 
	 these buttons back to our todo and we can reuse it below.
	*/
	appendOptionButtons(index, todo);
}