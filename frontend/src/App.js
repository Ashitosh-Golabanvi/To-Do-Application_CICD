import { useEffect, useState } from "react";

const API = "/todo-api/api/todos/";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Load todos
  const loadTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadTodos();
  };

  // Delete
  const deleteTodo = async (id) => {
    await fetch(`${API}${id}/`, {
      method: "DELETE",
    });
    loadTodos();
  };

  // Toggle
  const toggleTodo = async (id, completed) => {
    await fetch(`${API}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
    loadTodos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App 🚀</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : "❌"}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => toggleTodo(todo.id, todo.completed)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;