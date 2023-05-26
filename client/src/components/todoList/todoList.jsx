import "./todoList.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export const TodoList = ({
  todoTable,
  handleDelete,
  handleEdit,
  handleComplete,
}) => {
  console.log(todoTable);
  return (
    <div className="list-container">
      {Array.isArray(todoTable)
        ? todoTable.map((data) => (
            <div className="list-row" key={data?.id}>
              <div
                style={{ width: "400px", padding: "10px", textAlign: "left" }}
                onClick={() => handleComplete(data?.id)}
              >
                <p
                  className={
                    data?.completed ? "complete-span-1" : "complete-span-2"
                  }
                >
                  {" "}
                  {data?.todo}
                </p>
              </div>
              <span className="list-button">
                <button onClick={() => handleEdit(data)}>
                  <EditIcon />
                </button>
                <button onClick={() => handleDelete(data?.id)}>
                  <DeleteIcon />
                </button>
              </span>
            </div>
          ))
        : null}
    </div>
  );
};
