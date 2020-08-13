import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

function TodosComponent() {
  const firestore = useFirestore();
  useFirestoreConnect('todos');

  const [newTodoText, setNewTodoText] = useState('');

  const todos = useSelector((state) => state.firestore.ordered.todos);

  const addTodo = (todoText) => {
    // console.log(`addTodo at ${firestore.FieldValue.serverTimestamp()}`);

    firestore
      .collection('todos')
      .add({
        text: todoText,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // do nothing
      });
  };

  const deleteTodo = (todoId) => {
    firestore.delete({
      collection: 'todos',
      doc: todoId,
    });
  };

  return (
    <div>
      <h1>Todos with Firebase</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(newTodoText);
          setNewTodoText('');
        }}
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => {
            setNewTodoText(e.target.value);
          }}
        />
        <input type="submit" disabled={!newTodoText} value="Add Todo" />
      </form>

      {todos
        ? todos.map((todo) => (
            <div key={todo.id}>
              <p>{todo.text}</p>
              <button
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        : 'Loading'}
    </div>
  );
}

export default TodosComponent;
