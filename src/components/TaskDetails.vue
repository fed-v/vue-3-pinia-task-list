<template>

    <!-- The first object in :class are class name: <condition> whereas the second item is a call to a computed method -->
    <div class="task" :class="[ { done: props.task.isDone, isOpen: isExpanded }, priorityClassName ]">

        <div class="task-header">

            <div>
                <input @click="taskStore.toggleStatus(props.task.id, 'isDone')" type="checkbox" id="" name="" value="" :checked="props.task.isDone"/>
                <h3>{{ props.task.title }}</h3><span class="priority-title" v-if="props.task.priority === 'urgent' | props.task.priority === 'important'">* {{ props.task.priority}}</span>
            </div>
            
            <div class="icons">
                <i class="material-icons btn" @click="taskStore.deleteTask(props.task.id)">delete</i>
                <i class="material-icons btn" :class="{ active: props.task.isFav }" @click="taskStore.toggleStatus(props.task.id, 'isFav')">favorite</i>
                <i class="material-icons btn" :class="{ isExpanded: isExpanded }" @click="expandTask">{{ isExpanded ? 'expand_less' : 'expand_more' }}</i>
            </div>

        </div>

        <div class="description-container">
            <p class="task-description">{{ props.task.description }}</p>
        </div>

    </div>

</template>

<script setup>

    import { useTaskStore } from '../stores/TaskStore';
    import { ref, computed } from 'vue';

    const isExpanded = ref(false);
    const props = defineProps(['task']);
    const taskStore = useTaskStore();

    // Compute the class name dynamically based on the value of props.task.priority
    const priorityClassName = computed(() => {

        // Determine the class name based on the priority value
        return {
            urgent: props.task.priority === 'urgent',
            important: props.task.priority === 'important',
            normal: props.task.priority === 'normal'
        }

    });

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
        max-height: 65px;
        transition: max-height 0.5s ease-in-out;
        overflow: hidden;
    }

    .task-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .description-container {
        width: 100%;
    }

    .task:hover {
        box-shadow: 2px 4px 6px rgba(0,0,0,0.1);
    }
    
    /* This changes the color of finished tasks*/
    
    .task.important{
        background: #ffd859;
    }
    .task.urgent{
        background: lightcoral;
    }
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
        line-height: 25px;
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

    .priority-title {
        margin-left: 10px;
        font-style: italic;
    }
    
</style>
