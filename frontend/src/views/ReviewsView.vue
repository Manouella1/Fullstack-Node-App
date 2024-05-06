<template>
    <div class="review-grid">
      <div class="review-card" v-for="review in reviews" :key="review._id">
        <div class="card-content">
     <p class="card-text">{{ review.title }}</p>
          <div class="rating">
          <i class="fa fa-star" v-for="star in 5" :key="star" :class="{ 'active-star': star <= review.stars, 'inactive-star': star > review.stars }"></i>
        </div>
        </div>
        <div class="card-footer">
          <div class="avatar-div">
        
          </div>
          <div class="review-text">
            <p class="review-head"> {{ review.text }}</p>
            <p class="review-title">{{ review.username }}</p>
         <!--    <p class="review-sub-title">{{ review.date }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const reviews = ref([]);
  
      const fetchReviews = () => {
        fetch('http://localhost:3000/api/reviews')
          .then(response => response.json())
          .then(data => reviews.value = data)
          .catch(error => console.error('Error:', error));
      };
  
      onMounted(fetchReviews);
  
      return { reviews };
    }
  }
  </script>
  
  

<style scoped>
.active-star {
  color: gold;
}

.inactive-star {
  color: #ccc;
}

.review-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    padding: 1rem;
  }
  
  .review-card {
    border: 2px #f8f8fe solid;
    border-radius: 2%;
    width: 100%;
    padding: 1.5rem 2rem;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    line-height: 1.3rem;
    box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.065);
    background-color: #fff;
  }
  

  .card-text {
    margin: 1rem 0;
    color: #000;
  }
  
  .card-footer {
    display: flex;
    align-items: center;
  }
  
 
  .review-text {
    text-align: start;
    margin-left: 0.5rem;
    color: #000;
  }
  
  .review-title {
    font-weight: 700;
    color: #000;
  }
  
  </style>
  