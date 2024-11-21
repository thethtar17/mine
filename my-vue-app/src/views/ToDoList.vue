<!-- 
  <template>
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          v-model="newTask"
          placeholder="Add a new task"
          @keyup.enter="addTask"
        />
        <input type="datetime-local" v-model="taskTime" />
        <button @click="addTask">Add Task</button>
      </div>
      <table class="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="task.id">
            <td class="task-name" :class="{ completed: task.completed }">
              {{ task.text }}
            </td>
            <td class="task-time">{{ formatTime(task.time) }}</td>
            <td class="task-status">
              <input type="checkbox" v-model="task.completed" />
            </td>
            <td class="task-actions">
              <button @click="removeTask(index)">❌</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="$router.push('/')">Go Back</button>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        newTask: '',
        taskTime: '', // Store the time selected by the user
        tasks: [],
      };
    },
    created() {
      // Fetch tasks from the back-end when the component is created
      this.fetchTasks();
    },
    methods: {
      async fetchTasks() {
        try {
          const response = await axios.get('http://localhost:3000/api/todos');
          this.tasks = response.data; // Fetch tasks including the time field
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      },
      async addTask() {
        if (this.newTask.trim()) {
          try {
            const response = await axios.post('http://localhost:3000/api/todos', {
              text: this.newTask,
              completed: false,
              time: this.taskTime,  // Send the task time
            });
            this.tasks.push(response.data); // Add new task to list
            this.newTask = ''; // Clear input field
            this.taskTime = ''; // Clear time input
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }
      },
      formatTime(time) {
        if (!time) return ''; // Handle cases where no time is available
        const date = new Date(time);
        return date.toLocaleString(); // Format time as a local string
      },
      removeTask(index) {
        this.tasks.splice(index, 1); // Simple task removal logic
      },
    },
  };
  </script> -->

  <template>
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          v-model="newTask"
          placeholder="Add a new task"
          @keyup.enter="addTask"
        />
        <input type="datetime-local" v-model="taskTime" />
        <button @click="addTask">Add Task</button>
      </div>
      <div v-if="message" class="message-box">
        <p>{{ message }}</p>
      </div>
      <table class="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="task.id">
            <td class="task-name" :class="{ completed: task.completed }">
              {{ task.text }}
            </td>
            <td class="task-time">{{ formatTime(task.time) }}</td>
            <td class="task-status">
              <input type="checkbox" v-model="task.completed" />
            </td>
            <td class="task-actions">
              <button @click="removeTask(index)">❌</button>
              <button @click="editTask(task)">✏️</button> <!-- Update button -->
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="$router.push('/')">Go Back</button>

      <!-- Edit Task Form (this will appear when the update button is clicked) -->
      <div v-if="editingTask" class="edit-form">
        <input
          type="text"
          v-model="editingTask.text"
          placeholder="Edit task"
        />
        <input type="datetime-local" v-model="editingTask.time" />
        <label>
          Completed
          <input type="checkbox" v-model="editingTask.completed" />
        </label>
        <button @click="updateTask">Update Task</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTask: '',
      taskTime: '',
      tasks: [],
      editingTask: null, // Store the task being edited
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async updateTask() {
  if (this.editingTask) {
    try {
      // Send the updated task data to the server
      const response = await fetch(`http://localhost:3000/api/todos/${this.editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: this.editingTask.text,
          completed: this.editingTask.completed,
          time: this.editingTask.time,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json(); // Parse the JSON response body
      console.log('Task updated:', updatedTask);

      // Set success message
      this.message = 'Task updated successfully!';

      // Optionally, hide the edit form or reset editingTask
      this.editingTask = null;

      // Refresh the task list after a short delay
      setTimeout(() => {
        this.fetchTasks(); // Refresh the task list
      }, 2000); // Refresh after 2 seconds
    } catch (error) {
      console.error('Error updating task:', error);
      // Set error message
      this.message = 'Error updating task. Please try again.';
    }
  }
}

,


async fetchTasks() {
      try {
        const response = await fetch('http://localhost:3000/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        this.tasks = tasks; // Update the tasks array with the latest data
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
,
    async addTask() {
      if (this.newTask.trim()) {
        try {
          const response = await axios.post('http://localhost:3000/api/todos', {
            text: this.newTask,
            completed: false,
            time: this.taskTime,
          });
          this.tasks.push(response.data); 
          this.newTask = ''; 
          this.taskTime = ''; 
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    },
    formatTime(time) {
      if (!time) return '';
      const date = new Date(time);
      return date.toLocaleString();
    },
    // removeTask(index) {
    //   this.tasks.splice(index, 1);
    // },
    async removeTask(index) {
      const taskId = this.tasks[index].id;
      console.log('Task delete start, ID:', taskId);
      this.tasks.splice(index, 1);
      fetch(`http://localhost:3000/api/todos/${taskId}`, {
        method: 'DELETE',
      })
        .then(response => {
          console.log('Response status:', response.status);
          console.log('Response body:', response.text()); // Log the raw response

          if (!response.ok) {
            throw new Error('Failed to delete task');
          }

          return response.json(); // Try parsing as JSON if the response is successful
        })
        .then(data => {
          console.log('Task deleted:', data);
          alert('Task deleted successfully');

          // Remove the task from the list (update Vue's state)
         

          // Refresh the task list after a short delay
          setTimeout(() => {
            this.fetchTasks(); // Call your fetchTasks method to refresh the task list
          }, 2000); // Refresh after 2 seconds
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    }
,
     editTask(task) {
      // Set the task to be edited
      this.editingTask = { ...task }; // Create a copy to edit
    },
   
    // updateTask() {
    //   if (this.editingTask) {
    //     // Send the updated task data to the server
    //     fetch(`http://localhost:3000/api/todos/${this.editingTask.id}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         text: this.editingTask.text,
    //         completed: this.editingTask.completed,
    //         time: this.editingTask.time,
    //       }),
    //     })
    //       .then(response => response.json())
    //       .then(updatedTask => {
    //         console.log('Task updated:', updatedTask);

    //         // Update the task in the list (you can use Vue's reactivity to update the task)
    //         const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    //         if (index !== -1) {
    //           this.tasks.splice(index, 1, updatedTask); // Replace the old task with the updated one
    //         }

    //         // Optionally, hide the edit form
    //         this.editingTask = null;
    //       })
    //       .catch(error => {
    //         console.error('Error updating task:', error);
    //       });
    //   }
    // },
    cancelEdit() {
      // Cancel the editing process
      this.editingTask = null;
    },
  },
};
</script>
  <style>
  /* General Table Styling */

  .edit-form {
    margin-top: 20px;
    border: 1px solid #ddd;
    padding: 10px;
    width: 400px;
    background-color: #f9f9f9;
  }

  .edit-form input {
    display: block;
    width: 90%;
    margin-bottom: 10px;
    padding: 8px;
  }

  button {
    padding: 8px 16px;
    margin-top: 5px;
    cursor: pointer;
  }

  .task-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;
  }
  
  .task-table th,
  .task-table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  /* Task Name Styling */
  .task-name {
    font-weight: bold;
    max-width: 300px;
    word-wrap: break-word;
  }
  
  /* Task Time Styling */
  .task-time {
    color: #555;
    font-style: italic;
  }
  
  /* Completed Task Styling */
  .completed {
    text-decoration: line-through;
    color: gray;
  }
  
  /* Task Status and Actions */
  .task-status,
  .task-actions {
    text-align: center;
  }
  
  /* Transition Animations */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>
  