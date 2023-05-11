const orderClick=document.getElementById('order_insert');
const setPlace=document.getElementById('name');
const setHolder=document.getElementById('customer_id');
const productClick=document.getElementById('productId');
const employee_id=document.getElementById('employee_id');
const productQuantity=document.getElementById('productQuantity');
const setPlaceholderProduct=document.getElementById('product_id');
const setPlaceholderEmployee=document.getElementById('empDispId');
var serverUrl="http://localhost:3000/getName";
  function getTranslateUrl(){
    return serverUrl;
 }

 employee_id.addEventListener("keydown",(e)=>{
    console.log("A key was inserted:", event.key);
    serverUrl="http://localhost:3000/getEmployeeName";
    onClickEmployee(); 
 })
 
orderClick.addEventListener("keydown", function(event) {
    console.log("A key was inserted:", event.key);
    serverUrl="http://localhost:3000/getName";
    clickEventHandler();
    

    // Insert here the code you want to run every time a key is inserted
  });
  productClick.addEventListener("keydown", function(event) {
    console.log("A key was inserted:", event.key);
    serverUrl="http://localhost:3000/getProductName";
    onClickProduct(); 

    // Insert here the code you want to run every time a key is inserted
  });

  
  
  
  function clickEventHandler(){
    fetch(getTranslateUrl(serverUrl))
    .then(Response => Response.json())
    .then(json => {console.log(json[0].customerid==orderClick.value);
        json.forEach(element => {
       if(element.customerid==orderClick.value){
       console.log(element.firstname); 
      setHolder.innerHTML="   "+element.firstname+" "+element.lastname;
       }
       
        });
     
     
  })
  .catch(errorhandler)
 }

 function onClickProduct(){
    
    fetch(getTranslateUrl(serverUrl))
    .then(Response => Response.json())
    .then(json => {
        var a=0;
        json.forEach(element => {
       if(element.productid==productClick.value){
        a=1;
      setPlaceholderProduct.innerHTML="   "+element.name;
                                                }
   
                                });
                                if(a==0){
                                    if(productClick.value=="")
                                    setPlaceholderProduct.innerHTML="ID";
                                    else
                                setPlaceholderProduct.innerHTML="Invalid Product Id";}
  })
 }

 function onClickEmployee(){
    
    fetch(getTranslateUrl(serverUrl))
    .then(Response => Response.json())
    .then(json => {
        json.forEach(element => {
       if(element.employeeid==employee_id.value){
      setPlaceholderEmployee.innerHTML="   "+element.name;
       }});
  })
 }
 