<template>
    <div class="home_wrapper">
      <div class="container_wrapper">
        <div class="home_layout">
         
          <div class="flex_item">
            <img
              src="/tekken.jpg"
              alt="Tekken Image"
            />
            <div class="home_title_items">
              <p>Vintage Gems</p>
            </div>
            <div class="content_items">
                Rediscover the magic of classic games with our collection of pre-loved gems.
            </div>
          </div>
        <div class="flex_item">
            <img
              src="/halo2.jpg" 
              alt="Halo 2 Image"
            />
            <div class="home_title_items">
              <p>Quality Classics</p>
            </div>
            <div class="content_items">
                Immerse yourself in our library of preserved games, ensuring you get the best of gaming history.
            </div>
          </div>
        <div class="flex_item">
            <img
              src="/Colossus.webp" 
              alt="Shadow of the Colossus Image"
            />
            <div class="home_title_items">
              <p>Quality on a Budget</p>
            </div>
            <div class="content_items">
            Find the perfect balance between quality and value with our selection of affordable games.
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  body {
    margin: 0;
    overflow-x: hidden; 
  }
  
  .home_theme {
    width: 100%; 
    padding-top: 60px; 
  }
  
  .container_wrapper {
    max-width: 1200px; 
    margin: 0 auto;    
    padding-left: 20px; 
  }
  
  .home_layout {
    display: flex;
    justify-content: flex-start; 
    gap: 20px;                   
  }
  
  .flex_item {
    flex: 1 1 30%;                
    min-width: 300px;              
    max-width: 33%;                 
    box-sizing: border-box;        
    padding: 12px;
    text-align: left;               
  }
  
  .flex_item img {
    width: 100%; 
  }
  
  .home_title_items {
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 1.1px;
    color: hsla(160, 100%, 37%, 1);
    
  }
  
  .home_title_items p {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: left;
  }
  
  .content_items {
    font-weight: 500;
    margin-top: 10px;
    font-size: 15px;
    color: #9a9595;
    line-height: 1.5em;
    text-align: left; 
    white-space: normal; 
  }
  @media (max-width: 768px) {
  .flex_layout {
    flex-direction: column; 
    gap: 40px; 
  }

  .flex_item {
    max-width: 100%; 
    min-width: 0; 
  }
}
  </style>
  