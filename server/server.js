const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const SHA256 = require('crypto-js/sha256');
const leveldbinst = require('./levelSandbox');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

const { User } = require('./models/user'); 
const { Book } = require('./models/book');
const { auth} = require('./middleware/auth')

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

class Block{
    constructor(data){
     this.hash = "",
     this.height = 0,
     this.body = data,
     this.time = 0,
     this.previousBlockHash = ""
    }
}

class Blockchain{
    constructor(){
      this.getBlockHeight().then((height) => {
          if (height < 0) {
              let newBlock = new Block("Genesis block ");
              this.addBlock(newBlock).then(() => console.log("Genesis block added!"));
          }
      });
    }

    async addBlock(newBlock){
      const height = await this.getBlockHeight();
      newBlock.height = height + 1;
      newBlock.time = new Date().getTime().toString().slice(0, -3);

      if (newBlock.height > 0) {
          const prevBlock = await this.getBlock(height);
          newBlock.previousBlockHash = prevBlock.hash;
          console.log(`Previous hash: ${newBlock.previousBlockHash}`);
      }

      newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
      console.log(`New hash: ${newBlock.hash}`);
      app.get('/api/new',(req,res)=>{
            res.send({
              name: newBlock
            })    
      })
      await leveldbinst.addBlock(newBlock.height, JSON.stringify(newBlock));
    }

    async getBlockHeight(){
        return await leveldbinst.getBlockHeight();
    }


    async getBlock(blockHeight){
        return JSON.parse(await leveldbinst.getBlock(blockHeight));
    }


    async validateBlock(blockHeight){
      let block = this.getBlock(blockHeight);
      let blockHash = block.hash;
      block.hash = '';
      let validBlockHash = SHA256(JSON.stringify(block)).toString();

      if (blockHash == validBlockHash) {
          return true;
        } else {
          console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
          return false;
        }
    }

    async validateChain(){
      let errorLog = [];
      let blockhash ='';
      const height = await this.getBlockHeight();
      for (var i = 0; i < height; i++) {
        let block = await this.getBlock(i);

        if (!this.validateBlock(i))errorLog.push(i);
        if (block.previousBlockHash != blockhash){
          errorLog.push(i)
        }
        blockhash = block.hash

      if (errorLog.length>0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: '+errorLog);
      } else {
        console.log('No errors detected');
      }
    }
}}

let blockChain = new Blockchain();

// GET //
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
});


app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})


app.get('/api/getBook',(req,res)=>{
    let id = req.query.id;

    Book.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/books',(req,res)=>{
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id;

    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})

app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.get('/api/user_posts',(req,res)=>{
    Book.find({ownerId:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

// POST //
app.post('/api/book',(req,res)=>{
    const book = new Book(req.body)

    const name = req.body.firstName;
    let newBlock = new Block(name);
    
        blockChain.addBlock(newBlock).then((req, res) => {
            //console.log(res.)
        });

    book.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            bookId: doc._id
        })
    })
})

app.post('/api/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

// UPDATE //
app.post('/api/book_update',(req,res)=>{
    Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})

// DELETE //
app.delete('/api/delete_book',(req,res)=>{
    let id = req.query.id;

    Book.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
})

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`SERVER RUNNNING`)
})