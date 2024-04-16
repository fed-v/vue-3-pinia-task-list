<template>
  <main>

    <!-- heading-->
    <header>
      <img src="./assets/logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form 
    <div class="new-task-form">
      <TaskForm />
    </div>-->

    <!-- filter -->
    <nav class="filter">
      <div>

        <!-- $reset() is a built-in method you can call to reset the state to its initial value -->
        <button @click="taskStore.$reset">Delete list</button>
        <button @click="taskStore.getTasks">Load tasks</button>

      </div>
      <div>
        <button @click="filter = 'all'">All tasks</button>
        <button @click="filter = 'favs'">Fav tasks</button>
      </div>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">
      <h4>Loading...</h4>
    </div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount === 0 ? 'no' : totalCount }} {{ totalCount === 1 ? 'task' : 'tasks' }} left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- favorites list -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount === 0 ? 'no' : favCount }} favorite {{ favCount === 1 ? 'task' : 'tasks' }} left to do</p>

      <!-- Iterate through the task array and print the details for each -->
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>

    </div>

    <div class="add-new-section">
      <button class="add-btn" @click="openModal">Add task</button>
    </div>

    <ModalComponent :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">

      <template #header>
        <h2>Add a new task</h2>
      </template>

      <template #content>
        <div>
          <TaskForm @modal-close="closeModal"/>
        </div>
      </template>
        
    </ModalComponent>
    

  </main>
</template>

<script setup>
  import { ref } from 'vue';
	import TaskDetails from './components/TaskDetails.vue';
  import TaskForm from './components/TaskForm.vue';
  import { useTaskStore } from './stores/TaskStore';
  import { storeToRefs } from 'pinia';
  import ModalComponent from "./components/ModalComponent.vue";



  // Reference the store and save it
  const taskStore = useTaskStore();

  // Creates a reference to your state and getters of the store. NOT YOUR ACTIONS!
  // That way, you don't have to do taskStore.favs in the template. Just call favs which is the reference to it!
  const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore);

  // Call the getTasks() action to populate the tasks
  taskStore.getTasks();

  // Create a filter variable and make it dynamic. Initial value is 'all'
  const filter = ref('all');


  const isModalOpened = ref(false);

  const openModal = () => {
    isModalOpened.value = true;
  };
  const closeModal = () => {
    isModalOpened.value = false;
  };

  const submitHandler = ()=>{
    //here you do whatever
  }

</script>
 