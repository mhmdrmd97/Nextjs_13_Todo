Migrating from 12 to 13

1)go to next.config.js
    //to use the new experimental features
    1.1)under reactStrictMode:true,
    type-->   experimental:{  appDir:true  } 
   
    //restart server(u should see this message:warn  - You have enabled experimental feature (appDir) in next.config.js.)
    1.2)npm run dev
    
    //your next.config.js should look like this
    1.3)
    /** @type {import('next').NextConfig} */
                    module.exports = {
                      reactStrictMode: true,
                      experimental:{ appDir:true } 
                    }


2)go to tailwind.config.js
    //modify content to include the new app directory
    2.1)in content array above './pages/**/*.{js,ts,jsx,tsx}',
    type--> './app/**/*.{js,ts,jsx,tsx}',
    
    //your tailwind.config.js should look like this
    2.2)
        /** @type {import('tailwindcss').Config} */
                        module.exports = {
                          content: [
                            './pages/**/*.{js,ts,jsx,tsx}',
                            './components/**/*.{js,ts,jsx,tsx}',
                            './app/**/*.{js,ts,jsx,tsx}',
                          ],
                          theme: {
                            extend: {},
                          },
                          plugins: [],
                        }

3)u cannot name your files inside app folder like below reserved keywords:
    3.1)-layout.js
        - page.js 
        - loading.js 
        - Error.js
        - Template.js 
        - Head.js 
        - notFound.js

4)      //create app folder(the root of your application starts)
        4.1)in cmd type--> cd yourProject
             type--> mkdir app
    
        //create the main page in the app folder
        4.2)in cmd type--> type nul> page.tsx

        //initialize component by rfce snippet in page.tsx
        4.3.1)in page.tsx type--> rfce
        //instead of Page replace it by Home
        4.3.2)in page.tsx inside div type--> I am homepage
       //your folder structure should look like this
       4.3.3).                           ..              ...
            .next
            .vscode
            .gitIgnore
             nodemodules
             pages
             styles
             app------------------>     page.tsx
             package.json
             package-lock.json
             postcss.config.js
             README.md
             tailwind.config.js
             tsconfig.js
             next.config.js

       
        //your app/page.tsx should look like this
        4.3.3.2)
                import React from 'react'

                         function Home() {
                           return (
                             <div>i am Home</div>
                           )
                         }

                         export default Home

//this error will appear to u 
    error - Conflicting app and page file was found, please remove the conflicting files to continue:
    error -   "pages\index.tsx" - "app\page.tsx"
5)that is becouse u have 2 files pointing to the entry point wich they are
    (app/page.tsx - pages/index.tsx)

    //delete the index.tsx in page folder
    5.1) go to page folder --> right click on index.tsx --then--> delete
    //now when u restart the server it will automatically genrate 2files for u in app folder wich they are (layout.tsx - head.tsx)
    5.2.1)close server in terminal cntrl+c then npm run dev
    //your folder structure will b like this
    5.2.2).                           ..              ...
            .next
            .vscode
            .gitIgnore
             nodemodules
             pages---------------->   _app.tsx
                                      api
             styles
             app------------------>   page.tsx
                                      layout.tsx
                                      head.tsx
             package.json
             package-lock.json
             postcss.config.js
             README.md
             tailwind.config.js
             tsconfig.js
             next.config.js

    5.3) //the app/layout is like this
        export default function RootLayout({children,}: {children: React.ReactNode }){  
return (
         <html>
           <head />
           <body>{children}</body>
         </html>
        )
    }

    5.3.1)//the children in the app/layout.js are the page.tsx it is like below but in folder management
        <Layout>
        <Page />
        </Layout>

    //including css and tailwind in the layout 
    5.3.2)go to app/layout.tsx at the top type --> import '../styles/globals.css';

