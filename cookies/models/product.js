const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type:Schema.Types.ObjectId,
    required:true,
    //refering to the User model
    ref: 'User'
  }
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require("mongodb");

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection("products").updateOne(
//         {
//           _id: this._id,
//         },
//         {
//           $set: this,
//         }
//       );
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log("product save success", result);
//       })
//       .catch((err) => {
//         console.log("product save error", err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     //find returns a cursor not a promise
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log("find all product", products);
//         return products;
//       })
//       .catch((err) => {
//         console.log("product find all err", err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({
//         _id: new mongodb.ObjectId(prodId),
//       })
//       .next()
//       .then((product) => {
//         console.log("products findById", product);
//         return product;
//       })
//       .catch((err) => consolelog("product findById err", err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     db.collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log("product deleteById DELETED");
//       })
//       .catch((err) => {
//         console.log("product deleteById err", err);
//       });
//   }
// }

// module.exports = Product;
