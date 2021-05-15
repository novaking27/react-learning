import './App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useEffect, useState } from 'react';
import { db } from './firebase_config';
import firebase from "firebase";
import TodoListItem from './Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, settodoInput]= useState("");

  useEffect(() => {
    getTodo();
  }, []) // blank run only on first launch

  //this will get me the todo from the database
  function getTodo(){
    db.collection("todos").onSnapshot(function(querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    })

  }
// this will add your todo to the database
  function addTodo(e) {
    e.preventDefault();

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });
    //will clear the todo textfield
    settodoInput("");
  }

  return (
    <div className="App"  >
     <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width:"100%"}} >
     <h1>My Todo App 🚀</h1>
     <form>
      <TextField 
        id="standard-basic" 
        label="Add To Your Todo List"
        value={todoInput}
        onChange={(e) =>  settodoInput(e.target.value)}/>
        <Button type="submit" variant="contained" onClick={addTodo} style={{display: "none"}}>
          Default
        </Button>
     </form>
      <div>
        {todos.map((todo) =>(
          <TodoListItem todo={todo.todo} inprogress={todo.inprogress} id={todo.id}/>
        ))}
      </div>
     </div>
    </div>
  );
}

export default App;
