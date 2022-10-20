<template>
  <li class="todo-list-item" v-on:click="toggleCompleted">
    <div class="checkbox">
      <div class="checkbox-border" :class="completedClass"></div>
      <label for="" :class="completedClass"></label>
      <input type="checkbox" />
    </div>
    <p :class="completedClass">{{ text }}</p>
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
