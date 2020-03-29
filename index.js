//username: Administrator, sifra: Admin
/**
 * Obzirom da nije naglašeno, neke stvari kao ispis pri login-u u slucaju pogresnih podataka
 * nisam uradio, ali se u konzoli ispise string koji opisuje gresku ili neko ogranicenje
 * Također pri login-u, na button za login mora se dva puta kliknuti, ne znam iz kojeg razloga jer mi ne javlja nikakvu grešku
 */
var express = require('express');
var session = require('express-session');
var fs = require('fs');
var bodyParser = require('body-parser');
var Sequelize = require("sequelize");
var bcrypt = require('bcrypt');
const path = require("path");
var xssFilters = require('xss-filters');

const sequelize = require(__dirname + '/public/JavaScript/baza.js');
const Korisnik = sequelize.import(__dirname+"/public/Baza/korisnik.js");
const LicniPodaci = sequelize.import(__dirname+"/public/Baza/LicniPodaci.js");
const Role = sequelize.import(__dirname+"/public/JavaScript/role.js");

LicniPodaci.belongsTo(Korisnik);
LicniPodaci.belongsTo(Role);

Korisnik.sync().then(function(){
    bcrypt.hash('Admin', 17, function(err, hash) {
        Korisnik.findOrCreate({where: {ime: 'Administrator'}, defaults: {sifra: hash}});
    });
});
Role.sync().then(function(){
    Role.findOrCreate({where:{id:1,tip:'Administrator'}});
    Role.findOrCreate({where:{id:2,tip:'Profesor'}});
    Role.findOrCreate({where:{id:3,tip:'Student'}});
});
setTimeout(function(){LicniPodaci.sync();}, 300);

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key:'user',
    secret: 'neka tajna sifra',
    resave: false,
    saveUninitialized: true
 }));


app.get('/',function(req,res)
{
    res.sendFile(__dirname + '/HTML/index.html');   
});

app.get('/login.html',function(req,res)
{
    if(!req.session.tip && !req.session.korisnikId)
        res.sendFile(__dirname + "/HTML/login.html");
});

app.get('/unoskomentara.html',function(req,res)
{       
    if(req.session.tip ==  'Student')
        res.sendFile(__dirname + "/HTML/unoskomentara.html");
    else{
        return  res.status(500).send("Neispravna registracija!");
    }
});

app.get('/unosSpiska.html',function(req,res)
{
    if(req.session.tip == 'Profesor')
    {
           res.sendFile(__dirname +  "/HTML/unosSpiska.html");
    }
    else
        return res.status(500).send();

    });

app.get('/statistika.html',function(req,res)
{
    if(req.session.tip == 'Profesor' || req.session.tip == 'Student')
        res.sendFile(__dirname + "/HTML/statistika.html");
    else
     return  res.status(500).send();

});

app.get('/bitBucket.html',function(req,res)
{

    if(req.session.tip == 'Profesor')
    {
        res.sendFile(__dirname + "/HTML/bitBucket.html");
    }
    else
        return res.status(500).send("Samo profesor moze pristupiti ovoj stranici.");
});

app.get('/nastavnik.html',function(req,res)
{
    if(req.session.tip == 'Profesor')
        res.sendFile(__dirname + "/HTML/nastavnik.html");
    else
        return res.status(500).send("Samo profesor moze pristupiti ovoj stranici.");
});

