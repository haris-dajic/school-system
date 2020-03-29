/*Provjeru indeksa mogu dodatno provjeriti i preko funkcija validiraj.*/ 
/*Provjeriti dodavanje u json */
var KreirajFajl=(function(){
    return {
        kreirajKomentar = function(spirala, index, sadrzaj, fnCallback)
        {
            var objekat = JSON.parse(sadrzaj);
			if(objekat.sifra_studenta === undefined ||  objekat.tekst === undefined || objekat.ocjena === undefined || spirala.length == 0 || index.length == 0){
				fnCallback(-1, 'Neispravni parametri!');
			}
			else{
				var ajax = new XMLHttpRequest();

				var JSONobjekat = JSON.stringify({
					spirala: spirala, 
					index:index,
					sadrzaj:sadrzaj
				});

				ajax.onreadystatechange = function() {
					if(ajax.readyState == 4 && ajax.status == 200){
						fnCallback(null, ajax.responseText);
					}
					else if(ajax.readyState == 4){
						fnCallback(ajax.status, ajax.responseText);
					}
				};
				ajax.open("POST",'http://localhost:3000/komentar', true); 
				ajax.send(JSONobjekat);
			}
        },
        kreirajListu = function(godina, nizRepozitorija, fnCallback)
        {
            if(godina.length == 0 || nizRepozitorija.length == 0 || godina === undefined || nizRepozitorija === undefined)
                fnCallback(-1, 'Neispravni parametri!');
            else{
                
                var ajax = new XMLHttpRequest();

				var JSONobjekat = JSON.stringify({
                    godina: godina,
                    nizRepozitorija: nizRepozitorija
				});

				ajax.onreadystatechange = function() {
					if(ajax.readyState == 4 && ajax.status == 200){
						fnCallback(null, ajax.responseText);
					}
					else if(ajax.readyState == 4){
						fnCallback(ajax.status, ajax.responseText);
					}
				};

                ajax.open("POST",' http://localhost:3000/lista', true);
                ajax.send(JSONobjekat);
            }
        },
        kreirajIzvjestaj = function(spirala,index, fnCallback)
        {
            if(spirala.length == 0 || index.length == 0 || index === undefined)
                fnCallback(-1, 'Neispravni parametri!');
            else{
                
                var ajax = new XMLHttpRequest();

				var JSONobjekat = JSON.stringify({
                    spirala: spirala,
                    index: index
				});

				ajax.onreadystatechange = function() {
					if(ajax.readyState == 4 && ajax.status == 200){
						fnCallback(null, ajax.responseText);
					}
					else if(ajax.readyState == 4){
						fnCallback(ajax.status, ajax.responseText);
					}
				};

                ajax.open("POST",' http://localhost:3000/izvjestaj', true);
                ajax.send(JSONobjekat);
            }
        },
        kreirajBodove = function(spirala,index, fnCallback)
        {
            if(spirala.length == 0 || index.length == 0 || index === undefined)
                fnCallback(-1, 'Neispravni parametri!');
            else{
            
            var ajax = new XMLHttpRequest();

            var JSONobjekat = JSON.stringify({
                spirala: spirala,
                index: index
            });

            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4 && ajax.status == 200){
                    fnCallback(null, ajax.responseText);
                }
                else if(ajax.readyState == 4){
                    fnCallback(ajax.status, ajax.responseText);
                }
            };

                ajax.open("POST",'http://localhost:3000/bodovi', true); 
                ajax.send(JSONobjekat);
            }
        }        
    }
})();
