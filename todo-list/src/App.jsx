import './App.css'; // Import the CSS file
import React, { useState } from 'react';



function App() {

  const [todos, setTodos] = useState(() => {
    // Retrieve todos from local storage if available, otherwise initialize as an empty array
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // State to manage the input value
  const [inputValue, setInputValue] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  
  // State to manage the priority value
  const [priority, setPriority] = useState('medium');

  // Function to handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to handle marking a todo as completed
  const toggleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (inputValue.trim()) {
      const newTodo = { text: inputValue, priority, completed: false };
      // Add the new todo to the list and sort the list based on priority
      const updatedTodos = [...todos, newTodo].sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      setTodos(updatedTodos);
      setInputValue('');
      setPriority('medium');
    }
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };
  // Function to mark a specific todo as completed
  const markAsCompleted = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const filterCompletedTodos = () => {
    const completed = todos.filter(todo => todo.completed);
    setCompletedTodos(completed);
  };

  // Function to filter incomplete todos
  const filterIncompleteTodos = () => {
    const incomplete = todos.filter(todo => !todo.completed);
    setCompletedTodos(incomplete);
  };

  // Function to show all todos
  const showAllTodos = () => {
    setCompletedTodos(todos);
  };
  return (
    <div className="app-container">
      <h1>Todo List</h1>
      {/* Form for adding todos */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new todo"
        />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Add Todo</button>
      </form>
      
      {/* Display the list of todos */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text} ({todo.priority})
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
