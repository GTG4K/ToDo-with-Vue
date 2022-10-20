import { createApp } from "vue";
import App from "./App.vue";
import ToDo from "./components/ToDo.vue";

const app = createApp(App);

app.component("to-do", ToDo);

app.mount("#app");
