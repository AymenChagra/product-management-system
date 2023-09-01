let name=document.querySelector("#name");
let category=document.querySelector("#category");
let wholeSaleCost=document.querySelector("#wholesale-cost");
let profitMargin=document.querySelector("#profit-margin");
let extraCosts=document.querySelector("#extra-costs");
let taxRate=document.querySelector("#tax");
let discount=document.querySelector("#discount");
let quantity=document.querySelector("#quantity");
let price=document.querySelector(".price-value");
const addButton=document.querySelector(".add-button");
const deleteProductButton=document.querySelector(".delete-button");
const updateProductButton=document.querySelector(".update-button");
const deleteAllButton=document.querySelector(".delete-all-button");
let theme = "creating"; //this variable is necessary to manage the add and update 
let tmp;       //this variable is necessary to store the temperay value of the counter i


//This function is responsible for calculating the price 
//It starts when entering the wholesalecost
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
if (localStorage.productsDataStorage != null){
  productsData=JSON.parse(localStorage.getItem("productsDataStorage"));
} else{
  productsData=[];
}

//This event is responsible for creating new products when clicking on add
//and updating the product when we are in the update mode
addButton.addEventListener("click",function(){
  let productInfo={name:name.value,
    category:category.value,
    wholesalecost:wholeSaleCost.value,
    profitMargin: profitMargin.value,
    extraCost: extraCosts.value,
    discount: discount.value,
    taxRate:taxRate.value,
    price:price.innerHTML,
    quantity:quantity.value //adding the quantity property is optional
  }
  if(theme==="creating"){
    for (let i=0; i<quantity.value; i++){
      productsData.push(productInfo);
    }
  }else{
    productsData[tmp]=productInfo;
    addButton.innerHTML="Add";
    theme="creating";
    //the quantity input should be back to the defaut
    //value after the update is finished
    quantity.disabled=false;
    quantity.style.cursor="auto";
  }
  localStorage.setItem("productsDataStorage",JSON.stringify(productsData));
  clearInput();
  displayData(); // we have to display the new created product after clicking on add  
})
displayData()  //we have to display the data available in the local starage



//This event is responsible for clearing the inputs after clicking on add
function clearInput(){
  name.value="";
  category.value="";
  wholeSaleCost.value="";
  profitMargin.value=0;
  extraCosts.value=0;
  discount.value=0;
  taxRate.value=0;
  price.innerHTML="";
  quantity.value="1"
}


//This function is responsible for displaying the created products 
function displayData(){
  let table="";
  i=0;
  productsData.forEach(element=>{
    table += `
    <tr>
      <td>${i+1}</td>
      <td>${element.name}</td>
      <td>${element.category}</td>
      <td class="tax-column">${element.taxRate}%</td>
      <td class="discount-column">${element.discount}%</td>
      <td class="profit-column">${element.profitMargin}%</td>
      <td>$${element.price}</td>
      <td> <button class="update-button" onclick="updateData(${i})">Update</button></td>
      <td> <button class="delete-button" onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `
    i+=1;
  })
  document.querySelector("#tbody-content").innerHTML=table;
  if(productsData.length>0){
    deleteAllButton.style.display="block";
  }
}

//This function is responsible for deleting a single product
function deleteData(i){
  productsData.splice(i, 1);
  localStorage.productsDataStorage=JSON.stringify(productsData);
  displayData(); //we have to dispalay the new data after deleting an element
}


//This function deletes all the products
deleteAllButton.addEventListener("click",function(){
    productsData.splice(0);  // prodctsDta is the array that carries data           
    localStorage.productsDataStorage=JSON.stringify(productsData);
    deleteAllButton.style.display="none";
    displayData();
})


//This function is responsible for updating the products  
function updateData(i){
  name.value=productsData[i].name;
  category.value=productsData[i].category;
  wholeSaleCost.value=productsData[i].wholesalecost;
  profitMargin.value=productsData[i].profitMargin;
  extraCosts.value=productsData[i].extraCost;
  discount.value=productsData[i].discount;
  taxRate.value=productsData[i].taxRate;
  calculatePrice();
  addButton.innerHTML="update";
  theme="updating";
  tmp=i;
  
  //the quantity should be disabled because we are 
  //only updating one produt 
  quantity.disabled=true;
  quantity.style.cursor="no-drop";
  quantity.value="";
}