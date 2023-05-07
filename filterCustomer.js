var getData=document.querySelector("#addCustomer");
const tableDisp=document.querySelector("#tableDisplay")

console.log("HELLO");
var serverUrl="";

function getTranslateUrl(){
   return serverUrl;
}

function errorhandler(){
   console.log("error occured");
   alert("Something worng with server try again ");
}

var select = document.getElementById('filter_customer');

function clickEventHandler(){
    
    var value = select.options[select.selectedIndex].value;
console.log(value)
if(value=="Maxmimum"){
serverUrl="http://localhost:3000/filterOrderByCount";

   fetch(getTranslateUrl(serverUrl))
   .then(Response => Response.json())
   .then(json => {
    var temp = "";
    
    
    
    json.forEach(element => {
     
            temp += "<tr>";
            temp += "<td>" + element.customerid + "</td>";
            temp += "<td>" + element.firstname + "</td>";
            temp += "<td>" + element.lastname + "</td>";
            temp += "<td>" + element.order_count + "</td></tr>"
    });
    tableDisp.innerHTML=temp;})
 .catch(errorhandler)}

 else{
   serverUrl="http://localhost:3000/filterOrderByCustomer";
console.log("1");
   fetch(getTranslateUrl(serverUrl))
   .then(Response => Response.json())
   .then(json => {
    var temp = "";
    console.log("hello");
    
    
    json.forEach(element => {
     
            temp += "<tr>";
            temp += "<td>" + element.customerid + "</td>";
            temp += "<td>" + element.firstname + "</td>";
            temp += "<td>" + element.lastname + "</td>";
            temp += "<td>" + element.total_spent + "</td></tr>"
    });
    tableDisp.innerHTML=temp;})
 .catch(errorhandler)

 }
}

getData.addEventListener("click",(e)=>{
   e.preventDefault();
   console.log("ya");

   clickEventHandler();
   });


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