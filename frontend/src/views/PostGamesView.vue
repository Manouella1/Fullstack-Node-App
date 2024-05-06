<script>
export default {
  data() {
    return {
      pubPro: null,
      productName: "",
      productImage: "/src/assets/covers/default.png",
      productPrice: null,
      productCategory: "",
      newContainer: [],
    };
  },

  created() {
    // this.getGames();
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

    // getGames() {
    //   const containGames = [];
    //   fetch("http://localhost:3000/games")
    //     .then((resp) => resp.json())
    //     .then((results) => {
    //       results.forEach((result) => {
    //         containGames.push(result);
    //       });
    //       this.newContainer = containGames;
    //       console.log(this.newContainer);
    //     });
    // },
  },
};
</script>

<template>
  <h1>
    Couldn't find your game ? Is something missing ? Send us a suggestion !
  </h1>
  <section id="divide2">
    <div class="marginal">
      <!-- pubPro, dvs vilken publisher som är kopplat med foreign key -->
      <form
        action="http://localhost:3000/games/suggestions"
        @submit.prevent="formSubmit"
        method="post"
        id="gameForm"
      >
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
        <p>
          <input type="submit" value="Send" />
        </p>
      </form>
    </div>
    <div id="window">
      <p id="output"></p>
      <ul>
        <li></li>
      </ul>
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
  background-color: rgb(51, 49, 49);
  border-radius: 20px;
  margin-top: 50px;
  border: inset 3px green;
  width: 250px;
  height: 350px;
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
</style>
