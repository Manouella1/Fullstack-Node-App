<template>
    <div class="cart-container">
      <h1>Cart</h1>
      <div class="container">
      <div class="form">
        <header class="cart_header">
          <span class="text-grey" id="checkout__title">Cart</span>
        </header>
        <section class="cart_info">
          <div class="cart_items">
            <div class="cart_item">
              <div class="cart_text">
                <span>Exclusive Free Shipping</span>
                <span class="text-grey">Limited Time Offer</span>
              </div>
              <div class="shipping_price">Free</div>
            </div>
            <div class="cart_item">
              <div class="cart_text">
                <span>Trustworthy Delivery Companies</span>
              </div>
            </div>
            <div class="cart_item">
              <div class="delivery_option">
                <select v-model="selectedDeliveryOption"  class="delivery_select">
                  <option disabled value="">Please select one</option>
                  <option v-for="cart in carts" :key="cart.cartId" :value="cart">
                    {{ cart.deliveryOption }} - {{ cart.deliveryCompany }}
                  </option>
                </select>
                <button class="btn btn__secondary" @click="applyDeliveryOption">Apply Delivery Option</button>
              </div>
            </div>
          </div>
        </section>
        <section class="cart_summary">
          <div class="summary_container">
            <span class="text-grey">Subtotal</span>
            <span>$0</span>
          </div>
          <div class="summary_container">
            <span class="text-grey">Shipping</span>
            <span>Free</span>
          </div>
        </section>
        <section class="cart_total">
          <div class="total__container">
            <span>TOTAL</span>
            <span>$0</span>
          </div>
          <span class="text-grey">
            Normal delivery time is 5-6 working days (extended during high season).
          </span>
        </section>
      </div>
      <footer class="cart_buttons">
        <button class="btn btn__secondary">Cancel</button>
        <button class="btn btn__primary">Checkout and Order Processing</button>
      </footer>
       </div>
       </div>
       <p class="text-center">Your basket is empty, <br>to start shopping click <span class="underline"><router-link to="/Games">here</router-link></span></p>
  </template>
  
  <script>
  export default {
    data() {
      return {
        carts: [],
        isLoading: false,
        error: null
      };
    },
    mounted() {
      this.fetchCarts();
    },
    methods: {
      async fetchCarts() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await fetch('http://localhost:3000/api/carts');
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          this.carts = data;
        } catch (error) {
          this.error = "There was an error fetching the carts: " + error.message;
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
 
   *, html, body {
    box-sizing: border-box;
  }
  
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-weight: normal;
    background-color: #111111;
    color: #cecece;
  }
  
  a {
    text-decoration: none;
    color: #46A66E
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  
 
.btn {
  display: inline-block;
  outline: 0;
  border: none;
  border: 1.5px solid rgba(1, 1, 1, 0.4);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.19), 0 1px 1px rgba(0, 0, 0, 0.23),
    inset 1px 1px 1px 0 rgba(255, 255, 255, 0.05);
  cursor: pointer;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  box-shadow: 0 8px 22px 0 rgba(14, 239, 55, 0.15),
    0 4px 6px 0 rgba(61, 241, 16, 0.2);
}

.btn__round {
  padding: 8px;
  border-radius: 100%;
  border: none;
  flex: 0 1 0%;
}

.btn__secondary {
  background-color: #242424;
  color: #686868;
}

.btn__primary {
  background-color: #46A66E;
  color: #fff;
}

.container {
  border: 3px solid rgb(15 15 15 / 50%);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23),
    inset 1px 1px 1px 0 rgba(255, 255, 255, 0.05),
    inset -1px -1px 1px 0 rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  max-width: 500px;
  background-image: url("https://assets-global.website-files.com/62e3ee10882dc50bcae8d07a/631a5d4631d4c55a475f3e34_noise-50.png");
  background-size: 20px 20px;
  background-color: #1a1a1a;
  margin-left: auto;
}

.form {
  padding: 1rem 1rem 0rem 1rem;
}

.cart_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

#cart_title {
  font-size: 1rem;
}

.cart_info,
.cart_summary {
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
}

.cart_info,
.cart_items,
.cart_summary {
  display: flex;
  flex-direction: column;
}

.cart_info {
  padding: 0.5rem 0rem;
}

.cart_item {
  display: flex;
  padding: 8px 0px;
  gap: 12px;
}

.cart_text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.shipping_price {
  margin-left: auto;
}

.delivery_option {
  padding: 1rem 0rem;
  display: flex;
  gap: 8px;
  justify-content: space-between;
}
.delivery_option input {
  flex-grow: 1;
  overflow: hidden;
  box-shadow: inset 2.5px 2.5px 2px 1px rgba(0, 0, 0, 0.04),
    inset -2.5px 0px 2px 1px rgba(1, 1, 1, 0.04);
  padding: 8px 12px;
  background: #101010;

  border: none;
  border-radius: 8px;

  white-space: nowrap;
  font-size: 15px;
  color: #fff;

  appearance: none;
  transition: border 0.15s ease 0s;
}

.delivery_select  {
  width: 250px;
  padding: 8px 12px;
  background: #101010;
  color: #686868;
  border: none;
  border-radius: 2px;
}



.cart-summary{
  padding: 10px 0;
}

.summary_container {
  display: flex;
  padding: 8px 0px;
}

.summary_container span:nth-child(2) {
  margin-left: auto;
}

.cart_buttons {
  box-shadow: 0 -1px 2px 0 rgba(255, 255, 255, 0.1),
    0 -3px 0 0 rgba(20, 20, 20, 1);
  padding: 1rem;
  display: flex;
  gap: 8px;
}

.cart_buttons button {
  flex: 1 1 0%;
}

.cart_total {
  padding: 20px 0;
}

.total__container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.text-grey {
  color: #6f6f6f;
  font-size: 0.8rem;
}
.text-center  {
    margin: auto;
    text-align: center;
}
</style>

  