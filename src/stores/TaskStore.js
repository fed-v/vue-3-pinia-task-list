import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {


    state: () => ({ 
        tasks: [],
        loading: false,
        isDone: false
    }),


    getters: {

      /**
      * Gets all favorite tasks from the state.
      * 
      * @param {object} state - The state of the store.
      * @returns {Task[]} - An array of favorite tasks.
      */
      favs(state) {
        return state.tasks.filter(t => t.isFav); 
      },


      /**
      * Gets the count of favorite tasks that are not done.
      * 
      * @param {object} state - The state of the store.
      * @param {object} getters - The getters object of the store.
      * @returns {number} - The count of favorite tasks that are not done.
      */
      
      favCount(state) {

        // Filter out tasks that are favorites and marked as done
        const filteredFavs = state.tasks.filter(t => t.isFav && !t.isDone);

        // Return the amount of tasks that are favorites and not done
        return filteredFavs.length;

      },


      /**
      * Gets the total count of tasks that are not done.
      * 
      * @param {object} state - The state of the store.
      * @returns {number} - The total count of tasks that are not done.
      */
      totalCount: (state) => {
        return state.tasks.filter(t => !t.isDone).length;
      }
      
    },


    actions: {

      /**
      * Fetches tasks from the server and updates the store's state with the retrieved tasks.
      * 
      * @returns {Promise<void>} - A promise that resolves when the tasks are fetched and updated.
      */
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


      /**
      * Adds a new task to the store's state and sends a POST request to the server to add the task.
      * 
      * @param {Task} task - The task to add.
      * @returns {Promise<void>} - A promise that resolves when the task is successfully added.
      */
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


      /**
      * Deletes a task from the store's state and sends a DELETE request to the server to delete the task.
      * 
      * @param {number} id - The id of the task to delete.
      * @returns {Promise<void>} - A promise that resolves when the task is successfully deleted.
      */
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

    }

})  
  