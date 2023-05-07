var express = require("express");
var router = express.Router();
var mysql = require("mysql");


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dbs",
});
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});
var a=3;
/* GET home page. */
router.get('/data', function (req, res, next) {//display customer data
  var query = `select * from customer natural join customer_phone natural join customer_email;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.get('/getProductData', function (req, res, next) {//display product data
  var query = `select * from product`;
  
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.post('/setdata', function (req, res, next) {//test insertion
  var query = `insert into customer values(${a},'Tavish','Gupta','Suryanagar')`;
   console.log(a);
   a++;
   console.log("hi"+first_name);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

router.post('/addCustomer', function (req, res, next) {//inserting customer,customer_phone & customer_email
  console.log("hello");
  const customerId=req.body.c_id;
const customerFName=req.body.customer_f_name;
const customerLName=req.body.customer_l_name;
const customerAddress=req.body.address;
const custPhone=req.body.c_phone;
const custEmail=req.body.email;
console.log(customerId);
  var query = `insert into customer values(${customerId},'${customerFName}','${customerLName}','${customerAddress}')`;
  var query1= `insert into customer_phone values(${customerId},${custPhone})`;
  var query2=`insert into customer_email values(${customerId},'${custEmail}');`
   console.log(customerId);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    // res.json(rows);
    
  });
  connection.query(query1, function (err, rows, fields) {
    if (err) throw err;
    // res.json(rows);
  });
  connection.query(query2, function (err, rows, fields) {
    if (err) throw err;
    // res.json(rows);
    res.render("index");
  });
});

router.post('/setProductData', function (req, res, next) {//inserting product and checking if suppplier exists
  const productCategory=req.body.product_select
  console.log(productCategory);  
  const productId=req.body.product_id;
const productName=req.body.product_name;
const productCPrice=req.body.p_customer_price;
const productSuppPrice=req.body.p_supplier_price;
const productQty=req.body.quantity;
const productSuppId=req.body.supplier_id;
const productExpiryDate=req.body.expiry;
console.log(req.body.expiry);
var value =1;
  var query = `insert into product(productid,name,category,c_price,supplierid,s_price,quantity,expiry) SELECT ${productId},'${productName}','${productCategory}',${productCPrice},${productSuppId},${productSuppPrice},${productQty},'${productExpiryDate}' FROM dual
WHERE (SELECT COUNT(*) FROM supplier where supplierid='${productSuppId}') > 0;`;
  
  // connection.query(query1, function (err, rows, fields) {
  //   if (err) throw err;
  //   // res.json(rows);
  //   value = rows[0]['count(*)'];
  //    console.log(value); // Output: 0 (or the actual value of rows[0]['count(*)'])
  //  if(value==0){
  //   const data = {
  //     title: 'Add Product',
  //     body: '<p>Invalid Supplier Id!</p>'
  //   };
  //   res.render('index', data);}
  // });  
  // console.log(value);
  
  // if(value!=0){
    
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    var data = {
      title: 'Add Product',
      body: '<p>Product added successfully</p>'
    };
    value=rows.affectedRows;
    if(value==0){
    data = {
      title: 'Add Product',
      body: '<p>Invalid data no rows effected</p>'
    };}
    console.log(value);
    res.render('index', data);
    
});
});

router.post('/deleteProduct', function (req, res, next) {//deleting product
  const product_id=req.body.product_id;
  var query = `delete from product where productid=${product_id}`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    const data = {
          title: 'Delete Product',
          body: '<p>Successfully deleted data</p>'
        };
        res.render('index', data);
    
  });
});
router.post('/deleteCustomer', function (req, res, next) {//deleteCustomer
  const customer_id=req.body.customer_id;
  var query = `delete from customer where customerid=${customer_id}`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    const data = {
          title: 'Delete Customer',
          body: '<p>Successfully deleted Customer</p>'
        };
        res.render('index', data);
    
  });
});
router.post('/addSupplier', function (req, res, next) {//inserting supplier and supplier_phone
  console.log("hello");
  const supplierid=req.body.s_id;
const suppliername=req.body.supplier_f_name;;
const supplieraddress=req.body.address;
const supplierphone=req.body.c_phone;
console.log(supplierid);
  var query = `insert into supplier values(${supplierid},'${supplieraddress}','${suppliername}')`;
  var query1= `insert into supplier_phone values(${supplierid},'${supplierphone}');`;

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    // res.json(rows);
    
  });
  connection.query(query1, function (err, rows, fields) {
    if (err) throw err;
    const data = {
      title: 'Add Supplier',
      body: '<p>Successfully added Supplier</p>'
    };
    
    res.render("index",data);
  });
});
router.get('/getSupplier', function (req, res, next) {//display supplier 
  var query = `select * from supplier natural join supplier_phone;`;
  
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.post('/addEmployee', function (req, res, next) {//inserting employee and employee_age
  console.log("hello");
  const employeeid=req.body.Employee_id;
const employeename=req.body.Employee_name;
const employeedob=req.body.dob;
const employeephone=req.body.c_phone;

  var query = `insert into employee values(${employeeid},'${employeename}','${employeedob}')`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    const data = {
      title: 'Add Employee',
      body: '<p>Successfully added Employee</p>'
    };
    res.render("index",data);
  });
});
router.get('/getEmployee', function (req, res, next) {//display employees
  var query = `SELECT 
  employeeid, 
  name, 
  dob, 
  TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age
FROM 
  employee;`;
  
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.post('/setLoyal', function (req, res, next) {//inserting loyal customer and checking if customer exits
  const loyaltyCategory=req.body.l_type
  const custId=req.body.c_id;
const loyaltyId=req.body.l_id;
const loyaltyExpiryDate=req.body.l_expiry;
console.log(req.body.expiry);
var value =1;
  var query = `insert into loyalty (customerid,loyaltyid,type,expiry) SELECT ${custId},${loyaltyId},'${loyaltyCategory}','${loyaltyExpiryDate}' FROM dual
WHERE (SELECT COUNT(*) FROM customer where customerid='${custId}') > 0;`;
  
  // connection.query(query1, function (err, rows, fields) {
  //   if (err) throw err;
  //   // res.json(rows);
  //   value = rows[0]['count(*)'];
  //    console.log(value); // Output: 0 (or the actual value of rows[0]['count(*)'])
  //  if(value==0){
  //   const data = {
  //     title: 'Add Product',
  //     body: '<p>Invalid Supplier Id!</p>'
  //   };
  //   res.render('index', data);}
  // });  
  // console.log(value);
  
  // if(value!=0){
    
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    var data = {
      title: 'Add Loyalty',
      body: '<p>Loyalty added successfully</p>'
    };
    value=rows.affectedRows;
    if(value==0){
    data = {
      title: 'Add Loyal Customer',
      body: '<p>Invalid customer_id ,no rows effected</p>'
    };}
    console.log(value);
    res.render('index', data);
    
});
});
router.get('/getLoyal', function (req, res, next) {//display customer data
  var query = `select * from loyalty natural join customer natural join customer_phone natural join customer_email;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.post('/addOrder', function (req, res, next) {//inserting supplier and supplier_phone
  
  const orderid=req.body.order_id;
const orderEmployeeId=req.body.employee_id;
const orderProduct=req.body.product_id;
const orderQty=req.body.quantity;
const orderCustId=req.body.customer_id;
const orderDate=req.body.order_Date;
  var query = `CALL insert_order_inf_(${orderid},${orderProduct},${orderQty},${orderCustId},${orderEmployeeId},'${orderDate}')`;
  
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    const data = {
      title: 'Add Order',
      body: '<p>Successfully added order</p>'
    };
    
    res.render("index",data);
  });
});
router.get('/getOrder', function (req, res, next) {//display customer data
  var query = `SELECT oi.orderid, c.firstname, c.lastname, c.customerid,
  SUM(p.c_price * oi.quantity) * 
  CASE l.type
       WHEN 'Silver' THEN 0.95
       WHEN 'Gold' THEN 0.9
       WHEN 'Platinum' THEN 0.8
       ELSE 1
  END AS total_amt,
  l.type AS loyalty_type
FROM orders o
JOIN customer c ON o.customerid = c.customerid
JOIN Order_Info oi ON o.orderid = oi.orderid
JOIN product p ON oi.productid = p.productid
LEFT JOIN loyalty l ON c.customerid = l.customerid   
GROUP BY oi.orderid, c.firstname, c.lastname, c.customerid, l.type;
;`
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.post('/filterProductCategory', function (req, res, next) {//display customer data
  
   const productCategoryFilter=req.body.product_select;
  var query = `SELECT s.name as Supplier_Name,s.supplierid as id,p.category, COUNT(*) AS num_products_ordered
  FROM supplier s
  JOIN product p ON s.supplierid = p.supplierid
  JOIN order_info oi ON p.productid = oi.productid
  WHERE p.category = '${productCategoryFilter}'
  GROUP BY s.name, p.category,s.supplierid
  ORDER BY num_products_ordered DESC;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    
    res.render('user-list', { title: 'User List', userData: rows});
    //res.render("products", { title: "Products", products: rows });
  });
});
router.post('/UpdateProductData', function (req, res, next) {//inserting product and checking if suppplier exists
  const productCategory=req.body.product_select
  console.log(productCategory);  
  const productId=req.body.product_id;
const productName=req.body.product_name;
const productCPrice=req.body.p_customer_price;
const productSPrice=req.body.p_supplier_price;
const productQty=req.body.quantity;
const productSuppId=req.body.supplier_id;
const productExpiryDate=req.body.expiry;
console.log(req.body.expiry);
var value =1;
  var query = `
  UPDATE product 
  SET name = '${productName}', 
  category = '${productCategory}', 
  c_price = '${productCPrice}', 
  s_price = '${productSPrice}', 
  quantity = '${productQty}', 
  expiry = '${productExpiryDate}' 
  WHERE productid = ${productId};`;
  
  // connection.query(query1, function (err, rows, fields) {
  //   if (err) throw err;
  //   // res.json(rows);
  //   value = rows[0]['count(*)'];
  //    console.log(value); // Output: 0 (or the actual value of rows[0]['count(*)'])
  //  if(value==0){
  //   const data = {
  //     title: 'Add Product',
  //     body: '<p>Invalid Supplier Id!</p>'
  //   };
  //   res.render('index', data);}
  // });  
  // console.log(value);
  
  // if(value!=0){
    
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    var data = {
      title: 'Product',
      body: '<p>Product updated successfully, Please visit view page to see your changes</p>'
    };
    value=rows.affectedRows;
    if(value==0){
    data = {
      title: 'Add Product',
      body: '<p>Invalid data no rows effected</p>'
    };}
    console.log(value);
    res.render('index', data);
    
});
});
router.post('/filterProductByPrice', function (req, res, next) {//display customer data
  
 const maxPrice=Number.parseInt(req.body.maxPrice,10);
  
 const minPrice=Number.parseInt(req.body.minPrice,10);
 console.log(minPrice+" "+maxPrice);
 var query = `call filter_products_by_price_range_(${minPrice},${maxPrice});`;
 connection.query(query, function (err, rows, fields) {
   if (err) throw err;
   console.log(rows[0][0].expiry);
   res.render("filterProductDisp",{ title: "User List", userData: rows[0]});
   //res.render("products", { title: "Products", products: rows });
 });
});
router.post('/UpdateCustomer', function (req, res, next) {//inserting customer,customer_phone & customer_email
  
const customerId=req.body.c_id;
const customerFName=req.body.customer_f_name;
const customerLName=req.body.customer_l_name;
const customerAddress=req.body.address;
const custPhone=req.body.c_phone;
console.log(customerId);
  var query = `UPDATE customer c
  JOIN customer_phone cp ON c.customerid = cp.customerid
  SET c.firstname = '${customerFName}', c.lastname = '${customerLName}', c.address = '${customerAddress}', cp.phone = ${custPhone}
  WHERE c.customerid = ${customerId}`;
   console.log(customerId);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    // res.json(rows);
    var data = {
      title: 'Update Customer',
      body: '<p>Customer updated successfully, Please visit view page to see your changes</p>'
    };
    value=rows.affectedRows;
    if(value==0){
    data = {
      title: 'Update Customer',
      body: '<p>Invalid data no rows effected</p>'
    };}
    res.render('index',data);
  });
});
router.get('/filterOrderByCount', function (req, res, next) {//display customer data
  var query = `SELECT c.customerid, c.firstname, c.lastname, COUNT(o.orderid) as order_count
  FROM customer c
  JOIN orders o ON c.customerid = o.customerid
  GROUP BY c.customerid, c.firstname, c.lastname
  ORDER BY order_count DESC;`
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.get('/filterOrderByCustomer', function (req, res, next) {//display customer data
  var query = `SELECT c.customerid, c.firstname, c.lastname, SUM(cp.amount) as total_spent
  FROM customer c
  JOIN c_payment cp ON c.customerid = cp.customerid
  GROUP BY c.customerid, c.firstname, c.lastname
  ORDER BY total_spent DESC
  LIMIT 10;`
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.post('/UpdateSupplier', function (req, res, next) {//inserting supplier and supplier_phone
  console.log("hello");
  const supplierid=req.body.s_id;
const suppliername=req.body.supplier_f_name;;
const supplieraddress=req.body.address;
const supplierphone=req.body.c_phone;
console.log(supplierid);
  var query = `UPDATE supplier
  JOIN supplier_phone ON supplier.supplierid = supplier_phone.supplierid
  SET supplier.name = '${suppliername}',
  supplier.address = '${supplieraddress}',    supplier_phone.phone = ${supplierphone}
  WHERE supplier.supplierid = ${supplierid}`;

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    var data = {
      title: 'Updated Supplier',
      body: '<p>Successfully updated Supplier</p>'
    };
    value=rows.affectedRows;
    if(value==0){
    data = {
      title: 'Update Customer',
      body: '<p>Invalid data no rows effected</p>'
    };}
    res.render("index",data);
  });
});
// //UPDATE supplier
// JOIN supplier_phone ON supplier.supplierid = supplier_phone.supplierid
// SET supplier.name = '${suppliername}',
//     supplier.address = '${supplieraddress}',
//     supplier_phone.phone = '${supplierphone}'
// WHERE supplier.supplierid = ${supplierid};












//   connection.query(query, function (err, rows, fields) {
//     if (err) throw err;
//     //res.json(rows);
//     res.render("carCategory", { categories: rows });
//   });
// });

// router.get("/location", function (req, res, next) {
//   var query = "select * from location_details";

//   connection.query(query, function (err, rows, fields) {
//     if (err) throw err;
//     //res.json(rows);
//     res.render("locationDetails", { locations: rows });
//   });
// });

// router.get("/signup", function (req, res, next) {
//   var query = "select * from location_details";

//   connection.query(query, function (err, rows, fields) {
//     if (err) throw err;
//     //res.json(rows);
//     res.render("signup", { locations: rows });
//   });
// });

// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: true }));

// router.post("/signup-data", function (req, res) {
//   // var query = "select * from location_details";

//   // connection.query(query, function (err, rows, fields) {
//   //   if (err) throw err;
//   //   //res.json(rows);
//   //   res.render("signup", { locations: rows });
//   // });
//   console.log(req.body);
//   const dl_number = req.body.dl_number;
//   const first_name = req.body.first_name;
//   const middle_name = req.body.middle_name;
//   const last_name = req.body.last_name;
//   const phone_number = req.body.phone_number;
//   const email = req.body.email;
//   const street = req.body.street_address;
//   const city = req.body.city;
//   const state = req.body.state;
//   const zip_code = req.body.zip_code;
//   connection.query(
    // "INSERT INTO customer (dl_number, first_name, middle_name, last_name, phone_number, email, street, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    // [
    //   dl_number,
    //   first_name,
    //   middle_name,
    //   last_name,
    //   phone_number,
    //   email,
    //   street,
    //   city,
    //   state,
    //   zip_code,
    // ],
//     (error, results, fields) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//         res.redirect("/");
//       } else {
//         res.status(200).send("Signup Successful");
//         res.redirect("/");
//       }
//     }
//   );
//   // var query = "select * from location_details";
//   // console.log(email);
//   // connection.query(query, function (err, rows, fields) {
//   //   if (err) throw err;
//   //   //res.json(rows);
//   //   // res.render("signup", { locations: rows });
//   //   res.redirect("/");
//   // });
// });

module.exports = router;