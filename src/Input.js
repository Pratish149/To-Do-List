import { useState, useEffect } from 'react'
import List from './List'

function Input() {

    const [input, setInput] = useState('')
    const [list, setList] = useState(JSON.parse(localStorage.getItem('autosave-data')))

    useEffect(() => {
        localStorage.setItem('autosave-data', JSON.stringify(list))
    }, [list])

    function handleInput(e) {
        setInput(e.target.value)
    }

    function handleKeyPress(e) {

        return e.key === 'Enter' ? handleAddFunc() : null;
    }

    function handleAddFunc() {
        return input !== '' ? addList(input) : null
    }

    function addList(value) {
        let array = [...list, { id: list.length === 0 ? 1 : list[list.length - 1].id + 1, task: value, completed: false }]
        setList(array)
        setInput('')
    }

    return (
        <>
            <div>
                <input type="text" value={input} placeholder="Enter a Todo" onChange={handleInput} onKeyPress={handleKeyPress} />
                <button className='add-btn' onClick={handleAddFunc}>Add</button>
            </div>
            <List list={list} setList={setList} />
        </>
    )
}

export default Input;