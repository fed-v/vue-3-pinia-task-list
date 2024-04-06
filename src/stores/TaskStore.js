import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {


    // The state is the actual data in your store to be accessed or updated
    state: () => ({ 
        tasks: [],
        loading: false,
        isDone: false
    }),


    // Getters are used to access the state of your store
    getters: {
      favs() {
        return this.tasks.filter(t => t.isFav);
      },
      favCount() {
        return this.tasks.reduce((p, c) => {
            return c .isFav ? p + 1 : p;
        }, 0)
      },

      // You can define a getter as an arrow function but you must pass the state as an argument
      // Use the state rather than this when accessing the 
      totalCount: (state) => {
        return state.tasks.length;
      }
    },


    // Actions are used to update the state of your store.
    actions: {

      async getTasks() {
        
        this.loading = true;

        const response = await fetch('http://localhost:3000/tasks').catch(error => {
          console.error(error);
          return null;
        });

        const data = await response.json();

        this.tasks = data;
        this.loading = false;
      },

      async addTask(task) {
        this.tasks.push(task); 

        // fetch the json db and add the new task passed as an argument
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'content-type' : 'application/json' }
        }).catch(error => {
          console.error(error);
          return null;
        });
        
      },

      async deleteTask(id) {

        this.tasks = this.tasks.filter(t => {
            return t.id !== id;
        })

        // fetch the json db and delete the task using the id passed
        const response = await fetch('http://localhost:3000/tasks/' + id, {
            method: 'DELETE'
        }).catch(error => {
          console.error(error);
          return null;
        });

      },


      /**
       * This action takes the id of the task and the status that needs to be update.
       * At the moment, there are two possible status: isFav or isDone
       *
       * @param {string} id - the task id
       * @param {string} status - the status that needs to be updated
       *
       * @example
       *
       *     taskStore.toggleStatus(props.task.id, 'isDone')
       */
      async toggleStatus(id, status) {

        // Find the task by id
        const task = this.tasks.find(t => t.id === id);

        // Because I have 2 status (isFave and isDone), I can use a ternary operator to simply update the right status
        // depending on which one was passed as an argument
        (status === 'isFav') ? task.isFav = !task.isFav : task.isDone = !task.isDone;

        // fetch the json db and update the task using the id passed
        const response = await fetch('http://localhost:3000/tasks/' + id, {
            method: 'PATCH',
            body: (status === 'isFav') ? JSON.stringify({ isFav: task.isFav }) : JSON.stringify({ isDone: task.isDone }),
            headers: { 'content-type' : 'application/json' }
        }).catch(error => {
          console.error(error);
          return null;
        });

      }

    },

})  
  