import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask';
import ListTask from './components/ListTask';
import  { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([]);
console.log("tasks",tasks);



useEffect(() => {
setTasks(JSON.parse(localStorage.getItem("tasks")))
}, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
   <div className='text-white text-lg '>Task Management App with Drag-and-Drop.</div>
      </div>
      </div>
      
      

      

      
</nav>















      
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center  pt-32 gap-16">
     <CreateTask  tasks={tasks} setTasks={setTasks}/>
     <ListTask  tasks={tasks} setTasks={setTasks}/>
    
 </div>
 </DndProvider>
  )
}

export default App;

