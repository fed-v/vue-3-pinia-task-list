<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="text"
            placeholder="I need to..."
            v-model="newTask"
        >
        <button>Add</button>
    </form>
</template>

<script setup>
    import { useTaskStore } from '../stores/TaskStore';
    import { ref } from 'vue';

    const taskStore = useTaskStore();
    const newTask = ref('');

    // This method will check if newTask not empty then calls the task store and passes a new task object.
    const handleSubmit = () => {
        if(newTask.value.length > 0) {
            taskStore.addTask({
                title: newTask.value,
                isFav: false,
                isDone: false,

                // Random ID generator (browser only). Source: https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
                id: window.crypto.randomUUID()
            })
            newTask.value = '';
        }
    };        
</script>