import React, { useState } from "react";
import "./App.css";

const data = {
  winnie: [
    {
      task: "Learn redux and react",
      id: 1
    },
    {
      task: "Learn graphql",
      id: 2
    }
  ],
  bob: [
    {
      task: "Get married",
      id: 3
    },
    {
      task: "Have a son",
      id: 4
    }
  ],

  thomas: [
    {
      task: "Meet sweetheart",
      id: 5
    },
    {
      task: "Finish POC",
      id: 6
    }
  ],

  george: [
    {
      task: "Love more",
      id: 7
    },
    {
      task: "Eat less",
      id: 8
    }
  ]
};

const App = () => {
  const [tasks, setTasks] = useState(data);

  const getDataAttribute = (columnName, position) => {
    if (columnName === "winnie") {
      return "bob";
    } else if (columnName === "bob") {
      if (position === "right") return "thomas";
      if (position === "left") return "winnie";
    } else if (columnName === "thomas") {
      if (position === "right") return "george";
      if (position === "left") return "bob";
    } else {
      return "thomas";
    }
  };

  const newId = () => {
    let numberOfTasks = 0;
    for (let user in tasks) {
      numberOfTasks += tasks[user].length;
    }

    return numberOfTasks + 1;
  };

  const handleMoveTask = e => {
    let taskId;
    let moveToUser;
    let moveFromUser;

    if (e.target.dataset.pointTo) {
      taskId = e.target.parentElement.dataset.taskId;
      moveToUser = e.target.dataset.pointTo;
      moveFromUser = e.target.dataset.from;
    } else {
      return;
    }

    console.log(taskId, moveToUser, moveFromUser);

    const taskToMove = tasks[moveFromUser].filter(
      task => task.id === parseInt(taskId)
    )[0];

    const tasksToLeave = tasks[moveFromUser].filter(
      task => task.id !== parseInt(taskId)
    );

    const newData = {
      ...tasks,
      [moveFromUser]: tasksToLeave,
      [moveToUser]: [...tasks[moveToUser], taskToMove]
    };

    setTasks(newData);
  };

  const displayTasks = (columnName, tasks) => {
    return tasks[columnName].map(task => {
      return (
        <div
          className="task"
          data-task-id={task.id.toString()}
          key={task.id}
          onClick={handleMoveTask}
        >
          <div
            className="task__icon"
            data-point-to={getDataAttribute(columnName, "left")}
            data-from={columnName}
          >
            {columnName !== "winnie" && "<"}
          </div>
          <div className="task__content">{task.task}</div>
          <div
            className="task__icon"
            data-point-to={getDataAttribute(columnName, "right")}
            data-from={columnName}
          >
            {columnName !== "george" && ">"}
          </div>
        </div>
      );
    });
  };

  const handleAddTask = e => {
    const newTask = window.prompt("Enter your task");

    if (newTask) {
      const columnId = e.target.dataset.columnId;
      tasks[columnId].push({ task: newTask, id: newId() });

      const newUserTask = tasks[columnId];
      const newTasks = { ...tasks, [columnId]: newUserTask };

      setTasks(newTasks);
    } else {
      alert("You entered no task");
    }
  };
  return (
    <div className="container">
      <div className="column">
        <div className="column__header column__header--winnie">Winnie</div>
        {displayTasks("winnie", tasks)}
        <button
          data-column-id={"winnie"}
          onClick={handleAddTask}
          className="button  button--winnie"
        >
          Add Task
        </button>
      </div>
      <div className="column">
        <div className="column__header column__header--bob">Bob</div>
        {displayTasks("bob", tasks)}
        <button
          data-column-id={"bob"}
          onClick={handleAddTask}
          className="button  button--bob"
        >
          Add Task
        </button>
      </div>
      <div className="column">
        <div className="column__header column__header--thomas">Thomas</div>
        {displayTasks("thomas", tasks)}
        <button
          data-column-id={"thomas"}
          onClick={handleAddTask}
          className="button  button--thomas"
        >
          Add Task
        </button>
      </div>
      <div className="column">
        <div className="column__header column__header--george">George</div>
        {displayTasks("george", tasks)}
        <button
          data-column-id={"george"}
          onClick={handleAddTask}
          className="button  button--george"
        >
          Add task
        </button>
      </div>
    </div>
  );
};

export default App;
