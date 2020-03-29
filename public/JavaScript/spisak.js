var Spisak = (function(){

    return{
        kodReview:function(){
	var vrijednosti = document.getElementById('unosText').value.split('\n');

	if(Spisak.sviRazliciti(vrijednosti) != -1)
		Spisak.uSlucajuGreske("U " + Spisak.sviRazliciti(vrijednosti) +  ".  redu se nalaze isti indeksi!");
	else if(Spisak.provjeriIndeks(vrijednosti) != -1)
	Spisak.uSlucajuGreske("U " + Spisak.provjeriIndeks(vrijednosti) +  ".  redu se nalazi neispravan indeks!");
	else 
	{
		document.getElementById("unosSpiska_greske").style.display="block";
		document.getElementById("unos_ispis").innerHTML = "Datoteka uspjesno kreirana!";
		for(var i =0; i < vrijednosti.length; i++){
			vrijednosti[i] = vrijednosti[i].split(',');
		
		}
		var ajax = new XMLHttpRequest();
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				
			} else if ( ajax.readyState == 4){
			}
		}

		var JSONobjekat ={
					unosText: vrijednosti, 
					unosSpirala:document.getElementById("unosSpirala").value
		};
	}
		ajax.open('POST','unosSpiska/podaci', true); 
		ajax.setRequestHeader("Content-type", "application/json");
		ajax.send(JSON.stringify(JSONobjekat));
	
},

uSlucajuGreske:function(greska)
{
	document.getElementById("unosSpiska_greske").style.display="block";
	document.getElementById("unos_ispis").innerHTML = greska;
},

/*Funkcija provjerava da li se u nekom redu matrica nalaze dva ista elementa.
  U slucaju da se nalaze, vraca broj reda u kojem se nalaze ti elementi u suprotnom vraca -1.*/
  sviRazliciti:function(niz)
  {
	  var i;
	  for(i = 0; i < niz.length; i++)
	  {
		  var red = niz[i].split(',');
		  for(var j = 0; j < red.length; j++)
		  {
			  for(var k = 0; k < red.length; k++)
				  {
					  if(k != j && red[k] == red[j])
					  return i + 1;
				  }
		  }
	  }
	  return -1;
  },
  
  provjeriIndeks:function(niz)
  {
	  var i;
	  for(i = 0; i < niz.length; i++)
	  {
		  var red = niz[i].split(',');
		  for(var j = 0; j < red.length; j++)
		  {
			  if(!Validacija.validirajIndex(red[i]))
				  return i + 1;
		  }
	  }
	  return -1;
  }
}
}());