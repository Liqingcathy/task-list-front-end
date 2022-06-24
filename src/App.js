import React from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import TaskForm from './components/TaskForm.js';
import './App.css';
import { useEffect, useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];


const App = () => {
  //Wave2 code const [tasks, setComplete] = useState(TASKS);
  //const [tasks, setTasks] = useState([]); //start from an empty list of tasks
  const [tasks, setTasks] = useState(TASKS);

  //Wave3: In the App, use the useEffect hook to make an API call 
  // to get the list of tasks from the database when the React app is loaded.
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
        .then((response) => {
          setTasks(response.data);})
        .catch((error) => {
          console.log(error, 'error occured while fetching tasks');});
    
  }, []); //load one time
  
  //Wave3: Update the toggleCompleteTask callback function (the function that toggles the state of completion; 
  // you may have named it something different) in the App such that marking a task complete or 
  // incomplete in the front end makes a change to the state of the task in the database.
  const updatedComplete = (id) => {
    console.log('inside update completed');
    const changedTasks = [...tasks];
    let targetTask;
    for (let t of changedTasks){
      console.log(t);
      if (t.id === id){
          targetTask  = t;
          targetTask.isComplete = !targetTask.isComplete;
          // t.isComplete = !t.isComplete;
      }
    }
    //patch call updates the request data in database
    axios.patch(`http://localhost:5000/tasks/${targetTask.id}/mark_complete`)
        .then((response) => { 
          console.log(response.data); //patch doesn't have response body
          //setComplete(response.data)})
          setTasks(changedTasks);})//update state from origin to copied ones
          .catch((error) => {
            console.log(error);
          });
        };
  
  //Wave3: Update the deleteTask callback function (the function that deletes a task; 
  // you may have named it something different) in the App such that deleting a 
  // task in the front end deletes the task from the database.
  const deleteTask = (id) => {
    console.log('inside delete task');
    axios.delete(`http://localhost:5000/tasks/${id}`)
        .then((response) => {
          //create a new array that filters unmatching id to delete it
          const newTasks = tasks.filter((task) => task.id !== id);
          setTasks(newTasks);
        })
        .catch((error) => {
          console.log(error);
          console.log('not able to delete the task!');
        });
  };

  //create new tasks as forms are filled with data
    const createNewTasks = (data) => { //data coming from?
      console.log('inside createNewTasks');
      console.log(data);
      //1. got user input form and take data to database
      axios.post('http://localhost:5000/tasks', data)
          .then((response) => {
            console.log(response.status);
            //2. fetch all tasks from db and display in frontend(refresh page)
            axios.get('http://localhost:5000/tasks')
                .then((response) => { setTasks(response.data);})//update tasks with all data got
                .catch((error) => {console.log(error);});
          })
          .catch((error) => {
            console.log(error);
          });
    };
    return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div className='task_form'>{<TaskForm handleFormSubmission={createNewTasks}/>}</div>
        <div>{<TaskList tasks={tasks} updatedComplete={updatedComplete} deleteTask={deleteTask}/>}</div>
      </main>
    </div>
  );
};

export default App;
