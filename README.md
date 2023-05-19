# T-Shirts
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://cdn.shopify.com/s/files/1/0090/9236/6436/articles/Best_Shopify_T-shirt_Stores_For_Your_Inspiration_in_2021.png?v=1621964186" width="200" alt="T-Shirts" /></a>
</p>

## FSOC project

### E-Commerse and ERP

The project includes several important features required in management of e-comm websites.
This is generally a fullstack project consist of all basic necessary features of an ERP as well including multi customers and multi sellers.

##   Project deployment link :- https://cute-inexpensive-marquis.glitch.me/

### The Backend ==> 

The backend part contains multiple models and controllers. It is wrritten in Java Script and Node js.

#### The User MOdel ===>

```javascript
  name: { String,required},
  email: { String, required, unique},
  password: {String, required},
  phone: {String, required},
  street: {String, required},
  landMark: String,
  city: {String, required},
  pincode: {String, required}
```

  
The user model is a common model in almost every project. In this project the customer is defined as a user who have to give some information including his/her name, email, number, address and a strong password in order to buy any item. This is simply a Schema that defines the structure in which data is going to be stored in the DB.

#### The Shop Model ===>
```javascript
  ownername: { String,required},
  shop: { String,required},
  email: { String, required, unique},
  password: {String, required},
  phone: {String, required},
  street: {String, required},
  landMark: String,
  city: {String, required},
  pincode: {String, required}
  ```
  
After the addition of user the second important model is a shop model because this is an ERP website there will be multiple shops so the model should also be specific. The shop model consist or owner's name, shop name, email, number address and a strong password. The user registered in this schema will be considered as a vendor.

#### The T-shirt Model ===>
```javascript
 shopId: { ObjectId,required},
   productname: { String,required},
  description: { String,required},
  baseprice: { String, required},
  quantity: {Number, required},
  productImage: {String, required},
  sizes: {[String],enum: ["Small", "Medium", "Large"]},
  colors: [String],
  availability: { Boolean, default: true},
  ```
  
Since thios is an e-comm website , specially designed for selling and buying t-shirts. There should be some criteria under which t-shirts are accepted. Here comes the concept of t-shirt model. This schema dfines the information about the t-shirts for convenience of customer as well as vendor. It consist a name(could be brand), brief description, quantity, sizes, colors and availability.

#### The Order Model ===>
```javascript
  userId: { ObjectId,required},
  productId: { ObjectId,required},
   productname: { String,required},
  description: { String,required},
  totalPrice: { Number, required},
  quantity: {Number, required,min:1},
    status: { String,default: "pending",enum: ["pending", "placed", "cancled"] },
    address:{ String,required}
  ```
  
The last but not the least is Order model. It will be holding all the order of any specific user for the record. It consist the keys like productId, quantity, total price, user Id, and status of order.

After Models the controllers arise

#### The User Controller ===>
post "/signup"
post "/login"
get "/user"
put "/editInfo"

The User Controller consist of the soul working API's of the entire project since this is an e-commerce website the user control it plays a vital role because any commerce website on the number of total users are the customers they are using it so this user controller consist of the signup and login for the customer.

#### The Vendor Controller ===>
post "/shop"
post "/vendor"
post "/product"
put "/product/:tShirttId"
get "/shop"

This is a ERP website which simply indicates that there will be multiple Wenders who will be uploading their product for selling that’s why the vendor controller also plays an important role in the entire application the vendor controller consist of two Apis the first one is the signup and the second one is the login api.

#### The T-Shirt Controller or Product Controller ===>
get "/product"
get "/product/:productId"
get "/tShirtByShop"

Third one is the T-shirt controller or the product controller which is responsible for the entire display of the application because this is a T-shirt website consisting of ERP there should be a lot of T-shirts uploaded by Wenders which can be checked by the customer to buy that’s YTCPI consist of several features the first feature is creation or addition of products which is authenticated and authorised by vendor so any vendor can add any product inside application using this API.
After creation of vendor can simply update the image price quantity sizes and colours of the product if in case there is any change in the future that’s why there is also an update controller API written and inside it.
Both the creation feature and the updation feature of T-shirts are authenticated and authorised for the vendor only no other user can do these features.
The next feature in the T-shirt controller is to get T-shirt there at to get T-shirt and Apis the first one is to get all the T-shirts using query para metres so which will be also the store homepage in our application because whenever a user goes in our application he will be looking at a lot of T-shirts which are in our database that’s why this is the first PI which is going to be hit whenever someone enters the application and the second one is get T-shirt by ID which consist of getting the detail of one T-shirt if a user want to see the detail of a single T-Shirt then he can simply get it using that API.

#### The Order Controller ===>
post "/order/:productId"
get "/order"
get "/order/:orderId"
put "/order/:orderId"
  
Now talking about the order controller daughter controller consist of all the Apis which I have been trying can under the authentication and authorisation of an user or customer so there are the Apis of generation of an order and updation of an order for user can simply generate orders and after generating he can either place it by completing the premium payment procedure or can cancel it it depends on him.

### These were the basic features the model and the controller after that only the middleware which consist of the authentication code and the rout which consist of ### the URLs and points of the application exist all the code is written in JavaScript and the validations are done using and package JOI now moving to the
### front-end part

The front-end of the application is stored in the "client" folder. It consists of the "src" and "components" folders, where the logic is written. React and White are used to generate the entire front-end, and Create React App was used to set up the project.

In the "src" folder, the main components are the "App.jsx" and "Menu.jsx". The "App.jsx" file is responsible for rendering all the elements of the application, while the "Menu.jsx" file handles the navigation and rendering of different components. The main styling for the application is stored in the "main.css" file.

The libraries used in the project include React Router and Bootstrap. React Router is used for navigation and routing between different pages without reloading the entire page. Bootstrap is used for styling and providing responsive design elements.

The components generated in the application include the homepage, product page, and T-shirt page. The homepage is the initial page that users see and from there they are redirected to the product page. On the product page, users can view the details of each product and click on "More Details" to go to the T-shirt page, where they can either buy the T-shirt or go back to the inventory. If a user clicks on "Buy", the T-shirt is added to their order list, where they can proceed with payment or cancel the order. The status of the order is updated in the user's order list.

The navigation bar, or "Nav bar", includes options for user registration, login, and vendor login. It is a multi-vendor system, so there are separate login pages for users and vendors. Users can register, login, and buy items, while vendors can register, login, add their own products, and sell them in the store. The payment gateway used is Razorpay, which provides a simulated payment experience.

After placing an order, users can choose to browse for more products or leave the site.
