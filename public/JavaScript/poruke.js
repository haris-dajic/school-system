var Poruke=(function(){
    var idDivaPoruka;
    var mogucePoruke = ["Ime i prezime koje ste unijeli nije validno", "Indeks koji ste unijeli nije validan", "Grupa koju ste unijeli nije validna", "Akademska godina koju ste unijeli nije validna", "Password koji ste unijeli nije validan", "Unos nije ekvivalentan passwordu", "Link koji ste unijeli nije validan", "Semestar koji ste unijeli nije validan", "Korisnicko ime koje ste unijeli nije validno","Mail koji ste unijeli nije validan","Neispravan naziv repozitorija"];
    var porukeZaIspis = [];
    return{
       ispisiGreske:function()
        {           
            if(porukeZaIspis.length != 0)
                {  
                   document.getElementById("ispis").style.display="block";
                   document.getElementById("ispis_p").style.display="block";
                }
                else
                document.getElementById("ispis").style.display = "none";
        },
        postaviIdDiva:function(idDiva)
        {
            idDivaPoruka = idDiva;
        },
        dodajPoruku:function(broj_poruke)
        {
            var indeks = porukeZaIspis.indexOf(mogucePoruke[broj_poruke]);
            if(indeks == -1)
                porukeZaIspis.push(mogucePoruke[broj_poruke]);
            document.getElementById("ispis_p").innerHTML = porukeZaIspis;
        },
        ocistiGresku:function(broj_greske)
        {
            var indeks = porukeZaIspis.indexOf(mogucePoruke[broj_greske]);
            if(indeks != -1)
                porukeZaIspis.splice(indeks,1);
        }
    }
}());