<template>

  <main>

    <!-- heading-->
    <header>
      <img src="./assets/logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <section class="main-container" aria-labelledby="tasks-heading">

      <!-- Add the tasks-heading here so it’s always present -->
      <h2 id="tasks-heading">
        {{ filter === 'favs' ? 'Favorite Tasks' : 'All Tasks' }}
      </h2>

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
      <div class="loading" v-if="loading" role="status" aria-label="Loading tasks">
        <h4>Loading...</h4>
      </div>

      <!-- task list -->
      <div class="task-list" v-if="filter === 'all'">
        <p>You have {{ totalCount === 0 ? 'no' : totalCount }} {{ totalCount === 1 ? 'task' : 'tasks' }} left to do</p>
        <div v-for="task in tasks" :key="task.id">
          <TaskDetails :task="task" v-motion :initial="initial" :enter="enter" :delay="300" />
        </div>
      </div>

      <!-- favorites list -->
      <div class="task-list" v-if="filter === 'favs'">
        <p>You have {{ favCount === 0 ? 'no' : favCount }} favorite {{ favCount === 1 ? 'task' : 'tasks' }} left to do</p>

        <!-- Iterate through the task array and print the details for each -->
        <div v-for="task in favs" :key="task.id">
          <TaskDetails :task="task" v-motion :initial="initial" :enter="enter" :delay="300" />
        </div>
      </div>

      <div class="add-new-section">
        <button class="add-btn" @click="openModal">Add task</button>
      </div>

    </section>


    <ModalComponent :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">

      <template #header>
        <h3 class="form-title">Add a new task</h3>
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


  const initial= {
    x: -500,
    opacity: 0,
    transition: {
      stiffness: 100,
    }
  }

  const enter = {
    x: 0,
    opacity: 1,
    transition: {
      stiffness: 100,
      ease: 'easeInOut',
    }
  }


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

  // This method handles the emit event from the TaskForm & Modal components
  const closeModal = (message) => {
    
    isModalOpened.value = false;

    // If the form submission was successful, reset the filter to 'all' to show the newly added task!
    if(message) { 
      filter.value = 'all' 
    };

  };

</script>
 