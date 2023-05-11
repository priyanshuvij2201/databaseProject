const orderClick=document.getElementById('order_final');
const setPlace=document.getElementById('name');
const tableDisp=document.querySelector("#tableDisplay")
const submit=document.getElementById("add_product_submit");
const dispPrice=document.getElementById("p_supplier_price");
const redirectButton=document.getElementById("redirectButton");
redirectButton.addEventListener("click",(e)=>{
    
        window.location.href = 'generate_bill.html';
      
})
submit.addEventListener("click",(e)=>{
    serverUrl="http://localhost:3000/orderCart";
   clickEventHandler();
})

var serverUrl="http://localhost:3000/getName";
  function getTranslateUrl(){
    return serverUrl;
 }

 orderClick.addEventListener("keydown",(event)=>{
    console.log("A key was inserted:", event.key);
    
 })

  
  
  
 function clickEventHandler(){
    fetch(getTranslateUrl(serverUrl))
    .then(Response => Response.json())
    .then(json => {
     var temp = "";
     var a=0;
     let myArray = [];
     var totalBill=0;

     json.forEach(element => {
        if (myArray.includes(element.orderid)) {
            // Value already exists in array
          } else {
            // Value does not exist in array
            // Add the value to the array
            myArray.push(element.orderid);
          }
          
        if(element.orderid==orderClick.value){
            a=1;
            totalBill=totalBill+element.total_amt;
             temp += "<tr>";
             temp += "<td>" + element.orderid + "</td>";
             temp += "<td>" + element.productid + "</td>";
             temp += "<td>" + element.firstname +" "+element.lastname + "</td>"; 
             temp += "<td>" + element.total_amt + "</td>";
             temp += "<td>" + element.discount + "</td>";
             temp += "<td>" + element.loyalty_type + "</td></tr>";
    }});
    var availableID="";
    for (let i = 0; i < myArray.length; i++) {
        availableID=availableID+ " "+myArray[i];
      }
    if(a==1){
        console.log(totalBill);
        dispPrice.placeholder=totalBill;
     tableDisp.innerHTML=temp;}
     else
     alert(`Wrong OrderId,Order still in cart are ${availableID}`);
     
  })
  .catch(errorhandler)
 }

 

 