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
router.get('/getName', function (req, res, next) {//display customer data
  var query = `select * from customer ;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.get('/getProductName', function (req, res, next) {//display customer data
  var query = `select * from product ;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.get('/getEmployeeName', function (req, res, next) {//display customer data
  var query = `select * from employee ;`;
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
const currentDate = new Date();
const inputDate = new Date(loyaltyExpiryDate);
if (inputDate > currentDate) {
  console.log('Input date is greater than current date');
} else if (inputDate < currentDate) {

  console.log('Input date is less than current date');
} else {
  console.log('Input date is equal to current date');
}



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
    if (inputDate < currentDate) {
      var data = {
        title: 'Add Loyalty',
        body: '<p>Loyalty cannot be added Invalid Date</p>'
      };
      res.render('index', data);
    }
    else{
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
    
});}
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
    
    var data = {
      title: 'Add Order',
      body: '<p>Successfully added order</p>'
    };
    if (err){
      data = {
        title: 'Add Order',
        body: '<p>Invalid Data</p>'
      };
    } 
    res.render("index",data);
  });
});
router.get('/getOrder', function (req, res, next) {//display customer data
  var query = `SELECT oi.orderid, c.firstname, c.lastname, c.customerid,oi.productid,
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
JOIN c_payment cp ON o.orderid = cp.orderid
LEFT JOIN loyalty l ON c.customerid = l.customerid   
GROUP BY oi.orderid, c.firstname, c.lastname, c.customerid, l.type,oi.productid;
;`

var amount;
var customerid;
var orderid;

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    amount=rows[0].total_amt;
    customerid=rows[0].customerid;
    orderid=rows[0].orderid;
    console.log(amount+" "+customerid+" "+orderid);
    res.json(rows);
    
    //res.render("products", { title: "Products", products: rows });
  });
