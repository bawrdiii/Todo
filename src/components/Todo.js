import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import "./Todo.css"

const Todo = (props) => {

    const [todoName, setTodoName] = useState('')

    //  const [todoList, updateList] = useState([])

    const todoListReduce = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload)
                break;

            case 'SET':
                return action.payload
                break;
            case 'DELETE':
                return state.filter((todo) => todo.id !== action.payload)
                break;
            default:
                return state
        }
    }

    const [todoList, dispatch] = useReducer(todoListReduce, [])

    useEffect(() => {
        axios.get('https://training-e8bb1-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
            .then(result => {
                console.log(result);
                const todoData = result.data
                const todos = []
                for (const item in todoData) {
                    todos.push({
                        id: item,
                        name: todoData[item].name
                    })
                    dispatch({ type: 'SET', payload: todos })
                }
            })
    }, [])

    const handleChange = (e) => {
        setTodoName(e.target.value)
    }
    const todoAddHandler = () => {

        axios.post('https://training-e8bb1-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            {
                name: todoName
            }
        )
            .then(res => {
                const todoItem = { id: res.data.name, name: todoName }
                dispatch({ type: 'ADD', payload: todoItem })
            }).catch(err => {
                console.log(err);
            })

    }

    const todoDeleteHandler = (todoId) => {
        axios.delete(`https://training-e8bb1-default-rtdb.europe-west1.firebasedatabase.app/todos/${todoId}.json`)
            .then(res => {
                dispatch({ type: 'DELETE', payload: todoId })
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="mt-3">
            <input
                value={todoName}
                onChange={handleChange}
                placeholder="To Do..?"
            />
            <button className="btn"
                onClick={todoAddHandler}>
                Add
            </button>
            <ul>
                {todoList.map(todo => (
                    <li key={todo.id} onClick={todoDeleteHandler.bind(this, todo.id)}>
                        {todo.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default Todo;