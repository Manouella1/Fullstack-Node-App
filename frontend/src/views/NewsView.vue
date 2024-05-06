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
    <h2 style="font-weight: bold">{{ article.title }}</h2>
    <span class="name_date">
      <p>By: {{ article.author }}</p>
      <p>At: {{ article.date }}</p>
    </span>
    <h3 style="width: 500px">{{ article.text }}</h3>
    <p>Tags: {{ article.tags.join(" ,") }}</p>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 50px;
}

.name_date {
  display: flex;
  gap: 10px;
}
</style>
