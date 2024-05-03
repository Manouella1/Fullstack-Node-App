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
      fetch("http://localhost:3000/news")
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
    <h2>{{ article.title }}</h2>
    <h3>{{ article.author }}</h3>
    <p>{{ article.text }}</p>
    <p>Tags: {{ article.tags.join(" ,") }}</p>
    <p>{{ article.date }}</p>
  </article>

  <section></section>
</template>

<style>
.articleDisp {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
}
</style>
