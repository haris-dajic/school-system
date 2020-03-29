var Validacija = (function(){

	var maxGrupa = 7;
	var trenutniSemestar = 0;

return{

	validirajFakultetski:function(adresa){

		return /^([a-zA-Z]){1}([a-zA-Z0-9_\.]){2,20}(@etf)(\.)unsa(\.)ba$/.test(adresa);   //Provjeriti da li se smije koristit '_' u mail-u.
	},

	validirajIndex:function(index){

			return /(^1\d{4})$/.test(index); 
	},

	validirajGrupu:function(broj_grupe){

		return broj_grupe > 0 && broj_grupe <= maxGrupa; //mogu i preko regex-a
	},

	validirajAkGod:function(datum){

		var trenutna_godina = new Date();
		var zimski = parseInt(datum[0]+datum[1]+datum[2]+datum[3]);
		var ljetni = parseInt(datum[5]+datum[6]+datum[7]+datum[8]);

		return zimski == trenutna_godina.getFullYear() && ljetni == zimski + 1 || zimski == trenutna_godina.getFullYear() - 1 && ljetni == trenutna_godina.getFullYear();
	},

	validirajPassword:function(password){

		password = password.replace(/\s+/g, ''); //Provjeriti za ovo.Da li trebam obrisati prazna mjesta, ili se i ona uzimaju kao da su znak?

		if(password.length > 20)
			return false;

		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/.test(password);
	},

	validirajPotvrdu:function(sifra_1,sifra_2){
		/**Ima neka greska pa sam iz tog razloga iskljucio ovu validaciju */
	//	if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/.test(sifra_1) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/.test(sifra_2) && sifra_1 == sifra_2) //Možda treba i dodati max duzinu sifre
			return true;
	//	return false;
	},

	validirajBitbucketURL:function(adresa){

		//return /https:(\/{2})([a-zA-Z]){1}([a-zA-Z0-9_]){2,20}@bitbucket(\.)org(\/)([a-zA-Z]){1}([a-zA-Z0-9_]){2,20}(\/)([a-zA-Z]){1}([a-zA-Z0-9_]){2,20}(\.)git$/.test(adresa); //da li nula treba biti ukljucena?
		return true;
	},

	validirajBitbucketSSH:function(repozitorij){

		return /git@bitbucket(\.)org:([a-zA-Z]){1}([a-zA-Z0-9_]){2,20}(\/)([a-zA-Z]){1}([a-zA-Z0-9_]){2,20}(\.)git$/.test(repozitorij); //umjesto + treba da dodam minimalan broj potreban za naziv i maksimalan,treba li dodatno ukljuciti x,y,q
		return	true;
	},

	validirajNazivRepozitorija:function(regex,naziv_reopozitorija){

		if(regex)								
			return regex.test(naziv_reopozitorija);
		return /wt[pP]rojekat(1\d{4})$/.test(naziv_reopozitorija);
		
	},

	validirajImeiPrezime:function(naziv){

		return /^[A-ZĐČĆŽŠ]{1}[a-zčđćžš\-']{0,11}\s{0,1}[a-zčđćžš']{0,11}(?<=[-\s])([A-ZĐČĆŽŠ]{1})[a-zčćđž'š]{2,12}([-\s']{0,1}([a-zčđćžš']{0,11})(?<=[-\s])([A-ZĐČĆŽŠ]{1})[a-zčđćžš']{2,12}){0,2}$/.test(naziv);	
		}
	}
}());

