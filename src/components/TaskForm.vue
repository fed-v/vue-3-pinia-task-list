<template>

    <form @submit.prevent="handleSubmit">

        <label for="task">Task</label>
        <input id="task" type="text" v-model="newTask" />

        <label for="details">Details</label>
        <textarea id="details" v-model="newTaskDetails" />

        <label for="priority">Priority</label>
        <select id="priority" v-model="priority">
            <option value="" disabled selected>Select priority</option>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
        </select>

        <button class="add-btn">Add</button>

    </form>

</template>

<script setup>

    import { useTaskStore } from '../stores/TaskStore';
    import { ref } from 'vue';

    const taskStore = useTaskStore();
    const newTask = ref('');
    const newTaskDetails = ref('');
    const priority = ref('');

    // This method will check fields aren't empty then calls the task store and passes a new task object.
    const handleSubmit = () => {

        if(newTask.value.length > 0 && newTaskDetails.value.length > 0 && priority.value !== '') {

            taskStore.addTask({
                title: newTask.value,
                description: newTaskDetails.value,
                priority: priority.value,
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
    textarea,
    select {
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