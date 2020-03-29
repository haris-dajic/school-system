function registracijaStudenta()
{
         
       var JSONobjekat = JSON.stringify({
            imePrezime: document.getElementById("studIme").value,
            korisnickoIme: document.getElementById("korIme").value,
            index:document.getElementById("brIndeksa").value,
            grupa:document.getElementById("grupa").value, //provjeriti
            akGodina:document.getElementById("akGodinaStud").value,
            nazivRepozitorija:document.getElementById("nazivRepoz").value,
            password:document.getElementById("passStud").value,
            bitBucket:document.getElementById("bitbucketURL").value,
            ssh:document.getElementById("ssh").value
        });

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200){
                console.log(ajax.responseText);
            }
            else if(ajax.readyState == 4){
                console.log(ajax.status, ajax.responseText);
            }
        };
        ajax.open("POST",'http://localhost:3000/registrujstudenta', true); 
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSONobjekat);

}


function registracijaNatavnika()
{
         
       var JSONobjekat = JSON.stringify({
            imePrezime: document.getElementById("imeNas").value,
            korisnickoIme: document.getElementById("korisnickoIme").value,
            grupa:document.getElementById("brGrupa").value, //provjeriti razliku izmedju nas i stud za broj grupa
            akGodina:document.getElementById("akGodina").value,
            password:document.getElementById("nasPass").value,
            ssh:document.getElementById("ssh").value,
            mail:document.getElementById("fakultet_mailNas").value,
            semestar:document.getElementById("brGrupa").value,
            regex:document.getElementById("regex").value
        });

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200){
                console.log(ajax.responseText);
            }
            else if(ajax.readyState == 4){
                console.log(ajax.status, ajax.responseText);
            }
        };
        ajax.open("POST",'http://localhost:3000/registrujnastavnika', true); 
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSONobjekat);

}