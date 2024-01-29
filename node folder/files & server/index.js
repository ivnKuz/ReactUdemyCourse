const fs = require('fs');
const http = require('http');
const url = require('url');

//putting it here cuz this only called once
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
    
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//server fucntion is called every time there is a request
const server = http.createServer((req, res) => {
    
    const pathName = req.url;
    //Overview page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
       const cardsHTML =  dataObj.map(el => replaceTemplate(tempCard, el)).join();
        
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML)
        res.end(output);
    }
    //Product
    else if (pathName === '/product'){
        res.end('this is the product');
    } 
    //API
    else if( pathName === '/api'){
        
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);

    } 
    //NOT FOUND
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end(`<h1> Page not found! </h1>`);
    }
});

server.listen(8080, '127.0.0.1', ()=>{
    
    console.log('listening to requests on port 8080');
    
})




//file
fs.writeFile('./final.txt', 'something', 'utf-8', err => {
    console.log('success lol');
    
})