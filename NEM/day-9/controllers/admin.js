const mongodb = require('mongodb');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // const product = new Product(title, price, description, imageUrl, null, req.user._id);

  // we pass one JS object where we map the values that we defined in our schema
  // order doesnt matter since its a js object
  // right side is the data we received,
  // left side is the key 

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });

  // model has a save() method provided my mongoose.
  product
    .save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        console.log("redirecting to home page...");
        console.log("no product found..");
        return res.redirect('/');
      }

      console.log(product);

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // const objectId = new mongodb.ObjectId(prodId);
  // console.log(objectId);

  // const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);

  Product
    .findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;

      // we can call save() on product fetched from DB
      // it is not a simple JS object
      // it is a mongoose object here, with all methods.
      // the changes will only be saved not a new product.
      return product.save();
    })
    .then(result => {
      console.log(result);
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

};

exports.getProducts = (req, res, next) => {
  Product
    .find()
    // .select('title price -_id') 
    // id will always be retrieved unless you explicitly exclude it.

    // .populate('userId', "name email") 
    // you dont need to write nested queries!
    // you can get all data for that document(user here)
    .then(products => {
      console.log(products);
      // res.json(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {

  const prodId = req.body.productId;

  Product.findByIdAndRemove(prodId)
    .then(result => {
      console.log('DESTROYED PRODUCT', result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};