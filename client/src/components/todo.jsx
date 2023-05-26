import "./todo.css";
import { AddTodo } from "./addTodo/addTodo";
import { TodoList } from "./todoList/todoList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const Todo = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todoTable, setTodoTable] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState(0);

  let id = Math.random();
  const API_URL = "http://localhost:3002/api/list";
  const fetchTodo = async () => {
    try {
      const response = await axios(API_URL);
      console.log(response);
      setTodoTable(response.data.todoList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodo();
  }, []);
  const handleChange = (event) => {
    setTodoValue(event?.target?.value);
    setErrorMsg(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(todoValue);

    if (todoValue === "") {
      setErrorMsg(true);
    } else {
      try {
        const response = await axios(API_URL, {
          method: "POST",
          data: {
            todo: todoValue,
          },
        });
        console.log(response.data);
        setTodoTable(response.data.todoList);
        setTodoValue("");
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios(API_URL, {
        method: "DELETE",
        data: {
          id: id,
        },
      });
      setTodoTable(response.data.todoList);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleEdit = async (data) => {
    try {
      const response = await axios(API_URL, {
        method: "PUT",
        data: {
          id: id,
        },
      });
      setTodoTable(response.data.todoList);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleComplete = (id) => {
    let completeVal = todoTable?.map((tod) => {
      if (tod.id === id && tod.completed === true) {
        return { ...tod, completed: false };
      } else if (tod.id === id) {
        return { ...tod, completed: true };
      } else {
        return tod;
      }
    });
    setTodoTable(completeVal);
  };
  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <AddTodo
        todoValue={todoValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        errorMsg={errorMsg}
      />
      <TodoList
        todoTable={todoTable}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleComplete={handleComplete}
      />
    </div>
  );
};
