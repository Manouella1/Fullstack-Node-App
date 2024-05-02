<script>
export default {
  data() {
    return {
      games: [],
      covers: [],
    };
  },

  created() {
    this.fetchGames();
  },

  methods: {
    fetchGames() {
      fetch("http://localhost:3000/games")
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result[0].productName);
          console.log(result.length);
          console.log(result[1].productImage);
          const game = [],
            cover = [];
          for (let i = 0; i < result.length; i++) {
            game.push(result[i].productName);
            cover.push(result[i].productImage);
          }
          console.log(game);
          this.games = game;
          this.covers = cover;
          console.log(this.games);
          console.log(this.covers);
        });
    },
  },
};
</script>

<template>
  <h1>Games for sale !</h1>
  <h1>Our current stock:</h1>
  <img class="banner" src="../assets/misc/11.png" alt="banner 1" />
  <ul>
    <li v-for="(game, index) in games" :key="index">
      <img :src="covers[index]" alt="" />
      {{ game }}
      <button style="display: flex; margin: auto; margin-top: 30px">
        Buy now
      </button>
    </li>
  </ul>
  <img class="banner" src="../assets/misc/12.png" alt="banner 2" />
</template>

<style scoped>
.banner {
  width: 75%;
  height: 200px;
  opacity: 0.6;
  border-radius: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}

img {
  display: flex;
  margin: auto;
  width: 170px;
  height: 220px;
}

#display {
  /* display: flex;
  flex-wrap: wrap; */
}

ul {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 25% 25%;
  row-gap: 10px;
}

li {
  list-style: none;
  text-align: center;
  /* border: 2px inset rgb(255, 123, 0);
  border-radius: 10px; */
  padding: 2px;
  margin: 5px;
  transition: border 0.3s;
}

li:hover {
  /* border: 2px outset rgb(0, 17, 255); */
}

@media screen and (max-width: 1000px) {
  /* li {
    display: flex;
    flex-wrap: wrap;
  } */

  ul {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 25% 25% 25% 25%;
    row-gap: 10px;
  }
}

@media screen and (max-width: 700px) {
  /* li {
    display: flex;
    flex-wrap: wrap;
  } */

  .banner {
    width: 90%;
    height: 150px;
  }

  ul {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 25% 25% 25% 25%;
    row-gap: 10px;
  }
}

@media screen and (max-width: 450px) {
  .banner {
    display: none;
  }

  /* li {
    display: flex;
    flex-wrap: wrap;
  } */

  ul {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 25% 25% 25% 25%;
    row-gap: 10px;
  }
}
</style>
