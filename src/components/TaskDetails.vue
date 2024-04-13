<template>
    <div class="task" :class="{ done: props.task.isDone, isOpen: isExpanded }">

        <div>
            <input @click="taskStore.toggleStatus(props.task.id, 'isDone')" type="checkbox" id="" name="" value="" :checked="props.task.isDone"/>
            <h3>{{ props.task.title }}</h3>

            <p>
                {{ props.task.description }}
            </p>
        </div>
        
        <div class="icons">
            <i class="material-icons" @click="taskStore.deleteTask(props.task.id)">delete</i>
            <i class="material-icons" :class="{ active: props.task.isFav }" @click="taskStore.toggleStatus(props.task.id, 'isFav')">favorite</i>
            <i class="material-icons" @click="expandTask">{{ isExpanded ? 'expand_less' : 'expand_more' }}</i>
        </div>

    </div>
</template>

<script setup>
    import { useTaskStore } from '../stores/TaskStore';
    import { ref } from 'vue';

    const isExpanded = ref(false);
    const props = defineProps(['task']);
    const taskStore = useTaskStore();

    function expandTask() {
      isExpanded.value = !isExpanded.value;
    }
</script>

<style scoped>

    .task {
        padding: 10px 20px;
        background: #fff;
        margin-top: 20px;
        border-radius: 10px;
        box-shadow: 2px 4px 6px rgba(0,0,0,0.05);
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        max-height: 65px;
        transition: max-height 0.5s ease-in-out;
        overflow: hidden;
    
    }

    .task:hover {
        box-shadow: 2px 4px 6px rgba(0,0,0,0.1);
    }
    
    /* This changes the color of finished tasks*/
    .task.done{
        background: #E0E0E0;
    }
    
    /* This expands a task to view its description */
    .task.isOpen {
        max-height: 300px;
        height: auto;
        transition: max-height 0.5s ease-in-out;    
    }
    
    .task p {
        margin-left: 40px;
    }
    
    .task h3, .task .icons {
        display: inline-block;
        margin-left: 20px;
    }

    .task.done h3 {
        text-decoration: line-through;
    }

    .task .icons {
        text-align: right;
    }

    .task i {
        font-size: 1.4em;
        margin-left: 6px;
        cursor: pointer;
        color: #bbb;
    }

    .task i.active {
        color: #ff005d;
    }
    
</style>
