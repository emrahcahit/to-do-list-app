// Get references to DOM elements

/* These lines of code get references to the HTML elements 
with the IDs "todoInput", "addBtn", "todoList", and "clear-btn", respectively, 
using the document.getElementById() method. */



/* This code defines a constant variable called todoInput, which is assigned the value of the HTML element with the id attribute "todoInput".
In JavaScript, the document object represents the entire HTML document loaded in the browser, and getElementById is a method on the document object that allows you to retrieve a reference to an HTML element based on its unique id attribute.
So, document.getElementById("todoInput") retrieves the HTML element with the id attribute "todoInput", and assigns a reference to this element to the todoInput variable. */
const todoInput = document.getElementById("todoInput");

/* This code defines a constant variable named addBtn which is assigned the value of the HTML element with the id attribute "addBtn".
So, document.getElementById("addBtn") retrieves the HTML element with the id attribute "addBtn", and assigns a reference to this element to the addBtn variable. */
const addBtn = document.getElementById("addBtn");

/* This line of code is declaring a constant variable called todoList. The value of this variable is assigned using the document.getElementById() method, 
This code is essentially selecting a specific HTML element on the page with an id of "todoList" and storing a reference to that element in the todoList variable*/
const todoList = document.getElementById("todoList");

/* This line of code is creating a new constant variable called clearBtn. The variable is assigned a value using the document.getElementById() method,
 it's looking for an HTML element on the current page that has an id attribute of "clear-btn" and it's storing a reference to that element in the clearBtn variable */
const clearBtn = document.getElementById("clear-btn");

