import Link from 'next/link';
import React from 'react'
import { Todo } from '../../../typing';

type PageProps = {
    params:{
        todoId: string
    }
}


const fetchTodos = async (id: string)=>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{next:{revalidate:60}});
    const todo:Todo = await res.json();
    console.log("this is todos",todo);
    return todo;
    }
    
    async function TodoPage({params: {todoId}}:PageProps) {
        const todo = await fetchTodos(todoId);
      return (
        <>
            <div>
                <p>TodoId: {todo.id}</p>
            </div>
            <div>
                <p>TodoUserId: {todo.userId}</p>
            </div>
            <div>
                <p>TodoTitle: {todo.title}</p>
            </div>
            <div>
                <p>TodoIsCompleted?: {(todo.completed).toString()}</p>
            </div>
        </>
      )
    }
    
export default TodoPage

export async function generateStaticParamas(){
    const res =await fetch("https://jsonplaceholder.typicode.com/todos")
    const todos: Todo[] = await res.json();



    return todos.map((todo)=>(
        {
            todoId: (todo.id).toString()
        }
    ));

}