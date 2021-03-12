var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');


// mongoose.connect('mongodb://localhost:27017/Todos', {useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true},function(err){
//     if(err)
//     console.log("error in connection",err)
//     else
//     console.log("connection successful");
// });
mongoose.connect('mongodb://username:password@mongodb-service:27017/Todos?authSource=admin', {useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true},function(err){
    if(err)
    console.log("error in connection",err)
    else
    console.log("connection successful");
});
module.exports = {mongoose};
