<script>
let date = document.getElementById("date");
let text = document.getElementById("text");

export default {
  data() {
    return {
      fetchedOrders: [],
      gamesStock: [],
      logs: {},
    };
  },
  methods: {},

  created() {
    let orders = [];
    let stock = [];
    fetch("http://localhost:3000/orders")
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res.result);
        for (let i = 0; i < res.result.length; i++) {
          orders.push(res.result[i]);
        }
        this.logs = {};
        this.logs = res.log;
        this.fetchedOrders = orders;
        console.log(this.fetchedOrders);
        console.log(this.logs);
      });

    fetch("http://localhost:3000/orders/stock")
      .then((resp) => resp.json())
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          stock.push(res[i]);
        }
        this.gamesStock = stock;
        console.log(this.gamesStock);
      });
  },
};
</script>

<template>
  <main>
    <h1 class="styleText">Our current orders:</h1>

    <table class="tablePlacement">
      <div class="tableHeight">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Shipping Adress</th>
            <th>Order Number</th>
            <th>Product Name</th>
            <th>Product Serial</th>
            <th>Order Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in fetchedOrders" :key="index">
            <td>{{ order.customerName }}</td>
            <td>{{ order.shippingAdress }}</td>
            <td>{{ order.orderNumber }}</td>
            <td>{{ order.productName }}</td>
            <td>{{ order.productSerial }}</td>
            <td>{{ order.orderQuantity }}</td>
          </tr>
        </tbody>
      </div>
    </table>
    <div id="oneRow">
      <div>
        <h1 class="styleText">Product Stock:</h1>
        <table class="tablePlacement">
          <div class="tableHeight">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in gamesStock" :key="index">
                <td>{{ product.productId }}</td>
                <td>{{ product.productName }}</td>
                <td>{{ product.productStock }}</td>
              </tr>
            </tbody>
          </div>
        </table>
      </div>
      <div>
        <h1 class="styleText">Status Log:</h1>
        <section id="updates" style="text-align: center; font-weight: bold">
          <p id="date">{{ logs.date }}</p>
          <p id="text">{{ logs.text }}</p>
          <hr />
          <u></u>
        </section>
      </div>
    </div>
  </main>
</template>

<style>
main {
  box-sizing: content-box;
}

.styleText {
  text-decoration: underline;
  text-align: center;
}

#oneRow {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

#updates {
  border-radius: 20px;
  border: outset 3px green;
  height: 200px;
  width: 250px;
}

.tablePlacement {
  display: flex;
  justify-content: center;
}

.tableHeight {
  height: 200px;
  border: inset 2px white;
  overflow-y: auto;
}

td {
  border: 1px solid rgb(89, 185, 126);
}

th {
  font-weight: bolder;
  border: none;
}

td {
  width: 150px;
  text-align: center;
}
</style>
