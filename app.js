const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome in iauro team'
    });

});


app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey',(err,authData) => {
        if(err){
            res.sendStatus(403);

        }else {
            res.json({
                message:' post created......',
                authData
            });
        }

    });
    
});

app.post('/api/login', (req,res) => {
    //MOCK user
    const user = {
        id:1,
        username:'vrusha',
        email:'vrusha@gmail.com'
    }
    jwt.sign({user}, 'secretkey',(err,token) => {
        res.json({
            token
        });

    });
});


//FORMAT of Token
//Authorization: Bearer <access_token>

//verify Token
function verifyToken(req,res,next) 
{
  //GET auth header value
  const bearerHeader = req.headers['authorization'];
  //CHECK if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
  //SPLIT at the space
  const bearer = bearerHeader.split('');
  //GET token from array
  const bearerToken = bearer[1];
  //SET the token
  req.token = bearerToken;
  //NEXT middleware
  next();

  } else {
      //forbidden
      res.sendStatus(403);
  }

}
app.listen(5000, () => console.log('server started on port 5000'));
