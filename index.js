const monthEarning=document.querySelector("#Month_earning");
// monthEarning.textContent = "30";

const averageRating=document.querySelector("#Average_rating");
// averageRating.textContent = "300";

const totalReviews=document.querySelector("#Total_reviews");
// totalReviews.textContent = "330";

const totalCustomer=document.querySelector("#t_customer");
// totalCustomer.textContent = "550";

const totalRevenue=document.querySelector("#Revenue");
// totalRevenue.textContent = "2345000";

const countOrder=document.querySelector("#Purchases");
// countOrder.textContent = "330";
const tableDisp=document.querySelector("#tableDisplay");
const percentDisplay=document.querySelector("#percentDisp");

var serverUrl;
function getTranslateUrl(){
    return serverUrl;
}

window.onload = (e) => {
    serverUrl="http://localhost:3000/updateCountOrder";
    updateCountOrder();

    serverUrl="http://localhost:3000/updateTotalRevenue";
    updateTotalRevenue();

    serverUrl="http://localhost:3000/updateTotalCustomer";
    updateTotalCustomer();

    serverUrl="http://localhost:3000/updateTotalReviews";
    updateTotalReviews();

    serverUrl="http://localhost:3000/updateAverageRating";
    updateAverageRating();

    serverUrl="http://localhost:3000/countLoyalCustomer";
    countLoyalCustomer();
    
    

    serverUrl="http://localhost:3000/updateMonthEarning";
    updateMonthEarning();
    serverUrl="http://localhost:3000/updateRecentTransaction";
    clickEventHandler();

    

    

}



function updateCountOrder(){
    fetch(getTranslateUrl(serverUrl))
      .then(Response => Response.json())
      .then(json => {
        countOrder.textContent = json[0].total_orders;
      })
      .catch(error => {
        console.log("Error:", error);
      });
    }

function updateTotalRevenue(){
        fetch(getTranslateUrl(serverUrl))
          .then(Response => Response.json())
          .then(json => {
            totalRevenue.textContent = json[0].total_revenue;
          })
          .catch(error => {
            console.log("Error:", error);
          });
        }

function updateTotalCustomer(){
            fetch(getTranslateUrl(serverUrl))
              .then(Response => Response.json())
              .then(json => {
                totalCustomer.textContent = json[0].total_customers;
              })
              .catch(error => {
                console.log("Error:", error);
              });
            }


function updateTotalReviews(){
                fetch(getTranslateUrl(serverUrl))
                  .then(Response => Response.json())
                  .then(json => {
                    totalReviews.textContent = json[0].total_reviews;
                  })
                  .catch(error => {
                    console.log("Error:", error);
                  });
                }

function updateAverageRating(){
                    fetch(getTranslateUrl(serverUrl))
                      .then(Response => Response.json())
                      .then(json => {
                        averageRating.textContent = json[0].average_rating;
                      })
                      .catch(error => {
                        console.log("Error:", error);
                      });
                    }

function updateMonthEarning(){
                        fetch(getTranslateUrl(serverUrl))
                          .then(Response => Response.json())
                          .then(json => {
                            monthEarning.textContent = json[0].revenue;
                          })
                          .catch(error => {
                            console.log("Error:", error);
                          });
                        }
                        var loyalCust;
                        var totalCust;
                        var a=0;

     function countLoyalCustomer(){
                        fetch(getTranslateUrl(serverUrl))
                        .then(Response => Response.json())
                      .then(json => {
                        console.log("1");
                           loyalCust=json[0].loyalty_customers;
                           totalCust=json[0].total_customers;
                           console.log(loyalCust+" "+totalCust);
                           a=loyalCust/totalCust;
                           changeKeyframes();
                           
                              })
                              .catch(error => {
                                console.log("Error:", error);
                              });
                            }
               
    
    
                        //         SELECT COUNT(DISTINCT c.customerid) AS customers_with_loyalty,
                //         COUNT(DISTINCT c2.customerid) AS total_customers
                //  FROM customer c
                //  LEFT JOIN loyalty l ON c.customerid = l.customerid
                //  JOIN customer c2 ON c.customerid = c2.customerid;

 function clickEventHandler(){
                            fetch(getTranslateUrl(serverUrl))
                            .then(Response => Response.json())
                            .then(json => {
                             var temp = "";
                             
                             json.forEach(element => {
                                
                                         
                                console.log(element.orderid);
                                     temp += "<tr>";
                                     temp += "<td>" + element.orderid + "</td>";
                                     temp += "<td>" + element.firstname + element.lastname+ "</td>";
                                     temp += "<td>" + element.total_amount + "</td>";
                                     temp += "<td>" + element.payment_date.substring(0,10) + "</td></tr>";
                             });
                             tableDisp.innerHTML=temp;
                          })
                          .catch(errorhandler)
 }
console.log("1");

 function changeKeyframes() {
  console.log("h");
    var styleSheet = document.styleSheets[0]; // Get the first stylesheet (you may need to adjust the index)

    // Find the desired keyframes rule and modify its properties
    for (var i = 0; i < styleSheet.cssRules.length; i++) {
      var rule = styleSheet.cssRules[i];
      var deg=360*a;
      var degl1,degl2;
      if(deg>180){
      degl1=180;
      degl2=deg-180;}
      else{
        degl2=0;
        degl1=deg;
      }
      var b=Math.round(a*100);
      percentDisplay.innerHTML=b+"%";
      if (rule.name === "loading-1") {
        console.log("h");
        rule.deleteRule("0%");
        rule.deleteRule("100%");
        rule.appendRule("0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }");
        rule.appendRule(`100% { -webkit-transform: rotate(${degl1}deg); transform: rotate(${degl1}deg); }`);
      } else if (rule.name === "loading-2") {
        rule.deleteRule("0%");
        rule.deleteRule("100%");
        rule.appendRule("0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }");
        rule.appendRule(`100% { -webkit-transform: rotate(${degl2}deg); transform: rotate(${degl2}deg); }`);
      }
    }
  }
  












