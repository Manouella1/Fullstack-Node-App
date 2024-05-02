const form = document.querySelector("#gameForm");
const title = document.querySelector("#gameTitle");
const price = document.getElementById("gamePrice");
const category = document.getElementById("gameCategory");
const output = document.getElementById("output");

function aPost(event) {
  event.preventDefault();
  let titleVal = title.value;
  let priceVal = price.value;
  let categoryVal = category.value;
}
