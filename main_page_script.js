const name=document.querySelector("#name");
const category=document.querySelector("#category");
const wholeSaleCost=document.querySelector("#wholesale-cost");
const profitMargin=document.querySelector("#profit-margin");
const extraCosts=document.querySelector("#extra-costs");
const taxRate=document.querySelector("#tax");
const discount=document.querySelector("#discount");
const quantity=document.querySelector("#quantity");
const price=document.querySelector(".price-value");


function calculatePrice(){
  if (wholeSaleCost.value!=""){
    let wholeSaleCostValue=parseInt(wholeSaleCost.value);
    let profitMarginValue=parseInt(profitMargin.value)/100;
    let extraCostsValue=parseInt(extraCosts.value);
    let discountValue=parseFloat(discount.value)/100;
    let taxRateValue =parseInt(taxRate.value)/100;
    console.log(wholeSaleCostValue,profitMarginValue,extraCostsValue, discountValue,taxRateValue);
    let result=(wholeSaleCostValue+(wholeSaleCostValue* profitMarginValue)+ extraCostsValue- discountValue)/(1- taxRateValue);
    price.innerHTML=result;
  }else{
    price.innerHTML="";
  }
}
