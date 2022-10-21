<template>
  <li class="todo-list-item">
    <div class="list-item-left">
      <div class="checkbox" v-on:click="toggleCompleted">
        <div class="checkbox-border" :class="completedClass"></div>
        <label for="" :class="completedClass"></label>
        <input type="checkbox" />
      </div>
      <p :class="completedClass">{{ text }}</p>
    </div>
    <i v-on:click="deleteTodo" class="fas fa-times"></i>
  </li>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["id", "text", "completed"],
  methods: {
    toggleCompleted() {
      this.$emit("toggle-completed", this.id);
    },
    deleteTodo() {
      this.$emit("delete-todo", this.id);
    },
  },
  computed: {
    completedClass() {
      return {
        completed: this.completed === true,
      };
    },
  },
};
</script>

<style>
.list-item-left {
  display: flex;
  align-items: center;
}

.todo-list-item {
  width: 100%;
  height: 3.5rem;
  background-color: hsl(235, 24%, 19%);

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid hsl(233, 14%, 35%);
  overflow: hidden;
  cursor: pointer;
}

.light .todo-list-item:hover {
  background-color: hsl(0, 0%, 89%);
}

.light .todo-list-item {
  background-color: hsl(0, 0%, 98%);
}

.todo-list-item:hover {
  background-color: hsl(237, 21%, 21%);
}

.todo-list-item:first-child {
  border-radius: 6px 6px 0 0;
}

.todo-list-item p {
  color: hsl(234, 39%, 85%);
}
.todo-list-item p.completed {
  text-decoration-line: line-through;
  color: hsl(233, 14%, 35%);
}

.light .todo-list-item p {
  color: hsl(235, 19%, 35%);
}

.todo-list-item i {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  color: hsl(233, 14%, 35%);
  border-radius: 5px 0 0 5px;
  transition: all 0.3s ease-in-out;
}

.todo-list-item i:hover {
  color: hsl(234, 39%, 85%);
  background-color: hsl(236, 24%, 28%);
  border-radius: 16px 0 0 16px;
  transition: all 0.3s ease-in-out;
}
</style>
