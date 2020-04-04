const fs = require('fs');
const http = require('http');
const url = require('url');
const Events = require('events');
const em = new Events();
const PATH = "www/";
let brojac = 3;
let t1 = null;
let osobe = [
    {
        "id": 1,
        "ime": "Milovan",
        "prezime": "Srejic",
        "mestoRodjenja": "Krusevac"
    },
    {
        "id": 2,
        "ime": "Milos",
        "prezime": "Srejic",
        "mestoRodjenja": "Krusevac"
    },
    {
        "id": 3,
        "ime": "Andjela",
        "prezime": "Gobeljic",
        "mestoRodjenja": "Kraljevo"
    }
];
http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/bootstrap.css"){ 
            fs.readFile(PATH + "node_modules/bootstrap/dist/css/bootstrap.css", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/bootstrap.js"){ 
            fs.readFile(PATH + "node_modules/bootstrap/dist/js/bootstrap.js", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }        
        if (urlObj.pathname == "/jquery.js"){ 
            fs.readFile(PATH + "node_modules/jquery/dist/jquery.js", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/"){            
            fs.readFile(PATH + "index.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/osoba"){
            let query = urlObj.query;
            let osoba = osobe.find(x => x.id == query.id);
            res.writeHead(200);
            res.end(JSON.stringify(osoba));
        }
    }
    else if(req.method == "POST") {
        brojac = 3;
        if (urlObj.pathname == "/sveOsobe"){
            res.writeHead(200);
            res.end(JSON.stringify(osobe));
        }
        if (urlObj.pathname == "/brisanjeOsobe"){
            let pomocniniz = [];
            let query = urlObj.query;
            for(let i=0; i<osobe.length; i++){
                if(osobe[i].id != query.id){
                    pomocniniz.push(osobe[i]);
                }
            }
            osobe = pomocniniz;
            t1 = setTimeout(brisanje,1000,brojac);
            function brisanje(parametar){                
                if (brojac > 0){           
                    em.emit("obradaBrisanjaOsobe","Preostali broj sekundi do brisanja osobe sa parametrom id="
                        + query.id + " je: " + brojac,brojac);         
                    t1 = setTimeout(brisanje,1000,brojac--);
                }
                else {
                    em.emit("obradaBrisanjaOsobe","Osoba sa parametrom id=" + query.id + " je obrisana",brojac);
                    res.writeHead(200);
                    res.end(JSON.stringify(osobe));
                    clearTimeout(t1);
                }
            }
        }
    }
}).listen(2000);

em.addListener("obradaBrisanjaOsobe", function (data){
    console.log(data);
});