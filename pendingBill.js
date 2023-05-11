var btnTranslate=document.querySelector("#btn-translate");
var getData=document.querySelector("#getdata");
var fName=document.querySelector("#f-name");
var txtInput = document.querySelector("#txt-input");
const tableDisp=document.querySelector("#tableDisplay")

console.log("HELLO");
var serverUrl="http://localhost:3000/setdata"

function getTranslateUrl(){
   return serverUrl;
}

function errorhandler(){
   console.log("error occured");
   alert("Something worng with server try again ");
}

function clickEventHandler(){
   fetch(getTranslateUrl(serverUrl))
   .then(Response => Response.json())
   .then(json => {
    var temp = "";
    if(json.length>0){
    json.forEach(element => {
       
                
       
            temp += "<tr>";
            temp += "<td>" + element.orderid + "</td>";
            temp += "<td>" + element.firstname + "</td>";
            temp += "<td>" + element.lastname + "</td>";
            temp += "<td>" + element.customerid + "</td>";
            temp += "<td>" + element.total_amt + "</td>";
            temp += "<td>" + element.loyalty_type + "</td></tr>";
    });
    tableDisp.innerHTML=temp;}
    else
    alert("No pending Bills");
 })
 .catch(errorhandler)
}

getData.addEventListener("click",(e)=>{
   e.preventDefault();
   console.log("ya");
   serverUrl="http://localhost:3000/pendingBill";
   clickEventHandler()});


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