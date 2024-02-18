import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])


  useEffect(() => {
    const todosString =  localStorage.getItem("todos")
    if (todosString) {
      let todos = JSON.parse(todosString)
      setTodos(todos)
    }
  }, [])
  

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const SaveTOLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo }])
    setTodo("")
    SaveTOLS();

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    SaveTOLS();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    SaveTOLS();
  }



  return (
    <>
      <div className="container mx-auto bg-violet-300 rounded-xl w-1/2 m-5 p-2">
        <div className='font-bold text-2xl m-2'>
          ADD A TO-DO
        </div>
        <div className="container py-2 flex flex-col">
          <input className='rounded-md m-2' type="text" onChange={handleChange} value={todo} />
          <button className='bg-violet-700 rounded-md p-1 m-2 hover:bg-violet-900 cursor-pointer text-white disabled:bg-violet-800' onClick={handleSave} disabled={todo.length<3} >Save</button>
        </div>
        <div className="todos">
          <div className='font-bold text-lg m-2'>
            Your TODOs
          </div>
          {todos.length === 0 && <div className='text-xl m-2'>No TO-DOs to display</div>}
          {todos.map(item => {
            return <div className="todos container flex justify-start " key={item.id}>
              <div className='container p-1 w-2/3 text-xl m-2'>
              &rarr; {item.todo}
              </div>
              <div className='flex h-full'>
                <button className='bg-violet-700 rounded-md p-1 m-2 hover:bg-violet-900 cursor-pointer text-white' onClick={(e) => { handleEdit(e, item.id) }}>Edit</button>
                <button className='bg-violet-700 rounded-md p-1 m-2 hover:bg-violet-900 cursor-pointer text-white' onClick={(e) => { handleDelete(e, item.id) }}>Delete</button>
              </div>
            </div>

          })}

        </div>

      </div>
    </>
  )
}

export default App
