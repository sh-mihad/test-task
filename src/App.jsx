// Description: This file is the main file of the project. It contains the main structure of the project. It contains the header, hero, task board, and footer components. It also contains the toast container for the toast notification.
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/index.css";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import TaskBoard from "./TaskBoard.jsx/TaskBoard";
import { useReducer  } from "react";
import  { initialState , taskReducer } from "./TaskReducer/taskReducers";
import { TaskContext } from "./contexts/taskContexts";
function App() {
const [state , dispatch] = useReducer(taskReducer,initialState);
  return (
    <>
    <TaskContext.Provider value={{state , dispatch}}>
      <Header />
      <Hero />
      <TaskBoard />
      <Footer />
      <ToastContainer theme="dark" />
    </TaskContext.Provider>
    </>
  );
}

export default App;
