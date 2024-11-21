<template>
    <div>
      <h1>Money Manager</h1>
      <p>Total Income: {{ totalIncome }}</p>
      <p>Total Expense: {{ totalExpense }}</p>
      <p>Balance: {{ totalBalance }}</p>
  
      <form @submit.prevent="addMoney">
        <input v-model="amount" type="number" placeholder="Amount" required />
        <select v-model="type" required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input v-model="description" type="text" placeholder="Description" />
        <button type="submit">Add</button>
      </form>
  
      <ul>
        <li v-for="entry in moneyList" :key="entry.id">
          {{ entry.type }} - {{ entry.amount }} ({{ entry.description }})
          <button @click="deleteEntry(entry.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <!-- <script>
  import { ref, onMounted } from 'vue';
  import { createMoney, getMoney, getTotalMoney, deleteMoney } from '../services/moneyService.js';
  
  export default {
    name: 'MoneyManager',
    setup() {
      const moneyList = ref([]);
      const amount = ref('');
      const type = ref('income');
      const description = ref('');
      const totalIncome = ref(0);
      const totalExpense = ref(0);
      const totalBalance = ref(0);
      const userId = 1; // Replace with dynamic user ID if applicable
  
      const fetchMoney = async () => {
        const { data } = await getMoney(userId);
        moneyList.value = data;
      };
  
      const fetchTotalMoney = async () => {
        const { data } = await getTotalMoney(userId);
        totalIncome.value = data.total_income || 0;
        totalExpense.value = data.total_expense || 0;
        totalBalance.value = data.total_balance || 0;
      };
  
      const addMoney = async () => {
        await createMoney({ user_id: userId, amount: amount.value, type: type.value, description: description.value });
        amount.value = '';
        type.value = 'income';
        description.value = '';
        fetchMoney();
        fetchTotalMoney();
      };
  
      const deleteEntry = async (id) => {
        await deleteMoney(id, userId);
        fetchMoney();
        fetchTotalMoney();
      };
  
      onMounted(() => {
        fetchMoney();
        fetchTotalMoney();
      });
  
      return { moneyList, amount, type, description, totalIncome, totalExpense, totalBalance, addMoney, deleteEntry };
    },
  };
  </script> 
   -->