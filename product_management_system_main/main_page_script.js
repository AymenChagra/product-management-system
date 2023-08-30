let name=document.querySelector("#name");
let category=document.querySelector("#category");
let wholeSaleCost=document.querySelector("#wholesale-cost");
let profitMargin=document.querySelector("#profit-margin");
let extraCosts=document.querySelector("#extra-costs");
let taxRate=document.querySelector("#tax");
let discount=document.querySelector("#discount");
let quantity=document.querySelector("#quantity");
let price=document.querySelector(".price-value");
const addButton=document.querySelector(".add-button")

function calculatePrice(){
  if (wholeSaleCost.value!=""){
    let wholeSaleCostValue=parseInt(wholeSaleCost.value);
    let profitMarginValue=parseInt(profitMargin.value)/100;
    let extraCostsValue=parseInt(extraCosts.value);
    let discountValue=parseInt(discount.value)/100;
    let taxRateValue =parseInt(taxRate.value)/100;
    let result=((wholeSaleCostValue+(wholeSaleCostValue* profitMarginValue)+ extraCostsValue- discountValue)/(1- taxRateValue)).toFixed(2);
    price.innerHTML=result;
  }else{
    price.innerHTML="";
  }
}


let productsData;
if (localStorage.productsData != null){
  productsData=JSON.parse(localStorage.getItem("productsData"));
} else{
  productsData=[];
}


addButton.addEventListener("click",function(){
  let productInfo={
    name:name.value,
    category:category.value,
    wholesalecost:wholeSaleCost.value,
    profitMargin: profitMargin.value,
    extraCost: extraCosts.value,
    discount: discount.value,
    taxRate:taxRate.value,
    price:price.innerHTML,
    quantity:quantity.value
  }
  productsData.push(productInfo);
  console.log(productsData);
  localStorage.setItem("productsData",JSON.stringify(productsData));
  clearInput();
  displayData();
})

function clearInput(){
  name.value="";
  category.value="";
  wholeSaleCost.value="";
  profitMargin.value=0;
  extraCosts.value=0;
  discount.value=0;
  taxRate.value=0;
  price.innerHTML=""
  quantity.value=""
}


displayData()

/*
function displayData(){
  let table="";
  for ( let i=0; i<productsData.length;i++){
    table += `
    <tr>
      <td>${i}</td>
      <td>${productsData[i].name}</td>
      <td>${productsData[i].category}</td>
      <td class="tax-column">${productsData[i].taxRate}%</td>
      <td class="discount-column">${productsData[i].discount}%</td>
      <td class="profit-column">${productsData[i].profitMargin}%</td>
      <td>$${productsData[i].price}</td>
      <td> <button class="update-button">update</button></td>
      <td> <button class="delete-button">delete</button></td>
    </tr>
    `
  }
  document.querySelector("#tbody-content").innerHTML=table;
}
*/

//using map instedad of for loop
function displayData(){
  let table="";
  i=0;
  productsData.map(element=>{
    table += `
    <tr>
      <td>${i+=1}</td>
      <td>${element.name}</td>
      <td>${element.category}</td>
      <td class="tax-column">${element.taxRate}%</td>
      <td class="discount-column">${element.discount}%</td>
      <td class="profit-column">${element.profitMargin}%</td>
      <td>$${element.price}</td>
      <td> <button class="update-button">update</button></td>
      <td> <button class="delete-button">delete</button></td>
    </tr>
    `
  })
  document.querySelector("#tbody-content").innerHTML=table;
}
