import { FaTrashAlt, FaCheckCircle } from 'react-icons/fa'

function List({ list, setList }) {

    function handleToggle(id) {
        let mappedArray = list.map(task => {
            return task.id === id ? { ...task, completed: !task.completed } : { ...task }
        })
        setList(mappedArray)
    }

    function handleDelete(id) {
        let revisedArray = list.filter(task => { return task.id !== id })
        setList(revisedArray);
    }

    return (
        <div className="task-container">
            {
                list.map((element) =>
                    <div key={element.id} className="task">
                        <span className={element.completed ? "strike" : ""}>{element.task}</span>
                        <div>
                            <span className='task-btn' onClick={() => handleToggle(element.id)} style={{ color: 'red' }}><FaCheckCircle /></span>
                            <span className="task-btn" onClick={() => handleDelete(element.id)} style={{ color: 'skyblue' }}><FaTrashAlt /></span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default List;