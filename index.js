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

    serverUrl="http://localhost:3000/updateMonthEarning";
    updateMonthEarning();

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





 function clickEventHandler(){
                            fetch(getTranslateUrl(serverUrl))
                            .then(Response => Response.json())
                            .then(json => {
                             var temp = "";
                             
                             json.forEach(element => {
                                
                                         
                                
                                     temp += "<tr>";
                                     temp += "<td>" + element.orderid + "</td>";
                                     temp += "<td>" + element.firstname + element.lastname+ "</td>";
                                     temp += "<td>" + element.total_amt + "</td>";
                                     temp += "<td>" + element.date + "</td></tr>";
                             });
                             tableDisp.innerHTML=temp;
                          })
                          .catch(errorhandler)
 }
 router.get('/updateCountOrder', function (req, res, next) {
  var query = `SELECT COUNT(*) AS total_orders FROM orders;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

router.get('/updateTotalRevenue', function (req, res, next) {
    var query = `SELECT SUM(amount) AS total_revenue
    FROM orders o
    JOIN c_payment p ON o.orderid = p.orderid;`;
    connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });


  router.get('/updateTotalCustomer', function (req, res, next) {
    var query = `SELECT COUNT(customerid) AS total_customers
    FROM customer;`;
    connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });

  router.get('/updateTotalReviews', function (req, res, next) {
    var query = `SELECT COUNT(*) as total_reviews FROM reviews;`;
    connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });

  router.get('/updateAverageRating', function (req, res, next) {
    var query = `SELECT AVG(rating) AS average_rating FROM reviews;`;
    connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });

  router.get('/updateMonthEarning', function (req, res, next) {
    var query = `SELECT SUM(quantity * c_price) as revenue
    FROM orders
    INNER JOIN Order_Info ON orders.orderid = Order_Info.orderid
    INNER JOIN product ON Order_Info.productid = product.productid
    WHERE orders.orderdate >= DATE_SUB(NOW(), INTERVAL 30 DAY);`;
    connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });