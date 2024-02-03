import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ModalTask from "./ModalTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import { TaskContext } from "../contexts/TaskContexts.js";
export default function TaskBoard() {
  const { state:taskList, dispatch } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToUpDate, setTaskToUpdate] = useState(null);
  function handlTaskAddEdit(newtask, isadd) {
    if (isadd) {
      dispatch({ type: 'ADD_TASK', payload: newtask });
    toast.success("Task added successfully!");
    } else {
      dispatch({ type: 'EDIT_TASK', payload: newtask });
      toast.success("Task edited successfully!");
    }
    setIsModalOpen(false);
    setTaskToUpdate(null);
  }
  const handleModalClose = () => {
    setIsModalOpen(false);
    setTaskToUpdate(null);
  };
  function handleEDITtask(task) {
    setTaskToUpdate(task);
    setIsModalOpen(true);
  }
  function handleDeletTask(taskId) {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDeletion) {
      dispatch({ type: 'DELETE_TASK', payload: taskId });
      toast.success("Task deleted successfully!");
    }
  }

  function handleTaskFavourite(taskId) {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: taskId });
    toast.success("Task added favourte list !");
  }
  function handleDeletAllTask() {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete all tasks?"
    );
    if (confirmDeletion) {
      dispatch({ type: 'DELETE_ALL_TASKS' });
      toast.success("All tasks deleted successfully!");
    }
  }

  function handleTaskSearch(searchTerm) {
    if (searchTerm === "") {
      dispatch({ type: 'RESET_TASKS' });
    } else {
      dispatch({ type: 'SEARCH_TASK', payload: searchTerm });
    }
  }
  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {isModalOpen && (
          <ModalTask
            taskToUPdate={taskToUpDate}
            onADDEDIT={handlTaskAddEdit}
            onTaskModalClose={handleModalClose}
          />
        )}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onSearchTask={handleTaskSearch}
            OndeleteAllTask={handleDeletAllTask}
            onModalOpen={() => setIsModalOpen(true)}
          />
          <div className="overflow-auto">
            <TaskList
              onTaskFavourite={handleTaskFavourite}
              onDeletTask={handleDeletTask}
              onEditTask={handleEDITtask}
              tasks={taskList}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
