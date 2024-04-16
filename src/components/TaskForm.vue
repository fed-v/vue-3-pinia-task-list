<template>

    <form @submit.prevent="handleSubmit">

        <label for="task">Task</label>

        <input
            id="task"
            type="text"
            v-model="newTask"
        >

        <label for="details">Details</label>

        <textarea
            id="details"
            v-model="newTaskDetails" />

        <button class="add-btn">Add</button>

    </form>

</template>

<script setup>

    import { useTaskStore } from '../stores/TaskStore';
    import { ref } from 'vue';

    const taskStore = useTaskStore();
    const newTask = ref('');
    const newTaskDetails = ref('');

    // This method will check if newTask and task details are not empty then calls the task store and passes a new task object.
    const handleSubmit = () => {

        if(newTask.value.length > 0 && newTaskDetails.value.length > 0) {

            taskStore.addTask({
                title: newTask.value,
                description: newTaskDetails.value,
                isFav: false,
                isDone: false,

                // Random ID generator (browser only). 
                // Source: https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
                id: window.crypto.randomUUID()
            })

            // Clear the input fields
            newTask.value = '';
            newTaskDetails.value = '';

            // Emit the modal-close event to close the modal
            emit('modal-close');

        }
    };        


    // Define the emit function the parent component will use to close the modal
    const emit = defineEmits(["modal-close"]);

</script>

<style scoped>

    .new-task-form {
        background: #e7e7e7;
        padding: 20px 0;
    }

    form {
        max-width: 400px;
        margin: 0 auto;
    }

    form input,
    textarea {
        border: 1px solid #777;
        border-radius: 4px;
        padding: 10px;
        color: #555;
        font-size: 1em;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    .form-title {
        margin: 0 0 20px 0;
    }

    textarea {
        resize: none;
        height: 100px;
    }

</style>