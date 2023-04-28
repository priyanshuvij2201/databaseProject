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
    
    json.forEach(element => {
       
                var str=element.expiry;
       console.log(element.productid+" "+element.category+" "+element.c_price+" "+element.supplierid+" "+element.s_price+" "+element.quantity+" "+element.expiry);
       temp += "<tr>";
            temp += "<td>" + element.productid + "</td>";
            temp += "<td>" + element.name + "</td>";
   temp += "<td>" + element.category + "</td>";
            temp += "<td>" + element.c_price + "</td>"
            temp += "<td>" + element.supplierid + "</td>"
            temp += "<td>" + element.s_price + "</td>"
            temp += "<td>" + element.quantity + "</td>"
            temp += "<td>" + str.substring(0,10) + "</td></tr>"
    });
    tableDisp.innerHTML=temp;
   
 })
 .catch(errorhandler)
}

getData.addEventListener("click",(e)=>{
   e.preventDefault();
   console.log("ya");
   serverUrl="http://localhost:3000/getProductData";
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