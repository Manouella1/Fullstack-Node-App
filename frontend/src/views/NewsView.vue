<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.getArticles();
  },

  methods: {
    getArticles() {
      fetch("http://localhost:3000/api/news")
        .then((resp) => resp.json())
        .then((result) => {
          let containNews = [];
          for (let i = 0; i < result.length; i++) {
            containNews.push(result[i]);
          }
          this.articles = containNews;
          console.log(this.articles);
        });
    },
  },
};
</script>

<template>
  <h1 style="text-align: center">The latest news and blogs from our users</h1>
  <article
    class="articleDisp"
    v-for="(article, index) in articles"
    :key="index"
  >
    <h2 style="font-weight: bold; color: green">{{ article.title }}</h2>
    <span class="name_date">
      <p>By: {{ article.author }}</p>
      <p>At: {{ article.date }}</p>
    </span>
    <h3 style="max-width: 650px">{{ article.text }}</h3>
    <p style="font-style: italic">Tags: {{ article.tags.join(" ,") }}</p>
    <hr
      style="
        color: green;
        width: 550px;
        height: 5px;
        background-color: green;
        margin-top: 15px;
      "
    />
  </article>
</template>

<style>
.articleDisp {
  background: linear-gradient(to right, black, rgb(24, 24, 24));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 50px;
  padding: 20px;
  border-radius: 15px;
}

.name_date {
  display: flex;
  gap: 10px;
}
</style>
