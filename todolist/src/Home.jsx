import React, {useEffect, useState} from 'react';
import Create from './Create';
import axios from "axios";
import {BsCCircleFill, BsFillCheckCircleFill, BsFillTrashFill} from "react-icons/bs";

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create/>
            {todos.length === 0 ? (
                <div><h2>No Record</h2></div>
            ) : (
                todos.map((todo, index) => (
                    <div className='task' key={index}>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                                : <BsCCircleFill className="icon"/>
                            }

                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p> {/* Corrected to todo.task */}
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className='icon'
                                                 onClick={() => handleDelete(todo._id)}/>
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
