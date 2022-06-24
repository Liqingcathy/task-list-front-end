/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';
import { useState } from 'react';

const defaultTask = {title:'', description:'', IsComplete:false};

const TaskForm = (props) => {
  const [tasks, setTasks] = useState(defaultTask);

  //take whatever data user typed/chose and show on frontend
  //onChange <-> event value changed...
  const handleFromInput = (event) => {
    const domNode = event.target;
    const name = domNode.name;
    const value = domNode.value;
    // document.getElementById('complete').value ? true : false;
    // console.log(name);
    // console.log(value);

    //create and update tasks after getting user inputs
    const newTasks = {...tasks};
    newTasks[name] = value;
    setTasks(newTasks);

  };


  //passed down func to react after submission
  const handleFormSubmission = (event) => {
    event.preventDefault();
    props.handleFormSubmission(tasks);
  };


  return (
    <form onSubmit={handleFormSubmission}>
      <label>Title</label><input name='title' type='text' value={tasks.title} onChange={handleFromInput}/>
      <label>Description</label><input name='description' 
      type='text'  value={tasks.description} onChange={handleFromInput}/>
      
      {/* <label>Completed</label><input id='complete' name='iscomplete' type='checkbox' 
       onChange={handleFromInput} />
      <label>Not Completed</label>
      <input id='incomplete' name='iscomplete' type='checkbox' 
     onChange={handleFromInput} /><br/>  */}

      <input className = 'btn' type='submit' value='Create' />
    </form>
  );
};

TaskForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
  // updatedComplete: PropTypes.func.isRequired,
};

export default TaskForm;


