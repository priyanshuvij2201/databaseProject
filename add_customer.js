var addCustomer=document.querySelector("#addCustomer");
const customerId=document.querySelector("#c_id");
const customerFName=document.querySelector("#customer_f_name");
const customerLName=document.querySelector("#customer_l_name");
const customerAddress=document.querySelector("#address")
console.log("HELLO");
var serverUrl="http://localhost:3000/test/addCustomer"

function getTranslateUrl(){
   return serverUrl;
}

function errorhandler(){
   console.log("error occured");
   alert("Something worng with server try again ");
}

// function clickEventHandler(){
//    fetch(getTranslateUrl(serverUrl))
//    .then(Response => Response.json())
//    .catch(errorhandler)
// }

// addCustomer.addEventListener("click",(e)=>{
//    console.log(customerId.value);
//    console.log(customerFName.value);
//    console.log(customerLName.value);
//    console.log(customerAddress.value);
//    e.preventDefault();
//    serverUrl="http://localhost:3000/addCustomer";
//    // clickEventHandler()});


   // res => {
   //    res.json().then(
   //      data => {
   //        console.log(data.data);
   //        if (data.data.length > 0) {
  
   //          var temp = "";
   //          data.data.forEach((itemData) => {
   //            temp += "<tr>";
   //            temp += "<td>" + itemData.id + "</td>";
   //            temp += "<td>" + itemData.employee_name + "</td>";
   //            temp += "<td>" + itemData.employee_salary + "</td></tr>";
   //          });
   //          document.getElementById('data').innerHTML = temp;
   //        }
   //      }
   //    )