// Get todos from local storage, or an empty array if none exist
/* This code is declaring a variable todos and assigning it a value. The value is the result of parsing a JSON-formatted string that is retrieved from the web browser's localStorage object, using the getItem method. If the localStorage.getItem method returns null or undefined, which can happen if no value has been stored under the key "todos", then the || operator sets the value of todos to an empty array. */
/* Here is a breakdown of what each part of the code does:
JSON.parse() is a built-in JavaScript method that takes a JSON-formatted string and returns a JavaScript object. In this case, it is being used to parse the string retrieved from localStorage.getItem("todos") into an array of objects that represents a list of to-do items.
localStorage.getItem() is a method provided by the web browser's localStorage object that retrieves the value stored under a specific key. In this case, it retrieves the value stored under the key "todos".
|| is a logical OR operator in JavaScript. If the value returned by localStorage.getItem("todos") is null, undefined, or any other "falsy" value, then the || operator causes the empty array to be assigned to todos instead. */
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render todos to the DOM
/* This is a function called renderTodos() that is used to render or display a list of to-do items on a webpage.

The first thing that this function does is clear any existing to-do items that may be displayed on the webpage. It does this by setting the innerHTML property of the todoList element to an empty string.

innerHTML is a property of an element in the Document Object Model (DOM) that represents the content of the element, including any HTML tags and text. By setting it to an empty string, the function effectively removes any content that may have been previously displayed in the todoList element.

Once the existing to-do items have been cleared, the function can proceed to render the new to-do items on the webpage. 

Overall, this function is a crucial part of creating a dynamic to-do list that can update and display new items as they are added or removed. */
function renderTodos() {
  // Clear existing todo items
  todoList.innerHTML = "";


  /* This code checks the length of the todos array and sets the display property of the clear button accordingly. If the array is empty, the button will be hidden (display: none), and if the array is not empty, the button will be displayed as a block-level element (display: inline-block). */
  const clearBtn = document.querySelector("#clear-btn");

  if (todos.length === 0) {
    clearBtn.style.display = "none";
  } else {
    clearBtn.style.display = "inline-block";
    clearBtn.style.position = "relative";
    clearBtn.style.left = "50%";
    clearBtn.style.top = "50%";
    clearBtn.style.transform = "translate(-50%, -50%)";
  }

  // Loop through todos and create DOM elements for each one

  /* This code creates a new list item for each to-do item in the todos array, along with a checkbox, a label, an edit button, and a delete button for each to-do item.

The for loop iterates over each element in the todos array, and the current to-do item is assigned to the todo constant using the i index.

A new list item element is created using the document.createElement() method, and assigned to the li constant.
Next, a label element, an input checkbox element, an edit button element, and a delete button element are created using the document.createElement() method, and assigned to their respective constants (label, checkbox, editBtn, and deleteBtn).

These elements are then configured in the subsequent blocks of code, which are executed for each to-do item:

The checkbox element's type and checked attributes are set, and an event listener is added to it that updates the done property of the corresponding to-do item in the todos array, saves the updated to-dos to local storage using the saveTodos() function, and applies or removes the completed class from the corresponding list item depending on the state of the checkbox.
The label element's textContent property is set to the text of the current to-do item.
The editBtn element's textContent property is set to "Edit", the "edit-btn" class is added to it, and an event listener is added to it that displays a prompt asking the user to enter new text for the corresponding to-do item.
The deleteBtn element's textContent property is set to "Delete", the "delete-btn" class is added to it, and an event listener is added to it that deletes the corresponding to-do item from the list when clicked.
Finally, the li element is populated with the checkbox, label, edit button, and delete button elements, and added to the todoList element on the webpage. If the to-do item is marked as done, the completed class is added to the li element.

*/
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    // Configure checkbox element
    /* This block of code sets up a checkbox element to display the "done" status of a todo item and allows the user to change the status by checking or unchecking the checkbox.







    /* This line sets the type of the checkbox element to "checkbox", which creates a checkbox input field. */
    checkbox.type = "checkbox";

    /* This line sets the initial checked state of the checkbox element to the done property of the current todo item. If the done property is true, the checkbox will be checked initially. If the done property is false, the checkbox will be unchecked initially. */
    checkbox.checked = todo.done;

    /* This line attaches an event listener to the checkbox element that listens for a "change" event, which occurs when the user clicks the checkbox. */
    checkbox.addEventListener("change", function () {
      /* This line updates the done property of the current todo item to the value of the checked property of the checkbox element. If the checkbox is checked, this.checked will be true, and the done property will be set to true. If the checkbox is unchecked, this.checked will be false, and the done property will be set to false. */
      todo.done = this.checked;
      
      /* This line calls the saveTodos() function to save the updated todo list to local storage. */
      saveTodos();

      /* This line applies the "completed" class to the li element of the current todo item if the checkbox is checked, and removes the class if the checkbox is unchecked. The toggle() method is used to add or remove the class depending on the value of the checked property of the checkbox. */ 
      li.classList.toggle("completed", this.checked); // apply "completed" class to li element
    });
    
    // Configure label element
    /* the code label.textContent = todo.text takes the value of the text property of the todo object and assigns it to the textContent property of the label element. This means that the text content of the label element will now be equal to the text of the to-do item. */
    label.textContent = todo.text;

    // Configure edit button element
    /* This code block is responsible for creating an "Edit" button element, adding a class to it, and attaching an event listener to it that allows the user to edit the text content of a to-do item. */


    /* This line sets the text content of the editBtn button element to "Edit". This will be the text displayed on the button. */
    editBtn.textContent = "Edit";
    
    /* This line adds the CSS class "edit-btn" to the editBtn button element. This class can be used to style the button using CSS. */
    editBtn.classList.add("edit-btn");

    /* This line attaches an event listener to the editBtn button element. Specifically, it listens for a "click" event, and when the button is clicked, it executes the function that follows. */
    editBtn.addEventListener("click", function () {

      /* This line creates a new variable called newText and assigns it the value returned by the prompt function. The prompt function creates a dialog box that prompts the user to enter some text. In this case, the dialog box will display the current text of the to-do item (stored in todo.text) as a default value, and the user can enter a new value if desired. */
      const newText = prompt("Enter new text for this todo", todo.text);

      /* This line begins an if statement that checks whether newText is truthy (i.e. not an empty string or null). If it is, the code within the braces will be executed. */
      if (newText) {

        /* This line assigns the value of newText to the text property of the todo object. This updates the text content of the to-do item to the new value entered by the user. */
        todo.text = newText;

        /*  This line calls a function called saveTodos(), which is likely responsible for saving the updated to-do list to some sort of storage (such as local storage or a database). */
        saveTodos();

        /* This line calls a function called renderTodos(), which is likely responsible for re-rendering the to-do list on the page with the updated values. */
        renderTodos();
      }
    });

    // Configure delete button element
    /* This code block is responsible for creating a "Delete" button element, adding a class to it, and attaching an event listener to it that allows the user to delete a to-do item. */

    /* This line sets the text content of the deleteBtn button element to "Delete". This will be the text displayed on the button. */
    deleteBtn.textContent = "Delete";

    /* This line adds the CSS class "delete-btn" to the deleteBtn button element. This class can be used to style the button using CSS. */
    deleteBtn.classList.add("delete-btn");

    /* This line attaches an event listener to the deleteBtn button element. Specifically, it listens for a "click" event, and when the button is clicked, it executes the function that follows. */
    deleteBtn.addEventListener("click", function () {

      /* This line removes the to-do item at index i from the todos array. The splice() method is called on the todos array, and it takes two arguments: the index at which to start removing elements, and the number of elements to remove (in this case, just one). This effectively removes the to-do item at index i from the todos array. */
      todos.splice(i, 1);

      /* This line calls a function called saveTodos(), which is likely responsible for saving the updated to-do list to some sort of storage (such as local storage or a database). */
      saveTodos();

      /*  This line calls a function called renderTodos(), which is likely responsible for re-rendering the to-do list on the page with the updated values (in this case, with the deleted item removed). */
      renderTodos();
    });

    /* This code block checks if the length of the todos array is greater than 0. If so, it enables a "Clear" button by removing the disabled attribute. If not, it disables the "Clear" button by setting the disabled attribute to true. It also attaches an event listener to the "Clear" button that will execute a function when the button is clicked. */
    // to prompt the user for confirmation before clearing all the todos

    /* This line begins an if statement that checks whether the length of the todos array is greater than 0. If it is, the code within the first set of braces will be executed. If not, the code within the second set of braces will be executed. */
    if (todos.length > 0) {

      /* This line removes the disabled attribute from the clearBtn button element, effectively enabling it. */
      clearBtn.removeAttribute("disabled");
    } else {
      /* This line sets the disabled attribute of the clearBtn button element to true, effectively disabling it. */
      clearBtn.setAttribute("disabled", true);
    }

    /* This line attaches an event listener to the clearBtn button element. Specifically, it listens for a "click" event, and when the button is clicked, it executes the function that follows. */
    clearBtn.addEventListener("click", function () {
      
      /* This code block checks if the "Clear" button element does not have the disabled attribute set. If the button is enabled, it prompts the user with a confirmation message and, if the user confirms, deletes all to-do items from the list. */

      /* This line begins an if statement that checks whether the clearBtn button element does not have the disabled attribute set. The ! operator before the clearBtn.hasAttribute("disabled") expression means "not", so this condition will only be true if the clearBtn button element does not have the disabled attribute. */
      if (!clearBtn.hasAttribute("disabled")) {

        /* This line displays a confirmation message using the confirm() function, which is a built-in JavaScript function that creates a modal dialog box with an "OK" button and a "Cancel" button. The text of the dialog box is "Are you sure you want to delete everything?". The confirm() function returns true if the user clicks "OK" and false if the user clicks "Cancel", and the result is stored in the confirmed variable. */
        const confirmed = confirm(
          "Are you sure you want to delete everything?"
        );

        /* This line begins an if statement that checks whether the confirmed variable is true. If it is, the code within the braces will be executed. If not, the code will be skipped. */
        if (confirmed) {

          /* This line sets the todos array to an empty array, effectively deleting all to-do items from the list. */
          todos = [];

          /* This line calls a function called saveTodos(), which is likely responsible for saving the updated to-do list to some sort of storage (such as local storage or a database). */
          saveTodos();

          /* This line calls a function called renderTodos(), which is likely responsible for re-rendering the to-do list on the page with the updated values (in this case, with all items deleted). */
          renderTodos();
          
          // This line sets the disabled attribute of the clearBtn button element to true. This disables the button and makes it unclickable.
          clearBtn.setAttribute("disabled", true);
        }
      }
    });

    /* This block of code adds the various elements that make up a to-do item (checkbox, label, edit button, delete button) to a new li element. If the to-do item is marked as done, the completed class is added to the li element. Finally, the li element is added to the todoList element on the webpage. */
    // Add elements to list item
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Apply "completed" class to li element if the todo is marked as done
    if (todo.done) {
      li.classList.add("completed");
    }

    // Add list item to list
    todoList.appendChild(li);
  }
}

