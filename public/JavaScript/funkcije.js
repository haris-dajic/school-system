function button_nastavnik()
{
	document.getElementById("reg_studenta").style.display="none";
	document.getElementById("reg_nastavnika").style.display="block";
	document.getElementById("ispis").style.display="none";
	Poruke.porukeZaIspis = [];
	document.getElementById("imeNas").focus();
}

function button_student()
{
	document.getElementById("reg_nastavnika").style.display="none";
	document.getElementById("reg_studenta").style.display="block";
	document.getElementById("ispis").style.display="none";
	Poruke.porukeZaIspis = [];
	document.getElementById("studIme").focus();
}

function svidja(broj)
{
	var tabela,red;

	if(broj == 1)
		return;

	tabela = document.getElementById("tabelaKomentari");	
	red = tabela.getElementsByTagName("TR");

	red[broj].parentNode.insertBefore(red[broj],red[broj-1]);
}

function ne_svidja(broj)
{
	var tabela,red;
	tabela = document.getElementById("tabelaKomentari");
	red = tabela.getElementsByTagName("TR");	

	if(broj == red.length)
		return;

	red[broj].parentNode.insertBefore(red[broj+1],red[broj]);
}

function validiraj(funkcija,indeks_poruke,ime)
{
	if(!funkcija)
		{	
			Poruke.dodajPoruku(indeks_poruke);	
			document.getElementById(ime).focus();
		}
	else
		Poruke.ocistiGresku(indeks_poruke);

	Poruke.ispisiGreske(); //provjeriti poziv ove f-je
}

function prikazKorisnika()
{
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {// Anonimna funkcija
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("sadrzaj").innerHTML = ajax.responseText;
    }
    ajax.open("GET", "http://localhost:3000/listakorisnika", true);
	ajax.send();
}

function edituj(id)
{
	if(document.getElementById("dugmeVerifikacija" + id).value == 'Verify')
		document.getElementById("dugmeVerifikacija" + id).value = 'Unverify';
	else
		document.getElementById("dugmeVerifikacija" + id).value = 'Verify';


	var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {// Anonimna funkcija
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("sadrzaj").innerHTML = ajax.responseText;
    }
    ajax.open("GET", "http://localhost:3000/edit/"+id, true);
    ajax.send();
}

function pretrazi(ime)
{
	var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {// Anonimna funkcija
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("sadrzaj").innerHTML = ajax.responseText;
    }
    ajax.open("GET", "http://localhost:3000/pretrazi/"+ime, true);
    ajax.send();
}
