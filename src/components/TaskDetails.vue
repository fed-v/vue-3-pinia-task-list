<template>

    <!-- Add "done" class if task is set to done for additional styles -->
    <div class="task" :class="{done : props.task.isDone}">

        <div>
            <!-- Dynamically set the check attribute if task is done -->
            <input @click="taskStore.toggleStatus(props.task.id, 'isDone')" type="checkbox" id="" name="" value="" :checked="props.task.isDone"/>
            <h3>{{ props.task.title }}</h3>
        </div>
        
        <div class="icons">
            <i 
                class="material-icons" 
                @click="taskStore.deleteTask(props.task.id)"
            >delete</i>
            <i 
                class="material-icons" 
                :class="{active : props.task.isFav}"
                @click="taskStore.toggleStatus(props.task.id, 'isFav')"
            >favorite</i>
        </div>

    </div>
</template>

<script setup>
    import { useTaskStore } from '../stores/TaskStore';

    const props = defineProps(['task']);

    const taskStore = useTaskStore();
</script>