//   var query1=`INSERT INTO c_payment (customerid, c_paymentid, orderid, pdate, amount)
// VALUES (${customerid}, NULL, ${orderid}, '2023-10-10',${amount} );`
// connection.query(query1, function (err, rows, fields) {
//   if (err) throw err;
  
  
//   //res.render("products", { title: "Products", products: rows });
// });
  
});
router.get('/pendingBill', function (req, res, next) {//display customer data
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
LEFT JOIN c_payment cp ON oi.orderid = cp.orderid
LEFT JOIN loyalty l ON c.customerid = l.customerid
WHERE cp.orderid IS NULL 
GROUP BY oi.orderid, c.firstname, c.lastname, c.customerid, l.type;`

var amount;
var customerid;
var orderid;

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    if(rows.length>0){
    amount=rows[0].total_amt;
    customerid=rows[0].customerid;
    orderid=rows[0].orderid;
    console.log(amount+" "+customerid+" "+orderid);
    }
    res.json(rows);
    
    //res.render("products", { title: "Products", products: rows });
  });
//   var query1=`INSERT INTO c_payment (customerid, c_paymentid, orderid, pdate, amount)
// VALUES (${customerid}, NULL, ${orderid}, '2023-10-10',${amount} );`
// connection.query(query1, function (err, rows, fields) {
//   if (err) throw err;
  
  
//   //res.render("products", { title: "Products", products: rows });
// });
  
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
router.post('/generateBill', function (req, res, next) {//display customer data
  const orderId=req.body.order_id;
  var query = `SELECT oi.orderid, c.firstname, c.lastname, c.customerid,o.orderdate,
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
where oi.orderid=${orderId}
GROUP BY oi.orderid, c.firstname, c.lastname, c.customerid, l.type,o.orderdate;
;`

var amount;
var customerid;
var orderid;
var orderDate;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    amount=rows[0].total_amt;
    customerid=rows[0].customerid;
    orderid=rows[0].orderid;
    orderDate=rows[0].orderdate;
  var formattedDate = orderDate.toLocaleDateString('en-GB', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit'
  }).replace(/\//g, '-');
  console.log(formattedDate);
  var [day, month, year] = formattedDate.split('-').map((part) => parseInt(part));
var monthS=month;
var dateS=day;
if (month<=9){
  monthS="0"+month;
}
if(day<=9){
  dateS="0"+day;
}

var finalDate=year+"-"+monthS+"-"+dateS;
console.log(finalDate);
    console.log(amount+" "+customerid+" "+orderid+" "+orderDate);
    var query1=`INSERT INTO c_payment (customerid, c_paymentid, orderid, pdate, amount)
    VALUES (${customerid},  ${orderid}, ${orderid}, '${finalDate}',${amount} );`
    connection.query(query1, function (err, rows, fields) {
      if (err) throw err;
      res.render('generateBill',{ price: amount })
      //res.render("products", { title: "Products", products: rows });
    });
    
    //res.render("products", { title: "Products", products: rows });
  });

  
  
});
router.get('/orderCart', function (req, res, next) {//display customer data
  const orderId=req.body.order_id;
  var query = `SELECT oi.orderid, c.firstname, c.lastname, c.customerid, o.orderdate, p.productid, p.name,
  SUM(p.c_price * oi.quantity) * 
  CASE l.type
       WHEN 'Silver' THEN 0.95
       WHEN 'Gold' THEN 0.9
       WHEN 'Platinum' THEN 0.8
       ELSE 1
  END AS total_amt,
  SUM(p.c_price * oi.quantity) - SUM(p.c_price * oi.quantity) * 
  CASE l.type
       WHEN 'Silver' THEN 0.95
       WHEN 'Gold' THEN 0.9
       WHEN 'Platinum' THEN 0.8
       ELSE 1
  END AS discount,
  l.type AS loyalty_type
FROM orders o
JOIN customer c ON o.customerid = c.customerid
JOIN Order_Info oi ON o.orderid = oi.orderid
JOIN product p ON oi.productid = p.productid
LEFT JOIN loyalty l ON c.customerid = l.customerid 
WHERE NOT EXISTS (
  SELECT 1
  FROM c_payment cp
  WHERE cp.orderid = oi.orderid
)
GROUP BY oi.orderid, c.firstname, c.lastname, c.customerid, l.type, o.orderdate, p.productid, p.name;`


  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    
    //res.render("products", { title: "Products", products: rows });
  });

  
  
});
router.post('/updateEmployee', function (req, res, next) {//inserting employee and employee_age
  console.log("hello");
  const employeeid=req.body.Employee_id;
const employeename=req.body.Employee_name;
const employeedob=req.body.dob;
const employeephone=req.body.c_phone;

  var query = `UPDATE employee
  SET name = '${employeename}',
  dob ='${employeedob}'
  WHERE employeeid = ${employeeid};`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    const data = {
      title: 'Update Employee',
      body: '<p>Successfully updated Employee</p>'
    };
    res.render("index",data);
  });
});
router.post('/updateOrder', function (req, res, next) {//inserting supplier and supplier_phone
  
  const orderid=req.body.order_id;
const orderEmployeeId=req.body.employee_id;
const orderProduct=req.body.product_id;
const orderQty=req.body.quantity;
const orderCustId=req.body.customer_id;

  var query = `UPDATE Order_Info
  SET quantity = ${orderQty}
  WHERE orderid = ${orderid}
    AND productid = ${orderProduct}
    AND NOT EXISTS (
      SELECT 1
      FROM c_payment
      WHERE c_payment.orderid = Order_Info.orderid
    );`;
  
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    value=rows.affectedRows;
    if(value==0){
    var data = {
      title: 'Update Order',
      body: '<p>Invalid data no rows effected</p>'
    };}
    else{
    data = {
      title: 'Update Order',
      body: '<p>Updated Data</p>'
    };}
  
    res.render("index",data);
  });
});
router.post('/addReview', function (req, res, next) {//inserting supplier and supplier_phone
  
  const customerId=req.body.c_id;
  const productId=req.body.p_id;
  const rating=req.body.product_select;  
  const review=req.body.message;
  console.log(review);  
  var query = `INSERT INTO reviews (customerid, productid, rating,review)
  VALUES (${customerId}, ${productId}, ${rating},'${review}');`;
  
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    const data = {
      title: 'Add Review',
      body: '<p>Successfully added Review</p>'
    };

    res.render("index",data);
  });
});
router.get('/getReview', function (req, res, next) {//display customer data
  var query = `SELECT *
  FROM reviews`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});
router.get('/updateCountOrder', function (req, res, next) {//display customer data
  var query = `SELECT COUNT(*) AS total_orders
  FROM orders;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
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
  var query = `SELECT SUM(amount) AS total_revenue
  FROM orders o
  JOIN c_payment p ON o.orderid = p.orderid
  WHERE p.pdate >= DATE_SUB(NOW(), INTERVAL 30 DAY);`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
router.get('/updateRecentTransaction', function (req, res, next) {
  var query = `SELECT  o.orderid,c.firstname, c.lastname, SUM(p.amount) AS total_amount, MAX(p.pdate) AS payment_date
  FROM c_payment AS p
  INNER JOIN orders AS o ON p.orderid = o.orderid
  INNER JOIN customer AS c ON o.customerid = c.customerid
  GROUP BY o.orderid,c.firstname, c.lastname
  ORDER BY payment_date DESC
  LIMIT 10;`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
router.get('/countLoyalCustomer', function (req, res, next) {//display customer data
  var query = `SELECT 
  COUNT(DISTINCT customer.customerid) AS total_customers,
  COUNT(DISTINCT loyalty.customerid) AS loyalty_customers
FROM 
  customer 
  LEFT JOIN loyalty ON customer.customerid = loyalty.customerid;`
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});


//INSERT INTO reviews (customerid, productid, rating,review)
// VALUES (${customerId}, ${productId}, ${rating},'${review});





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