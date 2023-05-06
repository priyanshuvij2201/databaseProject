var getData=document.querySelector("#filter3_product_submit");
var getData2=document.querySelector("#filter2_product_submit");
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

function clickEventHandler(){
    console.log("hello");
   fetch(getTranslateUrl(serverUrl))
   .then(Response => Response.json())
   .then(json => {
    var temp = "";
    console.log("hello");
    console.log(json[0].name);
    json.forEach(element => {
     console.log(element.name);
            temp += "<tr>";
            temp += "<td>" + element.name + "</td>";
            temp += "<td>" + element.category + "</td>";
            temp += "<td>" + element.num_products_ordered + "</td></tr>"
    });
    tableDisp.innerHTML=temp;})
 .catch(errorhandler)
}

getData.addEventListener("click",(e)=>{
   e.preventDefault();
   console.log("ya");
   serverUrl="http://localhost:3000/filterProductCategory";
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