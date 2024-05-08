<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

import FooterComponent from "./views/FooterComponent.vue";
</script>

<template>
  <header>
    <!-- <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    /> -->

    <div class="wrapper">
      <HelloWorld msg="Hello and welcome to GameStore!" />

      <cart />

      <nav>
        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/news">News</RouterLink>
          <RouterLink to="/games">Games</RouterLink>
          <RouterLink to="/games/suggestions">Game suggestion</RouterLink>
          <RouterLink to="/orders">Orders & Stock</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/reviews">Reviews</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/customers">customers</RouterLink>
        </div>
        <div>
          <RouterLink to="/carts"
            ><i class="fa-solid fa-cart-shopping" style="color: #a8aaad"></i
          ></RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
  <FooterComponent />
</template>

<style scoped>
#app {
  min-height: 100vh;
  box-sizing: border-box;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  /* display: block;
  margin: 0 auto 2rem; */
}

.nav-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    /* display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    /* display: flex;
    place-items: flex-start;
    flex-wrap: wrap; */
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
