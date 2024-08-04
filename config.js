import{
    collection,
    addDoc,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  const form = document.querySelector("#form");
  const todo = document.querySelector("#todo");
  const ul = document.querySelector("#ul");
  const db = document.querySelector("#db")
  
  const arr = [];
  
  async function getData() {
    const querySnapshot = await getDocs(collection("todos"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      arr.push(doc.data());
    });
    console.log(arr);
    renderTodo();
  }
  
  
  
  function renderTodo() {
    ul.innerHTML = "";
    if (arr.length === 0) {
      ul.innerHTML = "no data found";
      return;
    }
    arr.map((item) => {
      ul.innerHTML += `
          <li>${item.todo}</li>
          `;
    });
  }
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    arr.push({
      todo: todo.value,
    });
    renderTodo();
    try {
      const docRef = await addDoc(collection("todos"), {
        todo: todo.value,
      });
      todo.value = "";
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    

    }
  });