 function loadContent(link) {           
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {// Anonimna funkcija
	    if (ajax.readyState == 4 && ajax.status == 200)
		    document.getElementById("sadrzaj").innerHTML = ajax.responseText;
	    if (ajax.readyState == 4 && ajax.status == 404)
		    document.getElementById("sadrzaj").innerHTML = "Greska: nepoznat URL";
    }
    ajax.open("GET",  link + ".html", true);
    ajax.send();
}