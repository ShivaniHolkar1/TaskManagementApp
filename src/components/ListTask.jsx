



import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';


const ListTask = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter(task => task.status === "todo");
        const fInProgress = tasks.filter(task => task.status === "inprogress");
        const fClosed = tasks.filter(task => task.status === "closed");

        setTodos(fTodos);
        setInProgress(fInProgress);
        setClosed(fClosed);
    }, [tasks]);

    const statuses = ["todo", "inprogress", "closed"];

    return (
        <div className='flex gap-16'>
            {statuses.map((status, index) => (
                <Section
                    key={index}
                    status={status}
                    tasks={tasks}
                    setTasks={setTasks}
                    todos={todos}
                    inProgress={inProgress}
                    closed={closed}
                />
            ))}
        </div>
    );
};

export default ListTask;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop :(item)=> addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

    let text = "Added";
    let bg = "bg-slate-500";
    let tasksToMap = todos;

    if (status === 'inprogress') {
        text = "Started";
        bg = "bg-pink-500";
        tasksToMap = inProgress;
    }

    if (status === 'closed') {
        text = "Completed";
        bg = "bg-green-500";
        tasksToMap = closed;
    }

   



    const addItemToSection = (id) => {
       
    
        setTasks(prev => {
            const updatedTasks = prev.map(task => {
                if (task.id === id) {
                    
                    return { ...task, status: status };
                }
                return task;
            });

            localStorage.setItem("tasks",JSON.stringify(updatedTasks))
            toast("Task status changed",)
            return updatedTasks;
        });
    };
    
    return (
        <div ref={drop}className={`w-64 rounded-md p-2 ${isOver?"bg-slate-200":""}` }>
            <Header text={text} bg={bg} count={tasksToMap.length} />
            {tasksToMap.length>0 && tasksToMap.map(task=><Task key={task.id} tasks={tasks} task={task} setTasks={setTasks}/>)}
            
        </div>
    );
};

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12  pl-4 rounded-md uppercase text-sm text-white `}>
            {text}
            <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex item-center justify-center'>{count}</div>
        </div>
    );
};




const Task = ({ task ,tasks,setTasks}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item :{id:task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))



      console.log(isDragging)


    const handleRemove = (id)=>{

        const fTasks =  tasks.filter(t => t.id !== id)
        localStorage.setItem("tasks",JSON.stringify(fTasks));
        setTasks(fTasks);


        toast("Task removed successfully")
        

    }



    return (


<div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md 
        ${isDragging ? "opacity-25" : "opacity-100"} 
        cursor-grab`}>
    <p>{task.name}</p>
    <button
        className='absolute top-2 right-2 text-slate-400'
        onClick={() => handleRemove(task.id)}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 18 12-12M6 6l12 12"
            />
        </svg>
    </button>
</div>

    );
};
