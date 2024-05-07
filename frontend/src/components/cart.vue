<script>
export default {
  data() {
    return {
      returnedItems: null,
    };
  },

  created() {
    this.returnedItems = JSON.parse(localStorage.getItem("addedItem"));
  },

  methods: {
    showCart() {
      const dialog = document.querySelector("dialog");
      const cart = document.getElementById("cart");
      console.log(this.returnedItems);

      cart.addEventListener("click", () => {
        dialog.showModal();
      });
    },

    closeCart() {
      const dialog = document.querySelector("dialog");
      const closeB = document.getElementById("closeModal");
      closeB.addEventListener("click", () => {
        dialog.close();
      });
    },

    clearCart() {
      localStorage.removeItem("addedItem");
      this.returnedItems = [];
      console.log("cart cleared!");
    },
  },
};
</script>

<template>
  <img
    id="cart"
    src="../assets/misc/cart.png"
    style="margin-left: auto; display: flex"
    alt="cart icon"
    @click="showCart()"
  />

  <dialog style="margin: auto">
    <div v-for="(items, index) in returnedItems" :key="index">
      <p>{{ items.prodName }}</p>
    </div>
    <div
      style="
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
        gap: 10px;
      "
    >
      <button>Go to checkout</button>
      <button @click="closeCart()" autofocus id="closeModal">
        Continue shopping
      </button>
      <button @click="clearCart()">Clear cart</button>
    </div>
  </dialog>
</template>

<style scoped>
::backdrop {
  background-color: black;
  opacity: 0.8;
}

/* dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
} */
</style>
