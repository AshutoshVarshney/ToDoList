<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo List</title>
  <style>
    .todo-container {
      margin-top: 20px;
    }

    .todo-item {
      display: flex;
      gap: 15px;
      align-items: center;
      margin-bottom: 10px;
    }

    .btn-delete {
      background-color: red;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }

    .btn-add {
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>Todo List</h1>

  <input type="text" id="todo-input" placeholder="Enter task">
  <input type="date" id="todo-date">
  <button class="btn-add" onclick="addTodo()">Add</button>

  <div class="todo-container"></div>

  <script>
    let todoList = [];

    loadFromLocalStorage();
    displayItems();

    function addTodo() {
      let inputElement = document.querySelector('#todo-input');
      let dateElement = document.querySelector('#todo-date');
      let todoItem = inputElement.value;
      let todoDate = dateElement.value;

      if (todoItem.trim() === '' || todoDate === '') {
        alert('Please fill in both the task and due date.');
        return;
      }

      todoList.push({ item: todoItem, dueDate: todoDate });
      inputElement.value = '';
      dateElement.value = '';
      saveToLocalStorage();
      displayItems();
    }

    function deleteTodo(index) {
      todoList.splice(index, 1);
      saveToLocalStorage();
      displayItems();
    }

    function displayItems() {
      let containerElement = document.querySelector('.todo-container');
      let newHtml = '';
      for (let i = 0; i < todoList.length; i++) {
        let { item, dueDate } = todoList[i];
        newHtml += `
          <div class="todo-item">
            <span>${item}</span>
            <span>${dueDate}</span>
            <button class='btn-delete' onclick="deleteTodo(${i})">Delete</button>
          </div>
        `;
      }
      containerElement.innerHTML = newHtml;
    }

    function saveToLocalStorage() {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    function loadFromLocalStorage() {
      const storedList = localStorage.getItem('todoList');
      if (storedList) {
        todoList = JSON.parse(storedList);
      }
    }
  </script>
</body>
</html>
