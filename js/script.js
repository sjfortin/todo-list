var model = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    })
  }
};

var controllers = {
  toggleAll: function() {
    model.toggleAll();
    view.displayTodos();
  },
  clearCompleted: function() {
    model.clearCompleted();
    view.displayTodos();
  },
  addTodo: function() {
    var addTodoText = document.getElementById('addTodoText');
    if (addTodoText.value.length === 0) {
      alert('Your Todo is blank! Add something :)');
    } else {
      model.addTodo(addTodoText.value);
      addTodoText.value = '';
    }
    if (model.todos.length > 0) {
      document.getElementById('toggleAll').style.display = 'block';
    }
    view.displayTodos();
  },
  changeTodo: function(position, todoText) {
    if (changeTodoText.value.length === 0) {
      alert('Your Todo is blank! Add something :)');
    } else {
      model.changeTodo(position, todoText);
      view.displayTodos();
    }
  },
  deleteTodo: function(position) {
    model.deleteTodo(position);
    view.displayTodos();
    if (model.todos.length === 0) {
      document.getElementById('toggleAll').style.display = 'none';
    }
  },
  toggleCompleted: function(position) {
    model.toggleCompleted(position);
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosDiv = document.getElementById('todoList');
    todosDiv.innerHTML = '';
    model.todos.forEach(function(todo, position) {
      var todoItem = document.createElement('div');
      var addedTodo = document.createElement('span');
      var markedComplete = document.createElement('span');
      var addedTodoText = document.createElement('span');
      var todoNumber = document.createElement('span');
      addedTodo.className = 'addedTodo';
      addedTodo.id = position;
      addedTodoText.className = 'addedTodoText';
      todoNumber.textContent = position + 1 + '. ';

      if (todo.completed === true) {
        addedTodo.insertBefore(markedComplete, this.addedTodo);
        addedTodo.insertBefore(todoNumber, this.addedTodo);
        addedTodo.insertBefore(addedTodoText, this.addedTodo);
        addedTodoText.textContent = todo.todoText;
        markedComplete.className = "markedComplete markedCompleteButton";
      } else {
        addedTodo.insertBefore(markedComplete, this.addedTodo);
        addedTodo.insertBefore(todoNumber, this.addedTodo);
        addedTodo.insertBefore(addedTodoText, this.addedTodo);
        addedTodoText.textContent = todo.todoText;
        markedComplete.className = "markedIncomplete markedCompleteButton";
      }
      todosDiv.appendChild(todoItem);
      todoItem.id = position;
      todoItem.className = 'todoItem';
      todoItem.insertBefore(addedTodo, this.todoItem);
      todoItem.insertBefore(this.createDeleteButton(), this.todoItem);
      todoItem.insertBefore(this.createEditButton(), this.todoItem);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton btn btn-sm btn-danger';
    return deleteButton;
  },
  createEditButton: function() {
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton btn btn-sm btn-primary';
    return editButton;
  },
  submitEditButton: function() {
    var submitEditButton = document.createElement('button');
    submitEditButton.textContent = 'Change Todo';
    submitEditButton.className = 'submitEditButton btn btn-sm btn-primary';
    return submitEditButton;
  },
  setUpEventListeners: function() {
    var todoList = document.getElementById('todoList');
    var todoListId = '';
    var submitEditButtonDiv = document.getElementById('submitEditButtonDiv');
    var editInput = document.createElement('input');
    var editForm = document.getElementById('editForm');

    todoList.addEventListener('click', function(event) {
      var elementClicked = event.target;
      todoListId = parseInt(elementClicked.parentNode.id);
      todoListNumber = todoListId + 1;
      if (elementClicked.classList.contains('markedCompleteButton')) {
        controllers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
      if (elementClicked.classList.contains('deleteButton')) {
        controllers.deleteTodo(parseInt(elementClicked.parentNode.id));
        editForm.textContent = '';
        submitEditButtonDiv.textContent = '';
      }
      if (elementClicked.classList.contains('editButton')) {
        submitEditButtonDiv.textContent = '';
        editForm.textContent = "Edit #" + todoListNumber;
        editInput.type = 'text';
        editInput.id = 'changeTodoText';
        editInput.placeholder = 'Change Todo Here';
        editInput.className = 'form-control';
        editInput.value = '';
        editForm.appendChild(editInput);
        submitEditButtonDiv.appendChild(view.submitEditButton());
      }
    });
    submitEditButtonDiv.addEventListener('click', function(event) {
      var submitClicked = event.target;
      if (submitClicked.classList.contains('submitEditButton')) {
        controllers.changeTodo(todoListId, document.getElementById('changeTodoText').value);
        editForm.textContent = '';
        submitEditButtonDiv.textContent = '';
      }
    });
  }
};

view.setUpEventListeners();