app.get("/unosSpiska/podaci", function(req, res)
{
		fs.writeFile('spisakS' + req.body.unosSpirala + '.json',JSON.stringify(require.body.unosText),function(err){
            if(err) throw err;
        });
});
/**Dodao sam da ako je neko vec logovan da ne moze registrovat nekog novog, studenta ili nastavnika */
app.post("/registrujstudenta",function(req,res)
{   
    var user = xssFilters.inHTMLData(req.body.korisnickoIme);
    var password = xssFilters.inHTMLData(req.body.password);
    var imeiprezime = xssFilters.inHTMLData(req.body.imePrezime);
    var inx = xssFilters.inHTMLData(req.body.index);
    var grp = xssFilters.inHTMLData(req.body.grupa);
    var god = xssFilters.inHTMLData(req.body.akGodina);
    var repoz = xssFilters.inHTMLData(req.body.nazivRepozitorija);
    var bucket = xssFilters.inHTMLData(req.body.bitBucket);
    var s = xssFilters.inHTMLData(req.body.ssh);

    if(!req.session.tip && !req.session.korisnikId){
    bcrypt.hash(password, 17, function(err, hash) {

        Korisnik.create({
            ime:user, 
            sifra:hash
        }).then(function(rezultat){
            LicniPodaci.create(
            {
                imePrezime: imeiprezime,
                korisnickoIme:user,
                index:inx,
                grupa:grp,
                akGodina:god,
                nazivRepozitorija:repoz,
                bitBucket:bucket,
                ssh:s,
                korisnikId: rezultat.dataValues.id,
                roleId:3

            })}
        ).catch(function(error){
            res.sendStatus(500).send(error);
        });
      });
    }
});

app.post("/registrujnastavnika",function(req,res)
{
    var user = xssFilters.inHTMLData(req.body.korisnickoIme);
    var password = xssFilters.inHTMLData(req.body.password);
    var imeiprezime = xssFilters.inHTMLData(req.body.imePrezime);
    var inx = xssFilters.inHTMLData(req.body.regex);
    var grp = xssFilters.inHTMLData(req.body.grupa);
    var god = xssFilters.inHTMLData(req.body.akGodina);
    var m = xssFilters.inHTMLData(req.body.mail);
    var sem = xssFilters.inHTMLData(req.body.semestar);
    var s = xssFilters.inHTMLData(req.body.ssh);


    if(!req.session.tip && !req.session.korisnikId){
    bcrypt.hash(password, 17, function(err, hash) {
        Korisnik.create({
            ime:user,
            sifra: hash,
            verified: 0
        }).then(function(rezultat){
            LicniPodaci.create(
            {
                imePrezime:imeiprezime,
                korisnickoIme:user,
                grupa:grp,
                akGodina:god,
                ssh:s,
                mail:m,
                semestar:sem,
                regex:inx,
                korisnikId: rezultat.dataValues.id,
                roleId:2
            })}
        ).catch(function(error){
            res.sendStatus(500).send(error);
            res.end();
        });
      });
    }
});


app.post("/logovanje",function(req,res){

    var email = xssFilters.inHTMLData(req.body.email);
    var password = xssFilters.inHTMLData(req.body.password);
        Korisnik.findAll({
            where: {
              ime:email
            }
          }).then(podaci =>{
           if(podaci.length == 0)
            {
                console.log(podaci.length);    
                return res.status(500).send("Greska");
            }
            bcrypt.compare(podaci[0].dataValues.sifra,password,function(err,rez)
            {
                if(rez || err)
                    return res.status(500).send("Pogrešna šifra!"); // provjeriti ovo još jednom
                if(podaci[0].dataValues.ime == 'Administrator' && !rez)
                {
                    console.log("Admin");
                    req.session.korisnikId = podaci[0].dataValues.id;
                    req.session.tip = 'Administrator';
                    req.session.save();
                    res.send('Admin');
                    res.end();
                }
            });
        LicniPodaci.findAll({
            where:{
                korisnikId:podaci[0].dataValues.id
                }
            }).then(user => {
                if(user.length == 0)
                    return res.status(500).send();
            Role.findAll({
                where:{
                    id:user[0].dataValues.roleId
                }}).then(korisnik => {
                    if(korisnik.length == 0 || (korisnik[0].dataValues.tip == 'Profesor' && podaci[0].dataValues.verified == 0)) //mozda dodat dodatne podatke o greski i razdvojiti ovo na dva if-a
                        return res.status(500).send("Korisnik nije verifikovan!"); //dodat cache
                if(!req.session.korisnikId && !req.session.tip)
                {
                    req.session.korisnikId = podaci[0].dataValues.id;
                    req.session.tip = korisnik[0].dataValues.tip;
                    req.session.save();
                }               
            });
        });

    }).catch(function(error){
        res.sendStatus(500).send(error);
    });
    if(req.session.tip == 'Student')
    {    
        res.send('Student'); 
        res.end();
    }
    else if(req.session.tip == 'Profesor')
    {
            res.send('Profesor');
            res.end();
    }   

});

