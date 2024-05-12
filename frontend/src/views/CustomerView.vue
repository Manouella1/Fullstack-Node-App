<script setup>
import { ref } from "vue";
import axios from "axios";

const customers = ref([]);
const newCustomer = ref({
  customerName: "",
  customerMail: "",
  customerAdress: "",
  customerPassword: "",
});
const updateCustomerData = ref({
  customerId: "",
  customerName: "",
  customerMail: "",
  customerAdress: "",
  customerPassword: "",
});

// Hämta kunder
const fetchCustomers = () => {
  axios
    .get("http://localhost:3000/customers")
    .then((response) => {
      console.log("API Response:", response.data);
      customers.value = response.data.map((customer) => ({
        ...customer,
        customerId: customer.customerId,
      }));
    })
    .catch((error) => console.error("Error: ", error));
};

// Registrera kunder
const registerCustomer = () => {
  axios
    .post("http://localhost:3000/customer/register", newCustomer.value)
    .then((response) => {
      customers.value.push(response.data);
      console.log("Kund registrerad: ", response.data);
      fetchCustomers();
    })
    .catch((error) => console.error("Error: ", error));
};

// Uppdatera kunder
const updateCustomer = () => {
  if (!updateCustomerData.value.customerId) {
    alert("Kund-ID krävs för uppdatering.");
    return;
  }
  axios
    .patch(
      `http://localhost:3000/patch/customers/${updateCustomerData.value.customerId}`,
      updateCustomerData.value
    )
    .then((response) => {
      console.log("Kund uppdaterad: ", response.data);
      fetchCustomers(); // Uppdaterar listan med kunder
    })
    .catch((error) => console.error("Error: ", error));
};

// Radera kunder
const deleteCustomer = (customerId) => {
  console.log("Deleting customer with ID:", customerId);

  if (!customerId) {
    alert("Kund-ID krävs för radering.");
    return;
  }

  // Börja axios-anropet direkt, och ta bort det felplacerade semikolon och punkten.
  axios
    .delete(`http://localhost:3000/delete/customers/${customerId}`)
    .then((response) => {
      console.log("Kund raderad: ", response.data);
      // Antag att customers är en reaktiv referens i Vue eller liknande
      customers.value = customers.value.filter(
        (customer) => customer.customerId !== customerId
      );
    })
    .catch((error) => {
      console.error("Error: ", error);
      // Kontrollera felmeddelande från server, och hantera olika typer av fel
      if (error.response) {
        console.error("Felmeddelande från server: ", error.response.data);
        alert(error.response.data.error);
      }
    });
  console.log("efter delete?");
};
</script>

<template>
  <div>
    <h1>Kundhantering</h1>
    <div>
      <h2>Registrera ny kund</h2>
      <form @submit.prevent="registerCustomer">
        <input v-model="newCustomer.customerName" placeholder="Namn" />
        <input v-model="newCustomer.customerMail" placeholder="Email" />
        <input v-model="newCustomer.customerAdress" placeholder="Adress" />
        <input v-model="newCustomer.customerPassword" placeholder="Lösenord" />
        <button type="submit">Registrera</button>
      </form>
    </div>
    <div>
      <h2>Uppdatera kund</h2>
      <form @submit.prevent="updateCustomer">
        <input v-model="updateCustomerData.customerId" placeholder="Kund ID" />
        <input v-model="updateCustomerData.customerName" placeholder="Namn" />
        <input v-model="updateCustomerData.customerMail" placeholder="Email" />
        <input
          v-model="updateCustomerData.customerAdress"
          placeholder="Adress"
        />
        <input
          v-model="updateCustomerData.customerPassword"
          placeholder="Lösenord"
        />
        <button type="submit">Uppdatera</button>
      </form>
    </div>
    <div>
      <h2>Kunder</h2>
      <button @click="fetchCustomers">Hämta Kunder</button>
      <ul>
        <li v-for="customer in customers" :key="customer.customerId">
          {{ customer.customerName }} - {{ customer.customerMail }} -
          {{ customer.customerAdress }}
          <button @click="deleteCustomer(customer.customerId)">Radera</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
