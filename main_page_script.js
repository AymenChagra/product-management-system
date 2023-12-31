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
const deleteAllButton=document.querySelector(".delete-all-button");
const searchByNameButton=document.querySelector("#search-by-name");
const searchByCategoryButton=document.querySelector("#search-by-category");
const searchBar=document.querySelector("#search")
let theme = "creating"; //this variable is necessary to manage the add and update 
let tmp;       //this variable is necessary to store the temperay value of the counter i
let searchType="name/ref";
let resultsCount=document.querySelector(".count");
let noResult=document.querySelector(".no-result");
const deleteAllDialog= document.querySelector("#delete-all-dialog");
const cancelDeleteAllBtn=document.querySelector("#cancel-delete-all");
const deleteAllDefinitelyBtn=document.querySelector("#delete-all-definitely");
const deleteItemDialog= document.querySelector("#delete-item-dialog");
const cancelDeleteItem=document.querySelector("#cancel-delete-item");
const deleteProductdefinitely=document.querySelector("#delete-item-definitely");


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
    addButton.innerHTML="Add"+'<i class="fa-solid fa-plus"></i>';
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
      <td> <button class="delete-button" onclick="showDeleteDialog(${i})">Delete</button></td>
    </tr>
    `
    i+=1;
  })
  document.querySelector("#tbody-content").innerHTML=table;
  noResultHandling()
}

function noResultHandling(){
  if(productsData.length>0){                                                                       //When there are available products/results to be displayed
    deleteAllButton.style.display="block";
    noResult.style.display="none";
  }else{                                                                                           //When there no available products/results to be displayed
    deleteAllButton.style.display="none";
    if (searchBar.value==""){
      noResult.textContent="No products yet";
    }else{
      noResult.textContent="No products available with this search.";
    }
    noResult.style.display="block";
  }
}



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
  addButton.innerHTML="Update"+ '<i class="fa-solid fa-arrow-up-long"></i>';
  theme="updating";
  tmp=i;
  
  //the quantity should be disabled because we are 
  //only updating one produt 
  quantity.disabled=true;
  quantity.style.cursor="no-drop";
  quantity.value="";
}


//This function gets the search type (by name or by category)
function getSearchType(id){
  if(id==="search-by-name"){
    searchType="name/ref";
  }else{
    searchType="category";
  }
  searchBar.placeholder="Search by "+ searchType;
  searchBar.focus();
  findElements()                                                                   //when changing the search type we must have to reload the
}

//This function allows search for elements according to the type of search
function findElements(){
  let searchArray= [];
  const value=searchBar.value.toLowerCase();                                         //getting the input values
  productsData.map(ele=>{                                                            //creating a loop over the data to find the input values
    if (searchType==="name/ref" && ele.name.toLowerCase().includes(value)){
        searchArray.push(ele);                                                      //if an element matches the data it will be added to the findElements array
      }
    else if(searchType==="category" && ele.category.toLowerCase().includes(value)){
        searchArray.push(ele);
      }
  })
  productsData=searchArray;                                                        //replacing the original data temperary with by the data that the user is searching for 
  resultsCount.innerHTML="("+productsData.length+")";
  resultsCount.style.visibility="visible";
  displayData();                                                                   //displaying the data that the user is searching for
  productsData=JSON.parse(localStorage.getItem("productsDataStorage"));              //restoring the original data
  
}


//The following functions are responsible for the delete all part

deleteAllButton.onclick = function() {
  deleteAllDialog.showModal();
}
window.onclick = function(event) {
  if (event.target == deleteAllDialog) {
    deleteAllDialog.close();
  } else if (event.target == deleteItemDialog) {
    deleteItemDialog.close();
  }
}
cancelDeleteAllBtn.onclick=function() {
    deleteAllDialog.close();
}
deleteAllDefinitelyBtn.onclick=function(){
  productsData.splice(0);  // prodctsDta is the array that carries data           
  localStorage.productsDataStorage=JSON.stringify(productsData);
  deleteAllButton.style.display="none";
  displayData();
  deleteAllDialog.close();
}



//The following functions are responsible for deleteting a single product
function showDeleteDialog(i) {
  deleteItemDialog.showModal();
  tmp=i;
}
cancelDeleteItem.onclick=function() {
  deleteItemDialog.close();
}
deleteProductdefinitely.onclick=function(temp){
  productsData.splice(tmp, 1);
  localStorage.productsDataStorage=JSON.stringify(productsData);
  displayData(); //we have to dispalay the new data after deleting an element
  deleteItemDialog.close();
}






