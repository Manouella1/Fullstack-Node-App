<script>
export default {
  data() {
    return {
      pubPro: null,
      putpubPro: null,
      productName: "",
      putproductName: "",
      productImage: "/src/assets/covers/default.png",
      productPrice: null,
      putproductPrice: null,
      productCategory: "",
      putproductCategory: "",
      productStock: null,
      productSerial: null,
      productId: null,
      putproductId: null,
      delproductId: null,
      newContainer: [],
      gamesContain: [],
      key: 0,
    };
  },

  created() {
    this.getGames();
  },

  methods: {
    formSubmit(e) {
      e.preventDefault();
      // console.log("form submitted!");
      fetch("http://localhost:3000/api/games/insert", {
        body: JSON.stringify({
          pubPro: this.pubPro,
          productSerial: this.productSerial,
          productName: this.productName,
          productImage: this.productImage,
          productStock: this.productStock,
          productPrice: this.productPrice,
          productCategory: this.productCategory,
        }),

        headers: { "Content-type": "application/json" },
        method: "POST",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.pubPro = null;
          this.productSerial = null;
          this.productName = null;
          this.productImage = null;
          this.productStock = null;
          this.productPrice = null;
          this.productCategory = null;
        });
    },

    putSubmit(e) {
      e.preventDefault();
      // console.log("form submitted!");
      fetch("http://localhost:3000/api/games/edit", {
        body: JSON.stringify({
          pubPro: this.putpubPro,
          productSerial: null,
          productName: this.putproductName,
          productImage: this.productImage,
          productStock: null,
          productPrice: this.putproductPrice,
          productCategory: this.putproductCategory,
          productId: this.putproductId,
        }),

        headers: { "Content-type": "application/json" },
        method: "PUT",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.putproductName = null;
          this.putproductPrice = null;
          this.putproductCategory = null;
          this.putproductId = null;
          this.putpubPro = null;
        });
    },

    delSubmit(e) {
      e.preventDefault();
      // console.log("form submitted!");
      fetch("http://localhost:3000/api/games/remove", {
        body: JSON.stringify({
          productId: this.delproductId,
        }),

        headers: { "Content-type": "application/json" },
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.delproductId = null;
        });
    },

    getGames() {
      const containGames = [];
      fetch("http://localhost:3000/api/games")
        .then((resp) => resp.json())
        .then((results) => {
          results.forEach((result) => {
            containGames.push(result);
          });
          this.gamesContain = containGames;
          console.log(this.gamesContain);
        });
    },
  },
};
</script>

<template>
  <h1 style="text-align: center; margin: 10px">
    Couldn't find your game ? Is something missing ? Send us a suggestion !
  </h1>

  <table @mouseenter="getGames()" class="tablePlacement">
    <div class="tableHeight">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Genre</th>
          <th>Product Serial</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(games, index) in gamesContain" :key="index">
          <td>{{ games.productId }}</td>
          <td>{{ games.productName }}</td>
          <td>{{ games.productPrice }}</td>
          <td>{{ games.productCategory }}</td>
          <td>{{ games.productSerial }}</td>
        </tr>
      </tbody>
    </div>
  </table>

  <section id="divide2">
    <!-- POST -->
    <div class="marginal">
      <!-- pubPro, dvs vilken publisher som är kopplat med foreign key -->
      <form
        action="http://localhost:3000/api/games/insert"
        @submit.prevent="formSubmit"
        method="post"
        id="gameForm"
      >
        <h1>POST</h1>
        <p>Game Title:</p>
        <input
          type="text"
          id="gameTitle"
          v-model="productName"
          placeholder="name..."
        />
        <p>Game Price:</p>
        <input
          type="text"
          id="gamePrice"
          v-model="productPrice"
          placeholder="price..."
        />
        <p>Game Genre</p>
        <input
          type="text"
          name="gameGenre"
          id="gameGenre"
          placeholder="genre 1, genre 2..."
          v-model="productCategory"
        />
        <p>Game Platform</p>
        <select id="gameCategory" name="gameCategory" v-model="pubPro">
          <option value="1">Playstation</option>
          <option value="2">Xbox</option>
          <option value="3">Nintendo</option>
          <option value="4">Steam</option>
          <option value="5">Epic Game Store</option>
          <option value="6">GOG</option>
          <option value="7">IOS/Android</option>
        </select>
        <button onclick="formSubmit()">Send</button>
      </form>
    </div>
    <!-- PUT -->
    <div class="marginal">
      <form
        action="hhttp://localhost:3000/games/edit"
        @submit.prevent="putSubmit"
        method="put"
        id="gameForm"
      >
        <h1>PUT</h1>
        <p>Game id</p>
        <input
          type="text"
          name="gameId"
          id="gameId"
          placeholder="product ID..."
          v-model="putproductId"
        />
        <p>Game Title:</p>
        <input
          type="text"
          id="gameTitle"
          v-model="putproductName"
          placeholder="name..."
        />
        <p>Game Price:</p>
        <input
          type="text"
          id="gamePrice"
          v-model="putproductPrice"
          placeholder="price..."
        />
        <p>Game Genre</p>
        <input
          type="text"
          name="gameGenre"
          id="gameGenre"
          placeholder="genre 1, genre 2..."
          v-model="putproductCategory"
        />
        <p>Game Platform</p>
        <select id="gameCategory" name="gameCategory" v-model="putpubPro">
          <option value="1">Playstation</option>
          <option value="2">Xbox</option>
          <option value="3">Nintendo</option>
          <option value="4">Steam</option>
          <option value="5">Epic Game Store</option>
          <option value="6">GOG</option>
          <option value="7">IOS/Android</option>
        </select>
        <p>
          <button onclick="putSubmit()">Send</button>
        </p>
      </form>
    </div>
    <!-- DELETE -->
    <div class="marginal">
      <form
        action="http://localhost:3000/games/remove"
        @submit.prevent="delSubmit"
        method="delete"
        id="gameForm"
      >
        <h1>DELETE</h1>
        <p>Game id</p>
        <input
          type="text"
          name="gameId"
          id="gameId"
          placeholder="product ID..."
          v-model="delproductId"
        />
        <button onclick="delSubmit()">Send</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.tablePlacement {
  display: flex;
  justify-content: center;
}

.tableHeight {
  height: 200px;
  border: inset 2px white;
  overflow-y: auto;
}

h1 {
  margin-top: 10px;
}

input {
  border-radius: 5px;
}

#divide2 {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.marginal {
  box-shadow: 10px 10px rgb(3, 24, 1);
  background-color: rgb(51, 49, 49);
  border-radius: 20px;
  margin-top: 50px;
  border: inset 3px green;
  width: 250px;
  height: 350px;
}
.marginal-side {
  box-shadow: 10px 10px rgb(3, 24, 1);
  background-color: rgba(51, 49, 49, 0.432);
  border-radius: 20px;
  margin-top: 50px;
  border: inset 3px green;
  width: 250px;
  height: 350px;
  overflow-y: auto;
}

#window {
  background-color: rgb(51, 49, 49);
  border-radius: 20px;
  margin-top: 50px;
  border: inset 3px green;
  width: 250px;
  height: 350px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
#buttons {
  gap: 20px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
