const https = require('https');

const items_per_page = 10;

let newAdditions = 0;

const getNext10 = (req,res,json)=>{
    newAdditions += 10;
    var url = 'https://pokeapi.co/api/v2/pokemon?offset='+newAdditions+'&limit='+items_per_page;
    
    https
        .get(url,function(response){
            var body = ''

            response.on('data', function (chunkc){
                body+= chunkc;
            })

            response.on('end', function(){
                global.jsonResponse = JSON.parse(body)

                let stuff ={
                    data: global.jsonResponse.results,
                    path: '/prove09/',
                    title:' Week 9 Prove Assignment',
                    numPages: newAdditions
                }
                res.render('../views/pages/prove09.ejs', stuff);
                // renderIndex(req,res,global.jsonResponse)
            })
        })
        .on('error', function(e){
            console.log('Got an error: ', e)
        })
}

const getLast10 = (req,res,json)=>{
    if(newAdditions == 0){
        res.redirect('/prove09')
    }
    newAdditions -= 10;
    var url = 'https://pokeapi.co/api/v2/pokemon?offset='+newAdditions+'&limit='+items_per_page;
    
    https
        .get(url,function(response){
            var body = ''

            response.on('data', function (chunkc){
                body+= chunkc;
            })

            response.on('end', function(){
                global.jsonResponse = JSON.parse(body)

                let stuff ={
                    data: global.jsonResponse.results,
                    path: '/prove09/',
                    title:' Week 9 Prove Assignment',
                    numPages: newAdditions
                }
                res.render('../views/pages/prove09.ejs', stuff);
                // renderIndex(req,res,global.jsonResponse)
            })
        })
        .on('error', function(e){
            console.log('Got an error: ', e)
        })
}

exports.processJson = (req,res,next)=>{
    newAdditions = 0;
    var url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit='+items_per_page;
    https
        .get(url,function(response){
            var body = ''

            response.on('data', function (chunkc){
                body+= chunkc;
            })

            response.on('end', function(){
                global.jsonResponse = JSON.parse(body)
                let stuff ={
                    data: global.jsonResponse.results,
                    path: '/prove09/',
                    title:' Week 9 Prove Assignment',
                    numPages: newAdditions
                }
                res.render('../views/pages/prove09.ejs', stuff);
                // renderIndex(req,res,global.jsonResponse)
            })
        })
        .on('error', function(e){
            console.log('Got an error: ', e)
        })
}


exports.getNext10 = (req,res,next)=>{
    getNext10(req,res,global.jsonResponse);
}

exports.getLast10 = (req,res,next)=>{
    getLast10(req,res,global.jsonRespon);
}