const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());
const PORT = 3002;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
let todoList = [
  {
    id: uuidv4(),
    todo: "template 1 created",
    isCompleted: false,
  },
];

app.get("/api/list", (req, res) => {
  res.status(200).json({ message: "Success", todoList });
});

app.post("/api/list", (req, res) => {
  const { todo, isCompleted } = req.body;
  //check whether attribute is correct or not
  if (!("todo" in req.body)) {
    //if not there return error msg
    return res.status(400).json({
      message: `${JSON.stringify(req.body)} 
        is not a correct one.Enter valid attribute`,
    });
  }
  //check whether its there or not
  const newTodo = {
    id: uuidv4(),
    todo: todo,
    isCompleted: isCompleted,
  };
  todoList.push(newTodo);
  res.status(200).json({ message: "Success", todoList });
});
app.put("/api/list", (req, res) => {
  let params = req.body;

  //check field empty
  // for (let key in params) {
  //   console.log(key);
  //   console.log(params.hasOwnProperty(key) + "===");
  //   if (!todoList.hasOwnProperty(key)) {
  //     // if (!params[key]) {
  //     return res.status(400).json({
  //       message: `${JSON.stringify(req.body)}
  //       is not a correct one.Enter valid attribute`,
  //     });
  //   }
  // }

  const isExist = todoList.find((data) => data.id === params.id);
  if (isExist) {
    todoList.forEach((todoItem) => {
      if (todoItem.id === params.id) {
        todoItem.todo = params.todo;
        todoItem.isCompleted = params.isCompleted || false;
      }
    });
    res.status(200).json({ message: "Success", todoList });
  }
  res.status(404).json({ message: `${params.id} doesnot Exist` });
});
app.delete("/api/list", (req, res) => {
  const { id } = req.body;
  const itemIndex = todoList.findIndex((data) => data.id === id); //taking index
  //-1 if data  not there
  if (itemIndex !== -1) {
    todoList.splice(itemIndex, 1);
    return res.json(todoList);
  }
  res.status(404).json({ message: `${id} doesnot Exist` });
});
app.all("*", (req, res) => {
  res.status(404).json({ message: "404 This page doesnot exists" });
});