// Save todos to local storage
function saveTodos() {
  // Use the setItem() method of the localStorage object to store the todos array as a JSON string
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add new todo to list
function addTodo() {
  // Get the text input value and remove any leading or trailing white spaces
  const text = todoInput.value.trim();
  if (text) {
    // if text is not empty
    // Add a new object to the todos array with the text and done status of the new todo
    todos.push({
      text: text,
      done: false,
    });

    saveTodos(); // Call saveTodos() function to save the new todo to local storage

    renderTodos(); // Call renderTodos() function to update the UI with the new todo

    todoInput.value = ""; // Clear the input field by setting its value to an empty string
  }
}




/* This code defines a function called handleFormSubmit that is responsible for handling the submission of a form. The function takes one parameter, event, which represents the event object that triggered the function.

The first line of the function event.preventDefault() prevents the default behavior of the form submission, which is to reload the page or navigate to another page. This is important in the context of a single-page application, where we want to handle form submissions using JavaScript code without refreshing the page.

The next line of code addTodo() calls another function called addTodo to add a new todo to a list. It's not clear from this code what addTodo does, but presumably, it is defined elsewhere in the code and adds a new todo item to a list.

In summary, this code sets up an event handler to intercept a form submission event and prevent the default behavior. It then calls a separate function to handle the actual processing of the form data and add a new todo item to a list. */
// Handle form submission
function handleFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault(); // Call addTodo() function to add a new todo to the list
  addTodo();
}



