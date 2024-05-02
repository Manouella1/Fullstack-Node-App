<script>
export default {
  data() {
    return {
      var: [],
    };
  },
  created() {
    fetch("https://localhost:3000/news").then().then();
  },

  methods: {
    function1() {},
    function2() {},
  },
};
</script>

<template>
  <h1>The latest news</h1>
</template>

<style></style>
