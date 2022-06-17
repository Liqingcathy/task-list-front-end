import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

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
  const [tasks, setComplete] = useState(TASKS);
  //update complete 
const updatedComplete = (id) => {
  console.log('inside update completed');
  const changedTasks = [...tasks];
  for (let t of changedTasks){
    if (t.id === id){
      t.isComplete = !t.isComplete;
    }
  }
  setComplete(changedTasks);
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={TASKS} updatedComplete={updatedComplete}/>}</div>
      </main>
    </div>
  );
};

export default App;
