// const { json } = require('express');
const express = require('express');
const app = express();
const cors=require('cors');
app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
app.use(cors());

let axios=require('axios');
// app.use(axios)

function isValidJSON(jsonString){
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }


app.post('/fetchData', async(req, res)=>{
  let{method, url, body, headerKey1 ,headerKey2 ,headerKey3 ,headerValue1 , headerValue2 ,headerValue3}=req.body;
  let headers={}
  if(headerKey1){
    headers[headerKey1]=headerValue1;
  }
  if(headerKey2){
    headers[headerKey2]=headerValue2;
  }
  if(headerKey3){
    headers[headerKey3]=headerValue3;
  }
  console.log(req.body);
  if(method=="POST"){
    if(isValidJSON(body)){
      let data1=JSON.parse(body);
      try{
        let response=await axios.post(url, data1, {headers:headers});
        console.log("hii1")
        res.send(response.data);
      }
      catch(err){
        console.log('hiip')
        res.status(401).send('Not Found');
      }
    }
    else{
      console.log('12')
      res.status(401).send('Not Found');
    }
  }
  else if(method=='GET'){
    try{
      // console.log(method), [headerKey2]:headerValue2, [headerKey3]:headerValue3 {headers:{[headerKey1]:headerValue1, [headerKey2]:headerValue2, [headerKey3]:headerValue3}}
      let response=await axios.get(url, {headers:headers});
      console.log("hii2");
      console.log(response.data);
      if(response.data%response.data==0)res.send(""+response.data);
      else res.send(response.data);
    }
    catch(err){
      res.status(401).send('Not Found');
    }
  }
  else if(method=='PUT'){
    if(isValidJSON(body)){
      let data1=JSON.parse(body);
      try{
        let response=await axios.put(url, data1, {headers:headers});
        console.log("hii3")
        res.send(response.data);
      }
      catch(err){
        res.status(401).send('Not Found');
      }
    }
    else{
      console.log('13')
      res.status(401).send('Not Found');
    }
  }
  else if(method=='DELETE'){
    try{
      let response=await axios.delete(url, {headers:headers});
      console.log("hii4");
      res.send(response.data);
    }
    catch(err){
      res.status(401).send('Not Found');
    }
  }
})