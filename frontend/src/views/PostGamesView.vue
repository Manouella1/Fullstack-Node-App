<script>
export default {
  data() {
    return {
      pubPro: null,
      productName: "",
      productImage: "/src/assets/covers/default.png",
      productPrice: null,
      productCategory: "",
      productId: null,
      newContainer: [],
      gamesContain: [],
    };
  },

  created() {
    this.getGames();
  },

  methods: {
    formSubmit() {
      // console.log("form submitted!");
      fetch("http://localhost:3000/games/suggestions", {
        body: JSON.stringify({
          pubPro: this.pubPro,
          productSerial: null,
          productName: this.productName,
          productImage: this.productImage,
          productStock: null,
          productPrice: this.productPrice,
          productCategory: this.productCategory,
        }),

        headers: { "Content-type": "application/json" },
        method: "POST",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    },

    putSubmit() {
      // console.log("form submitted!");
      fetch("http://localhost:3000/games/edit", {
        body: JSON.stringify({
          pubPro: this.pubPro,
          productSerial: null,
          productName: this.productName,
          productImage: this.productImage,
          productStock: null,
          productPrice: this.productPrice,
          productCategory: this.productCategory,
          productId: this.productId
        }),

        headers: { "Content-type": "application/json" },
        method: "PUT",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    },

    getGames() {
      const containGames = [];
      fetch("http://localhost:3000/games")
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
  <h1>
    Couldn't find your game ? Is something missing ? Send us a suggestion !
  </h1>
  <!-- <div id="buttons">
    <button>POST</button>
    <button>PUT</button>
    <button>DELETE</button>
  </div> -->

  <section id="divide2">
    <!-- POST -->
    <div class="marginal">
      <!-- pubPro, dvs vilken publisher som är kopplat med foreign key -->
      <form
        action="http://localhost:3000/games/suggestions"
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
        <p>
          <input type="submit" value="Send" />
        </p>
      </form>
    </div>
    <!-- PUT -->
    <div class="marginal">
      <form
        action="http://localhost:3000/games/edit"
        @submit.prevent="putSubmit"
        method="put"
        id="gameForm"
      >
        <h1>PUT</h1>
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
          v-model="this.productPrice"
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
        <p>Game id</p>
        <input
          type="text"
          name="gameId"
          id="gameId"
          placeholder="product ID..."
          v-model="productId"
        />
        <p>
          <button onclick="putSubmit()">Send</button>
        </p>
      </form>
    </div>
    <!-- DELETE -->
    <div class="marginal">
      <form
        action="http://localhost:3000/games/suggestions"
        @submit.prevent="formSubmit"
        method="delete"
        id="gameForm"
      >
        <h1>DELETE</h1>
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
          v-model="this.productPrice"
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
      </form>
    </div>
    <!-- Side list -->
    <div class="marginal-side">
      <p style="text-align: center;" v-for="games in gamesContain" :title="games.productSerial">{{ games.productName }}
      <hr />
    </p>
    </div>
  </section>
</template>

<style scoped>
#divide2 {
  display: flex;
  justify-content: space-evenly;
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