/*4 zadatak*/
app.get("/listakorisnika",function(req,res){
    
    if(req.session.tip == 'Administrator'){
    Korisnik.findAll().then(function(results){
        var ispis = '';
        var redovi = [];

        for(i = 0; i < results.length;i++)
        {
            var varijable = results[i].dataValues;
            if(varijable.ime != 'Administrator'){
            var red = '<tr><td>' + varijable.ime+ '</td>';
            if(varijable.verified == 1)
                red += '<td><input type="button"  id='+'"dugmeVerifikacija' + varijable.id + '" value="Unverify" onclick=' +'"edituj('+ varijable.id + ')"></input></td>'; 
            else if(varijable.verified == 0)
                red += '<td><input type="button" id='+'"dugmeVerifikacija' + varijable.id + '" value="Verify" onclick=' +'"edituj('+ varijable.id + ')"></input></td>';
            red += '</tr>';
            redovi.push(red);
            }
        }
        var ispis = '<table id="ispisId">';
        //dodaj zaglavlje tabele tj jedan red Ime Prezime Korisnicko Ime ...
        //ispis += '';
        for(i = 0; i < redovi.length;i++)
        {
            ispis += redovi[i];
        }
        ispis += '</table>';
        ispis += '<td><input type="text" id="pretragaUnos"></td>"';
        ispis += '<td><button type="button" id="pretraga"  onclick=' + '"pretrazi(' + "document.getElementById('pretragaUnos').value" + ')">Pretrazi</button></td>'; //dodati poziv funckije
        res.send(ispis);
        res.end();
    });
}
});


app.get('/edit/:id',function(req,res){
    
    var d = xssFilters.inHTMLData(req.params.id);
    Korisnik.findById(d).then(function(rezultat){
            
            if(rezultat.length == 0)
                return res.status(401).send();
            if(rezultat.ime != 'Administrator')
            {
                if(rezultat.verified == 1)
                    rezultat.update({verified:0});
                else
                    rezultat.update({verified:1});
            } 
        });
});

app.get('/pretrazi/:ime',function(req,res){

    var name = xssFilters.inHTMLData(req.params.ime);
    Korisnik.findAll({
        where:{
            ime:name
        }
    }).then(function(results){
        var ispis = '';
        var redovi = [];
        
        for(i = 0; i < results.length;i++)
        {
            var varijable = results[i].dataValues;
            if(varijable.ime != 'Administrator'){
            var red = '<tr><td>' + varijable.ime+ '</td>';
            if(varijable.verified == 1)
                red += '<td><input type="button" id='+'"dugmeVerifikacija' + varijable.id + '" value="Unverify" onclick=' +'"edituj('+ varijable.id + ')"></input></td>'; 
            else if(varijable.verified == 0)
                red += '<td><input type="button" id='+'"dugmeVerifikacija' + varijable.id + '" value="Verify" onclick=' +'"edituj('+ varijable.id + ')"></input></td>';
            red += '</tr>';
            redovi.push(red);
        }
    }
        var ispis = '<table id="ispisId">';
        //dodaj zaglavlje tabele tj jedan red Korisnicko Ime ...
        //ispis += '';
        for(i = 0; i < redovi.length;i++)
        {
            ispis += redovi[i];
        }
        ispis += '</table>';
        ispis += '<td><input type="text" id="pretragaUnos"></td>"';
        ispis += '<td><button type="button" id="pretraga" onclick=' + '"pretrazi(' + "document.getElementById('pretragaUnos').value" + ')">Pretrazi</button></td>'; //dodati poziv funckije
        res.send(ispis);
        res.end();
    });    
});


//
app.listen(3000, function(){
    console.log('Server pokrenut!'); 
});
