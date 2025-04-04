import './App.css'; // Import the CSS file
import React, { useState } from 'react';


/**
 * The main component of the Todo List application.
 * Manages the state of the todo list, input value, and priority.
 * Provides functionality to add, delete, and display todos with different priorities.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  // State to manage the list of todos
  const [todos, setTodos] = useState(() => {
    // Retrieve todos from local storage if available, otherwise initialize as an empty array
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Use useEffect to save todos to local storage whenever they change
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // State to manage the input value
  const [inputValue, setInputValue] = useState('');
  
  // State to manage the priority value
  const [priority, setPriority] = useState('medium');

  // Function to handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to handle priority change
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  // Function to handle form submission and add a new todo
  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior, checks if the input value is not empty,
   * creates a new todo item with the input value and priority, updates the todos list by adding
   * the new todo and sorting the list based on priority, and then resets the input value and priority.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (inputValue.trim()) {
      const newTodo = { text: inputValue, priority };
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
