<template>
  <img
    v-if="windowWidth > 500 && theme === 'dark'"
    src="./assets/images/bg-desktop-dark.jpg"
    alt=""
  />
  <img
    v-if="windowWidth <= 500 && theme === 'dark'"
    src="./assets/images/bg-mobile-dark.jpg"
    alt=""
  />
  <img
    v-if="windowWidth > 500 && theme === 'light'"
    src="./assets/images/bg-desktop-light.jpg"
    alt=""
  />
  <img
    v-if="windowWidth <= 500 && theme === 'light'"
    src="./assets/images/bg-mobile-light.jpg"
    alt=""
  />

  <main id="Todo" :class="{ light: theme === 'light' }">
    <header>
      <h1>TODO</h1>
      <i
        v-on:click="toggleTheme"
        v-if="theme === 'dark'"
        class="fas fa-sun"
      ></i>
      <i
        v-on:click="toggleTheme"
        v-if="theme === 'light'"
        class="fas fa-moon"
      ></i>
    </header>

    <div class="input-bot">
      <div class="checkbox">
        <div class="checkbox-border"></div>
        <label for="" class=""></label>
        <input type="checkbox" v-on:click="done" />
      </div>
      <input
        type="text"
        placeholder="Create a new todo.."
        v-on:keyup.enter="todoPush"
        v-model="todoInput"
        :class="todoInputClass"
      />
    </div>

    <div>
      <ul>
        <to-do
          v-for="todo in todoList"
          v-bind:key="todo"
          v-bind:text="todo.text"
          v-bind:id="todo.id"
          v-bind:completed="todo.completed"
          v-on:toggle-completed="toggleCompleted"
          v-on:delete-todo="deleteTodo"
        ></to-do>
      </ul>
      <div
        class="footer-li"
        :style="
          todoList.length === 0
            ? { 'border-radius': '6px 6px 6px 6px' }
            : { 'border-radius': '0px 0px 6px 6px' }
        "
      >
        <span v-if="todoList.length === 0">no tasks</span>
        <span v-else-if="todoList.length === 1"> 1 task</span>
        <span v-else> {{ todoList.length }} Tasks </span>
        <ul v-if="windowWidth > 500" class="todo-actions">
          <li
            :class="{ selected: display === 'all' }"
            v-on:click="switchDisplay('all')"
          >
            All
          </li>
          <li
            :class="{ selected: display === 'active' }"
            v-on:click="switchDisplay('active')"
          >
            Active
          </li>
          <li
            :class="{ selected: display === 'completed' }"
            v-on:click="switchDisplay('completed')"
          >
            Completed
          </li>
        </ul>
        <span v-on:click="clearCompleted" class="clear-completed"
          >Clear Completed</span
        >
      </div>
      <div v-if="windowWidth <= 500" class="footer-li-mobile">
        <ul class="todo-actions-mobile">
          <li
            :class="{ selected: display === 'all' }"
            v-on:click="switchDisplay('all')"
          >
            All
          </li>
          <li
            :class="{ selected: display === 'active' }"
            v-on:click="switchDisplay('active')"
          >
            Active
          </li>
          <li
            :class="{ selected: display === 'completed' }"
            v-on:click="switchDisplay('completed')"
          >
            Completed
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      lastID: 0,
      display: "all",
      todoInput: "",
      inputErrorAnimation: false,
      windowWidth: window.innerWidth,
      theme: "dark",
      todoList: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    nextID() {
      this.lastID++;
      return this.lastID;
    },
    toggleTheme() {
      this.theme === "dark" ? (this.theme = "light") : (this.theme = "dark");
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    todoPush() {
      if (this.todoInput.length > 0) {
        const newObject = {
          id: this.nextID(),
          text: this.todoInput,
          completed: false,
        };
        this.todoList.push(newObject);
        this.todoInput = "";
      } else {
        this.inputErrorAnimation = true;
        setTimeout(function () {
          this.inputErrorAnimation = false;
        }, 200);
      }
    },
    toggleCompleted(todoID) {
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id === todoID) {
          this.todoList[i].completed = !this.todoList[i].completed;
          break;
        }
      }
    },
    deleteTodo(todoID) {
      let index = 0;
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id === todoID) {
          this.todoList.splice(index, 1);
          break;
        }
        index++;
      }
    },
    clearCompleted() {
      let index = 0;
      for (let i = 0; i < this.todoList.length; i++) {
        for (let i = 0; i < this.todoList.length; i++) {
          if (this.todoList[i].completed === true) {
            this.todoList.splice(index, 1);
            break;
          }
          index++;
        }
        index = 0;
      }
    },
    switchDisplay(type) {
      this.display = type;
    },
  },
  computed: {
    todoInputClass() {
      return { inputErrorAnimation: this.inputErrorAnimation === true };
    },
  },
  watch: {
    theme() {
      this.theme === "dark"
        ? (document.querySelector("body").style.backgroundColor =
            "hsl(235, 21%, 11%)")
        : (document.querySelector("body").style.backgroundColor =
            "hsl(236, 33%, 92%)");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap");

* {
  font-size: 18px;
  font-family: "Josefin Sans", sans-serif;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

body {
  background-color: hsl(235, 21%, 11%);
}

img {
  position: fixed;
  top: 0;
  width: 100%;
  height: 275px;
  object-fit: cover;
  z-index: -1;
}

main {
  margin: 4rem auto;
  width: 650px;
}

header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding-bottom: 30px;
}

header > h1 {
  color: white;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 12px;
}

header > i {
  color: white;
  font-weight: 400;
  font-size: 2rem;
}

.input-bot {
  width: 100%;
  height: 3.5rem;
  background-color: hsl(235, 24%, 19%);
  border-radius: 6px;

  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.light .input-bot {
  background-color: hsl(0, 0%, 98%);
}

.input-bot > input[type="text"] {
  height: 80%;
  width: 90%;
  color: hsl(0, 0%, 98%);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: 0px;
  caret-color: hsl(220, 98%, 61%);
}

.light .input-bot > input[type="text"] {
  color: hsl(235, 19%, 35%);
}

.inputErrorAnimation {
  animation-name: inputEmpty;
  animation-duration: 0.2s;
}

@keyframes inputEmpty {
  33% {
    padding: 0 0 0 0;
  }
  66% {
    padding: 0 0 0 10px;
  }
  100% {
    padding: 0 10px 0 0;
  }
}

.checkbox {
  position: relative;
  margin: 0px 25px;
  cursor: pointer;
}

div.checkbox > .checkbox-border {
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  background-color: hsl(237, 14%, 26%);
  cursor: pointer;
}
div.checkbox > .checkbox-border.completed {
  background: linear-gradient(90deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  cursor: pointer;
}

div.checkbox:hover .checkbox-border {
  background: linear-gradient(90deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  cursor: pointer;
}

div.checkbox > label {
  position: absolute;
  width: 22px;
  height: 22px;
  background-color: hsl(235, 24%, 19%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.light div.checkbox > label {
  background-color: hsl(0, 0%, 98%);
}

div.checkbox > label.completed {
  background: linear-gradient(90deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  cursor: pointer;
}

.footer-li {
  width: 100%;
  height: 3.5rem;
  background-color: hsl(235, 24%, 19%);
  border-radius: 0 0 6px 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.light .footer-li {
  background-color: hsl(0, 0%, 98%);
}

.footer-li-mobile span,
.footer-li-mobile li {
  color: hsl(233, 14%, 35%);
  font-size: 16px;
}

.footer-li span,
.footer-li li {
  color: hsl(233, 14%, 35%);
  font-size: 16px;
}

input[type="checkbox"] {
  opacity: 0;
  cursor: pointer;
}

.footer-li-mobile {
  height: 3.2rem;

  background-color: hsl(235, 24%, 19%);
  border-radius: 6px 6px 6px 6px;
  margin: 25px 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.light .footer-li-mobile {
  background-color: hsl(0, 0%, 98%);
}

.todo-actions {
  display: flex;
  justify-content: space-evenly;
  width: 40%;
}

.todo-actions-mobile {
  display: flex;
  justify-content: space-evenly;
  width: 60%;
}

.todo-actions-mobile > li:hover,
.todo-actions > li:hover {
  color: hsl(234, 39%, 85%);
  cursor: pointer;
}

.light .todo-actions-mobile > li:hover,
.todo-actions > li:hover {
  color: hsl(225, 31%, 5%);
}

.todo-actions-mobile > li.selected,
.todo-actions > li.selected {
  color: hsl(220, 98%, 61%);
}

.light .clear-completed:hover {
  color: hsl(225, 31%, 5%);
}

.clear-completed:hover {
  color: hsl(234, 39%, 85%);
  cursor: pointer;
}

@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: yellow;
  }
}

@media only screen and (max-width: 700px) {
  main {
    width: 90%;
  }
}

@media only screen and (max-width: 500px) {
  img {
    height: 250px;
    object-fit: cover;
    z-index: -1;
  }
}

@media only screen and (max-width: 400px) {
  .todo-actions-mobile {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
}
</style>
