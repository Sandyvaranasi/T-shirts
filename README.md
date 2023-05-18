# T-Shirts
## FSOC project
### E-Commerse and ERP

The project includes several important features required in management of e-comm websites.
This is generally a fullstack project consist of all basic necessary features of an ERP as well including multi customers and multi sellers.

##   Project deployment link :- https://cute-inexpensive-marquis.glitch.me/

### The Backend ==> 

The backend part contains multiple models and controllers. It is wrritten in Java Script and Node js.

#### The User MOdel ===>

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  landMark: String,
  city: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
},
{ timestamps: true }
```

  
The user model is a common model in almost every project. In this project the customer is defined as a user who have to give some information including his/her name, email, number, address and a strong password in order to buy any item. This is simply a Schema that defines the structure in which data is going to be stored in the DB.

#### The Shop Model ===>
```javascript
{
    ownername: {
      type: String,
      required: true,
      trim: true,
    },
    shop: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: String,
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
  ```
  
After the addition of user the second important model is a shop model because this is an ERP website there will be multiple shops so the model should also be specific. The shop model consist or owner's name, shop name, email, number address and a strong password. The user registered in this schema will be considered as a vendor.

#### The T-shirt Model ===>
```javascript
 {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
      require: true,
    },
    productname: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    baseprice: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    sizes: {
      type: [String],
      enum: ["Small", "Medium", "Large"],
      default: ["Medium"],
    },
    colors: [String],
    productImage: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
  ```
  
Since thios is an e-comm website , specially designed for selling and buying t-shirts. There should be some criteria under which t-shirts are accepted. Here comes the concept of t-shirt model. This schema dfines the information about the t-shirts for convenience of customer as well as vendor. It consist a name(could be brand), brief description, quantity, sizes, colors and availability.

#### The Order Model ===>
```javascript
 {
    userId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "tshirt",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      minLength: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "placed", "cancled"],
    },
    address:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
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

The front-end part is stored inside the client folder it consist of general SRC and components folders inside which the logic is written the entire frontage is generated using react plus white and it was quite different using create a react app now moving to the SRC part so we know that the main body holes of a front-end part are in a selfie that is the app JSX and Mannu Jais X app GSX is the folder where every element get rendered one by one every component and main JSS of the folder where objects get rendered the libraries which are used in it for reactor out it down and bootstrap these two main libraries are used in order to give us tiles as well as To redirect from one page to another without reloading the page and for network connection you are use of exhaust happened now the components which are generated inside this our first one is the homepage after the homepage is the user will get redirected to the product page that is known as told to have sex in store GSX he will get the option to see the details of any product on that page by clicking on more details he will go on product or GSX or T-shirt that they have sex after going on T-shirt.JSX he can simply buy it or go back to the inventory if he clicks on by eight it will be added to his order list where he can either Proceed the payment or can cancel it all the status get updated in the users order list however in the NAV bar which is the soul it consist of the generation signup and login of the user as well as the vendor change this is a multivendor that’s why to login pages are available so are user can register and login and can by elements however if a vendor is here he can register and login and can I add his own products which can which will be displayed in the store and can be bought by any user and future a vendor can give his own rate and the payment gateway Razorpay is used it is a dummy payment gateway which gives the view of real or Genuine looking payment at last after placing the order the plant then simply check for more products or can leave this site this is all about the front-end part.