/* This code sets up two event listeners on two DOM elements, an "Add" button and a text input field, to allow users to add new todo items to a list. Here's a breakdown of the code:

addBtn.addEventListener("click", addTodo) adds an event listener to the "Add" button, which is represented by the addBtn DOM element. When the button is clicked, the addTodo() function is called. The purpose of this function is to add a new todo item to the list.

todoInput.addEventListener("keypress", function (event) {...}) adds an event listener to the text input field, which is represented by the todoInput DOM element. When a key is pressed in the text input field, the anonymous function defined within the addEventListener method is called. This function checks if the key that was pressed is the "Enter" key, which is represented by the string "Enter". If the key is "Enter", the addTodo() function is called to add a new todo item to the list.

addTodo() is a function that is defined in the code. This function retrieves the text that was entered in the text input field, creates a new todo item based on that text, adds the todo item to a list, and updates the user interface to display the new todo item.

In summary, this code sets up event listeners on the "Add" button and the text input field to allow users to add new todo items to a list. When the user clicks the "Add" button or presses the "Enter" key in the text input field, the addTodo() function is called to handle the addition of a new todo item. */

// Add event listeners to DOM elements
addBtn.addEventListener("click", addTodo); // When the "Add" button is clicked, call the addTodo() function to add a new todo to the list
todoInput.addEventListener("keypress", function (event) {
  // When a key is pressed in the text input field, check if the key is "Enter", and if it is, call the addTodo() function to add a new todo to the list
  if (event.key === "Enter") {
    addTodo();
  }
});






// When the DOM content has been loaded, call the renderTodos() function to update the UI with the todos from local storage

/* This code sets up an event listener that waits for the DOM content to finish loading before calling a function called renderTodos(). The renderTodos() function is responsible for updating the user interface with a list of todos that are stored in local storage.

document refers to the global document object, which represents the current HTML document that is loaded in the browser.

.addEventListener("DOMContentLoaded", renderTodos) sets up an event listener on the document object that waits for the DOMContentLoaded event to occur. The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed by the browser, which means that all the elements in the HTML document are available for manipulation by JavaScript.

renderTodos is a function that is defined elsewhere in the code. This function is responsible for retrieving the list of todos from local storage and updating the user interface with the todo items. When the DOMContentLoaded event is fired, the renderTodos function is called to perform this task.

In summary, this code ensures that the renderTodos function is called after the HTML document has loaded, which allows the function to update the user interface with the todos from local storage. */
document.addEventListener("DOMContentLoaded", renderTodos);




// When the form is submitted, call the handleFormSubmit() function to handle the form submission

/* This code sets up an event listener on the first <form> element that is found in the HTML document. When the form is submitted by the user (for example, by clicking a submit button), the function handleFormSubmit will be called to handle the submission.

document.querySelector("form") selects the first <form> element in the HTML document using the querySelector() method. This method takes a CSS selector as an argument and returns the first element that matches the selector.

.addEventListener("submit", handleFormSubmit) adds an event listener to the selected form element. The "submit" argument specifies the type of event that the listener is waiting for (in this case, the submission of the form), and handleFormSubmit is the function that will be called when the event occurs.

handleFormSubmit is a function that is defined in the code. Its purpose is to handle the form submission, which could involve validating the form data, sending the data to a server, or performing some other action based on the form contents. */
document.querySelector("form").addEventListener("submit", handleFormSubmit);
