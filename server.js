var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./src/db/mongoose');
var {Todo} = require('./src/model/todo');
const {ObjectID} = require('mongodb');

var app = new express();
const port = process.env.PORT || 8080;
var router = express.Router();

app.use(bodyParser.json({extended:true})) ///converts it in object

router.route('/todos')
.get((req,res)=>{
    Todo.find({},(err,todos)=>{
        if(err)
            res.json({msg :'Error in fetching data'});
        else
        res.json({data:todos});
    })
    // res.json(users);
})
.post((req,res)=>{
    var todo = new Todo({
        text: req.body.text
      });
      todo.save((err)=>{
        if(err)
            res.json({msg :'Error in saving data',errors:err});
        else
        res.json({msg :'new todo created'});
    })
})

router.route('/todos/:id')
.get((req,res)=>{
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });

})
.put((req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

    Todo.findOneAndUpdate(id,{text:req.body.text,completed:req.body.completed},(err,user)=>{
      console.log(user);
        if(err)
        res.json({msg :'Error in updating todo'});
        else if (!user)
        res.status(404).json({msg :'todo missing'});
        else
        res.json({msg:"todo updated successfully"});
    })
})
.delete((req,res)=>{
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({msg: "Todo deleted successfully"});
    }).catch((e) => {
      res.status(400).send({msg:"Error in deleting todo"});
    });
})


app.use('/api',router) //middleware to direct all req with '/api' to be handled 
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  