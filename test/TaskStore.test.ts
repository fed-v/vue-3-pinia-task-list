import {it, expect, describe, beforeEach, vi} from "vitest";
import { useTaskStore } from '../src/stores/TaskStore';
import { setActivePinia, createPinia } from 'pinia';


// TypeScript casting to inform the compiler about the mock methods
globalThis.fetch = vi.fn();


describe('Task Store', () => {

    let store: ReturnType<typeof useTaskStore>;

    beforeEach(() => {

        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia());
        store = useTaskStore();

    });

    it('initializes with correct state', () => {

        expect(store.tasks).toEqual([]);
        expect(store.loading).toBe(false);
        expect(store.isDone).toBe(false);
        
    });

    it('favs getter returns favorite tasks', () => {

        store.tasks = [{ id: 1, isFav: true }, { id: 2, isFav: false }];
        expect(store.favs).toEqual([{ id: 1, isFav: true }]);

    });

    it('favCount getter returns count of favorite tasks not done', () => {

        store.tasks = [
          { id: 1, isFav: true, isDone: false },
          { id: 2, isFav: true, isDone: true },
          { id: 3, isFav: false, isDone: false },
        ];
        expect(store.favCount).toBe(1);

    });

    it('totalCount getter returns count of tasks not done', () => {

        store.tasks = [
          { id: 1, isDone: false },
          { id: 2, isDone: true },
          { id: 3, isDone: false },
        ];
        expect(store.totalCount).toBe(2);

    });

    it('getTasks action fetches tasks and updates state', async () => {

        const mockTasks = [{ id: 1, title: 'Task 1' }];
        globalThis.fetch.mockResolvedValueOnce({
          json: async () => mockTasks,
        } as Response);
    
        await store.getTasks();
        expect(store.loading).toBe(false);
        expect(store.tasks).toEqual(mockTasks);

    });

    it('addTask action adds a task', async () => {

        const newTask = { id: 2, title: 'Task 2' };

        globalThis.fetch.mockResolvedValueOnce({
            json: async () => newTask,
          } as Response);
    
        await store.addTask(newTask);
        expect(store.tasks).toEqual([newTask]);

    });

    it('deleteTask action deletes a task', async () => {

        store.tasks = [
          { id: 1, title: 'Task 1' },
          { id: 2, title: 'Task 2' },
        ];
    
        globalThis.fetch.mockResolvedValue(Promise.resolve({} as Response));
    
        await store.deleteTask(1);
        expect(store.tasks).toEqual([{ id: 2, title: 'Task 2' }]);

    });

    it('toggleStatus action toggles task status', async () => {

        store.tasks = [
          { id: 1, title: 'Task 1', isFav: false, isDone: false },
        ];
    
        globalThis.fetch.mockResolvedValue(Promise.resolve({} as Response));

        await store.toggleStatus(1, 'isFav');
        expect(store.tasks[0].isFav).toBe(true);

        await store.toggleStatus(1, 'isDone');
        expect(store.tasks[0].isDone).toBe(true);

    });
    
});