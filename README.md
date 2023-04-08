# T-Shirts
## FSOC project
### E-Commerse and ERP

The project includes several important features required in management of e-comm websites.
This is generally a fullstack project consist of all basic necessary features of an ERP as well including multi customers and multi sellers.

### The Backend ==>

The backend part contains multiple models and controllers. It is wrritten in Java Script and Node js.

#### The User MOdel ===>
The user model is a common model in almost every project. In this project the customer is defined as a user who have to give some information including his/her name, email, number, address and a strong password in order to buy any item. This is simply a Schema that defines the structure in which data is going to be stored in the DB.

### The Shop Model ===>
After the addition of user the second important model is a shop model because this is an ERP website there will be multiple shops so the model should also be specific. The shop model consist or owner's name, shop name, email, number address and a strong password. The user registered in this schema will be considered as a vendor.

### The T-shirt Model ===>
Since thios is an e-comm website , specially designed for selling and buying t-shirts. There should be some criteria under which t-shirts are accepted. Here comes the concept of t-shirt model. This schema dfines the information about the t-shirts for convenience of customer as well as vendor. It consist a name(could be brand), brief description, quantity, sizes, colors and availability.

### The Order Model ===>
The last but not the least is Order model. It will be holding all the order of any specific user for the record. It consist the keys like productId, quantity, total price, user Id, and status of order.

