import axios from "axios";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

function List({ list, setList, setLoading }) {
  function handleToggle(index) {
    setLoading(true);
    const { _id, completed } = list[index] || {};
    axios
      .put(`http://localhost:3000/list/update/${_id}`, {
        completed: !completed,
      })
      .then((response) => {
        const { data } = response || {};
        const { status } = data || {};
        if (status === "SUCCESS") {
          list[index].completed = !completed;
          setList([...list]);
        } else {
          alert("Something went wrong. Please try again later");
        }
      })
      .catch((error) => {
        const { message } = error?.response?.data || error;
        if (message === "TASK_NOT_FOUND") {
          alert("Cannot find task in the list");
        } else {
          alert("Something went wrong. Please try again later");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDelete(id) {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/list/delete/${id}`)
      .then((response) => {
        const { data } = response || {};
        const { status } = data || {};
        if (status === "SUCCESS") {
          const revisedArray = list.filter((task) => {
            return task._id !== id;
          });
          setList(revisedArray);
        } else {
          alert("Something went wrong. Please try again later");
        }
      })
      .catch((error) => {
        const { message } = error?.response?.data || error;
        if (message === "TASK_NOT_FOUND") {
          alert("Cannot find task in the list");
        } else {
          alert("Something went wrong. Please try again later");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="task-container">
      {list.map((element, index) => (
        <div key={element?._id} className="task">
          <span className={element?.completed ? "strike" : ""}>
            {element?.task}
          </span>
          <div>
            <span
              className="task-btn"
              onClick={() => handleToggle(index)}
              style={{ color: "red" }}
            >
              <FaCheckCircle />
            </span>
            <span
              className="task-btn"
              onClick={() => handleDelete(element?._id)}
              style={{ color: "skyblue" }}
            >
              <FaTrashAlt />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
