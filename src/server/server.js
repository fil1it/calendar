var express = require('express');
var cors = require('cors');
var path = require('path');
var fs = require('fs');

var jsonParser = express.json();
var app = express();
app.use(cors());

app.post("/reg", jsonParser, function(request, response){
    var fileName = path.resolve(__dirname, 'data/users.json')
    
    let data = fs.readFileSync(fileName, 'utf-8')
    let users = JSON.parse(data)
    let newUser = request.body
    
    users.push(newUser)
    fs.writeFileSync(fileName, JSON.stringify(users))
    response.sendFile(fileName,{})
})

app.post("/login", jsonParser, function(request, response){
    var fileName = path.resolve(__dirname, 'data/users.json')
    let data = fs.readFileSync(fileName, 'utf-8')
    let users = JSON.parse(data)
    let done = false;
    let userId = "";
    let name = "";
    const {email, password} = request.body
    for(var i = 0; i < users.length; i++){
        if(users[i].email == email && users[i].password == password){
            userId = users[i].userId 
            name = users[i].name
            done = true
            break;
        }
    }
    if(done){
        return response.json({userId, name})
    }else{
        return response.status(400).json({message:"Ошибка"})
    }
})



app.post("/add", jsonParser, function(request, response){
    var fileName = path.resolve(__dirname, 'data/events.json')
    let data = fs.readFileSync(fileName, 'utf-8')
    let events = JSON.parse(data)
    let newEvent = request.body
    events.push(newEvent)
    fs.writeFileSync(fileName, JSON.stringify(events))
    response.sendFile(fileName,{})
})

app.post("/delete", jsonParser, function(request, response){
    
    var fileName = path.resolve(__dirname, 'data/events.json')
    let data = fs.readFileSync(fileName, 'utf-8')
    let events = JSON.parse(data)
    let {delId} = request.body
    let i = events.findIndex(el => el.eventId == delId)
    events.splice(i,1)
    // for(var i = 0; i < events.length; i++){
    //     if(events[i].eventId == delId){
            
    //     }
    // }
    fs.writeFileSync(fileName, JSON.stringify(events))
    response.sendFile(fileName,{})
})

app.get('/events', function(request, response){
    var eventsFileName = path.resolve(__dirname, './data/events.json')
    response.sendFile(eventsFileName,{})
})

app.post("/events", jsonParser, function(request, response){
    var fileName = path.resolve(__dirname, 'data/events.json')
    let data = fs.readFileSync(fileName, 'utf-8')
    let events = JSON.parse(data)
    let curEvents = []
    for(var i = 0; i < events.length; i++){
        var date1 = new Date(request.body.date)
        var date2 = new Date(events[i].date)
        if(date1.toLocaleDateString() == date2.toLocaleDateString()){
            curEvents.push(events[i])
        }
    }
    return response.json(curEvents)
    response.sendFile(fileName,{})
})

app.get('/users', function(request, response){
    var usersFileName = path.resolve(__dirname, './data/users.json')
    response.sendFile(usersFileName,{})
})



app.listen(5000);