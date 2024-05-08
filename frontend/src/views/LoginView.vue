<script setup>
import { ref } from "vue";
import anime from "animejs";

import { useRouter } from "vue-router";
import axios from "axios";

// *Checklista*
// props
//

const router = useRouter();

const email = ref("");
const password = ref("");
const warningMessage = ref("");
const current = ref(null);

const validateAndNavigate = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    warningMessage.value = "Invalid user";
  } else {
    const { data } = await axios.get(
      "https://pb.nopatan.com/api/collections/user/records"
    );
    const user = data.items.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (user) {
      // slippa logga in igen
      localStorage.setItem("name", user.name);
      router.push(`/online/${user.name}`); // När man har loggat in på sin profil så kommer man även se sitt nan efter online/
    } else {
      warningMessage.value = "Invalid user";
    }
  }
};

// Definierad PROPS
defineProps({
  emailPlaceholder: String,
  required: true,
});

const focusField = (field) => {
  if (current.value) current.value.pause();

  let strokeDashoffsetValue;
  let strokeDasharrayValue;

  if (field === "email") {
    strokeDashoffsetValue = 0;
    strokeDasharrayValue = "240 1386";
  } else if (field === "password") {
    strokeDashoffsetValue = -336;
    strokeDasharrayValue = "240 1386";
  } else if (field === "submit") {
    strokeDashoffsetValue = -730;
    strokeDasharrayValue = "530 1386";
  }

  current.value = anime({
    targets: "path",
    strokeDashoffset: {
      value: strokeDashoffsetValue,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: strokeDasharrayValue,
      duration: 700,
      easing: "easeOutQuart",
    },
  });
};

const navigateToRegister = () => {
  router.push({ name: "Register" }); // Använd ruttnamnet som definierats i din router konfiguration
};
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="left">
        <div class="login">Login</div>
        <div class="eula">
          Don't have an account yet?
          <div>
            <router-link to="/register">Create one now!</router-link>
          </div>
        </div>
      </div>
      <div class="right">
        <svg viewBox="0 0 320 300">
          <!-- SVG content -->
          <defs>
            <linearGradient
              inkscape:collect="always"
              id="linearGradient"
              x1="13"
              y1="193.49992"
              x2="307"
              y2="193.49992"
              gradientUnits="userSpaceOnUse"
            >
              <stop style="stop-color: #ff00ff" offset="0" id="stop876" />
              <stop style="stop-color: #ff0000" offset="1" id="stop878" />
            </linearGradient>
          </defs>
          <path
            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
          />
        </svg>
        <div class="form">
          <label for="email">Email</label>

          <!--tar emot string via props-->
          <input
            v-model="email"
            type="email"
            id="email"
            :placeholder="emailPlaceholder"
            @focus="focusField('email')"
          />
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            @focus="focusField('password')"
          />
          <input
            @click="validateAndNavigate"
            type="submit"
            id="submit"
            value="Log in"
            @focus="focusField('submit')"
          />
        </div>
        <p v-if="warningMessage">{{ warningMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://rsms.me/inter/inter-ui.css");
::selection {
  background: #2d2f36;
}
::-webkit-selection {
  background: #2d2f36;
}
::-moz-selection {
  background: #2d2f36;
}
body {
  font-family: "Inter UI", sans-serif;
  margin: 0;
  padding: 20px;
  border-radius: 10%;
}

a {
  text-decoration: none;
}
p {
  color: red;
  margin-left: 7em;
}
.page {
  /* background: #e2e2e5; */
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  position: absolute;
  place-content: center;
  width: calc(100% - 40px);
}
@media (max-width: 767px) {
  .page {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}
.left {
  background: white;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}
.login {
  color: black;
  font-size: 50px;
  font-weight: 900;
  margin: 50px 40px 40px;
}
.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
}
.right {
  background: #474a59;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}
svg {
  position: absolute;
  width: 320px;
}
path {
  fill: none;
  stroke: url(#linearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form {
  margin: 40px;
  position: absolute;
}
label {
  color: #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}
input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}
input::-moz-focus-inner {
  border: 0;
}
#submit {
  color: #707075;
  margin-top: 40px;
  transition: color 300ms;
}
#submit:focus {
  color: #f2f2f2;
}
#submit:active {
  color: #d0d0d2;
}
</style>
