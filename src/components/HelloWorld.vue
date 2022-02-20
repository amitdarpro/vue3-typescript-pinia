<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";
import { watch, watchEffect } from "vue";

defineProps<{
  msg: string;
}>();

const counterStore = useCounterStore();
const { counter, doubleCountPlusOne } = storeToRefs(counterStore);
const items = counterStore.items;

// subscribe to change in state
counterStore.$subscribe((mutation, state) => {
  console.log("subscribe >> mutation=", mutation);
  console.log("subscribe >> state=", state);
});

watch(counter, (newVal) => {
  console.log("--watch >> counter=", newVal);
});

watch(items, (newVal) => {
  console.log("--watch >> items[0]=", newVal[0]);
});

// watchEffect(() => console.log("--watchEffect >> counter=", counter.value));
watchEffect(() => console.log("--watchEffect >> item=", items));
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div class="info">
      <p>Counter: {{ counter }}</p>
      <p>Double Counter Plus One: {{ doubleCountPlusOne }}</p>
      <p>Items Length: {{ items.length }}</p>
      <!-- <p>Changed: {{ hasChanged }}</p> -->
    </div>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://v3.vuejs.org/">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.info {
  margin: 0.5rem 0;
  padding: 1rem;
  border: 1px gray solid;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
