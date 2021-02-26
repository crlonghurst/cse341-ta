//TA03 PLACEHOLDER
const express = require('express');

const https = require('https');

const items_per_page = 10;

const renderIndex = (req,res,json)=>{
    let searchedValue = req.body.searchValue || req.query.searchValue || '';
    let page = req.query.page || 1;

    const indexStart = (page - 1) * items_per_page;
    const indexEnd = page * items_per_page;

    const filteredData = global.jsonResponse.filter(x =>
        x.name.toLowerCase().includes(searchedValue.toLowerCase())
    )
    let stuff = {
        data: filteredData.slice(indexStart, indexEnd),
        path: '/prove08/',
        title: 'Week 8 Prove Assignment',
        searchedValue: searchedValue,
        page: parseInt(page),
        numPages: Math.ceil(filteredData.length /items_per_page)
    }

    res.render('../views/pages/prove08.ejs', stuff)
}

exports.processJson = (req,res,next)=>{
    var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
    https
        .get(url,function(response){
            var body = ''

            response.on('data', function (chunkc){
                body+= chunkc;
            })

            response.on('end', function(){
                global.jsonResponse = JSON.parse(body)
                renderIndex(req,res,global.jsonResponse)
            })
        })
        .on('error', function(e){
            console.log('Got an error: ', e)
        })
}


exports.getIndex = (req,res,next)=>{
    renderIndex(req,res,global.jsonResponse);
}