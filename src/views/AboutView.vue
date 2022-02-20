<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>Hi {{ name }}</h2>
    <p>Counter: {{ counter }}</p>
    <p><button @click="increase">increase</button></p>
    <!-- items -->
    <div class="items" v-if="items?.length">
      <ul>
        <li v-for="(item, index) in items" :key="'item-' + index">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <p><button @click="addItem">add item</button></p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

const counterStore = useCounterStore();
const { counter, name, hasChanged } = storeToRefs(counterStore);
const items = counterStore.items;

function increase() {
  counterStore.counter++;
  // OR -
  // counter.value++;
}
function addItem() {
  // one way to add item - directly
  // counterStore.items.push({ id: 1, title: "new title" });
  // OR -
  // another way to add item - using $patch
  // ** usually when we want to update more than one state property in one time **
  counterStore.$patch((state) => {
    state.items.push({
      id: state.items?.length ? state.items.length + 1 : 1,
      title: "new title",
    });
    state.hasChanged = true;
  });
}
</script>

<style>
.items {
  margin-top: 1rem;
  border: 1px gray solid;
  padding: 1rem;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /* display: flex;
    align-items: center; */
  }
}
</style>