6)//making header componenent and including it in the layout
    6.1)simply create header component beside page.tsx name it Header.tsx your folder structure will b like this
            .                           ..              ...
            .next
            .vscode
            .gitIgnore
             nodemodules
             pages---------------->   _app.tsx
                                      api
             styles
             app------------------>   page.tsx
                                      layout.tsx
                                      head.tsx
                                      Header.tsx
             package.json
             package-lock.json
             postcss.config.js
             README.md
             tailwind.config.js
             tsconfig.js
             next.config.js
    6.2)//inside Header.tsx type-->
        
        import React from 'react'
        function Header() {
  return (
<div className='bg-blue-600'>Header</div>
      )
    }
    export default Header


    6.3) // include this Header in app/layout.tsx like below
        
import '../styles/globals.css'
import Header from './Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
      <Header />
      {children}
      </body>
    </html>
  )
}


7)//rendering another page called todos(u can call it whatever u want)
    7.1)create folder named todos inside app/ --> right click on the app folder --then--> create new folder todos
    7.2)create file named page.tsx inside app/todos/ --> right click on the todos folder --then--> create new file todos.tsx
    7.3.1)//your folder structure will b like this
          .                           ..                      ...
            .next
            .vscode
            .gitIgnore
             nodemodules
             pages---------------->   _app.tsx
                                      api
             styles
             app------------------>   page.tsx
                                      layout.tsx
                                      head.tsx
                                      Header.tsx
                                      todos----------------> page.tsx
             package.json
             package-lock.json
             postcss.config.js
             README.md
             tailwind.config.js
             tsconfig.js
             next.config.js
    7.3.2)inside todos/page.tsx type---->
    
import React from 'react'

function Todos() {
  return (
    <div>this is Todos</div>
  )
}

export default Todos

    7.4) go to localhost:3000/todos and u will see the same page but with this is todos

8)// the Link tag is pure now so instead this <Link href="/"> <a>go to home</a> </Link>
                                  write  this <Link href="/">go to home</Link>

9)//each component created inside the app folder is  a server component

10)//for type script in the root folder create typings.d.ts file  and put this in it so that u know 
    what api is u recieving
 
    export type Todo = {
    userId: number;
    id: number;
    title:string;
    completed:boolean;
}

    10.1)//u dont need useeffect anymore coz your serversiderendering, the serverComponent (todosList) will should look like this:

import Link from 'next/link';
import React from 'react'
import { Todo } from '../../typing';

const fetchTodos = async ()=>{
const res = await fetch("https://jsonplaceholder.typicode.com/todos");
const todos:Todo[] = await res.json();
console.log("this is todos",todos);
return todos;
}

async function TodosList() {
    const todos = await fetchTodos();
  return (
    <>
    {todos.map((todo)=>(
        <p key={todo.id}>
            <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
    ))}
    </>
  )
}

export default TodosList

    10.2)//your todos/page.tsx should look like this
    
import React from 'react'
import TodosList from './TodosList'

function Todos() {
  return (
    <div>
      {/* @ts-ignore */}
      <TodosList />
    </div>
  )
}

export default Todos

    10.3)nextjs will blow up the console , then u have to make dynamic page for these todos like below structure

                .                           ..              ...
            .next
            .vscode
            .gitIgnore
             nodemodules
             pages---------------->   _app.tsx
                                      api
             styles
             app------------------>   page.tsx
                                      layout.tsx
                                      head.tsx
                                      Header.tsx
                                      todos------------>    page.tsx
                                                            TodoList.tsx
                                                            [todoId]----------------->  page.tsx
             package.json
             package-lock.json
             postcss.config.js
             README.md
             tailwind.config.js
             tsconfig.js
             next.config.js

        10.4)//your [todoId]/page.tsx should look like this
            
import Link from 'next/link';
import React from 'react'
import { Todo } from '../../../typing';

type PageProps = {
    params:{
        todoId: string
    }
}


const fetchTodos = async (id: string)=>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
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

11)to use client components just type on top ----> "use client"