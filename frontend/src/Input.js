import axios from "axios";
import { useEffect, useState } from "react";
import List from "./List";

function Input({ setLoading }) {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/list")
      .then((response) => {
        const { data } = response || {};
        setList(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleInput(e) {
    setInput(e.target.value);
  }

  async function handleKeyPress(e) {
    return e.key === "Enter" ? await handleAddFunc() : null;
  }

  async function handleAddFunc() {
    return input !== "" ? await addList(input) : null;
  }

  async function addList(value) {
    setLoading(true);
    const newTaskObj = {
      task: value,
      completed: false,
    };
    const response = await axios.post(
      "http://localhost:3000/list/add",
      newTaskObj
    );
    const { data } = response || {};
    const { status, item } = data || {};
    if (status === "SUCCESS") {
      const array = [...list, item];
      setList(array);
      setInput("");
    } else {
      alert("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={input}
          placeholder="Enter a Todo"
          onChange={handleInput}
          onKeyDown={handleKeyPress}
        />
        <button className="add-btn" onClick={handleAddFunc}>
          Add
        </button>
      </div>
      <List list={list} setList={setList} setLoading={setLoading} />
    </>
  );
}

export default Input;
