var BitbucketApi = (function(){
    return {
        dohvatiAccessToken: function(key, secret, fnCallback)
        {
            if(key == null || secret == null)
                fnCallback(-1,'Key ili secret nisu pravilno proslijeđeni!');
            else{
                
                var ajax = new XMLHttpRequest();
             
                ajax.onreadystatechange = function() {
                    if (ajax.readyState == 4 && ajax.status == 200)
                        fnCallback(null,JSON.parse(ajax.responseText).access_token);
                    else if (ajax.readyState == 4)
                        fnCallback(ajax.status,null);
                }
                ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ':' + secret)); 
                ajax.send("grant_type="+encodeURIComponent("client_credentials"));
            }   
        },
        /*Provjeriti sta je pagelen i postaviti ga na 150 */
        dohvatiRepozitorije: function(token, godina, naziv, branch, fnCallback)
        {
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200)
                {
                    var podaci = JSON.parse(ajax.responseText).values;
                    var repozit = [];
                    for(var i = 0; i <  podaci.length; i++)
                    {
                        var godinaKreiranja = (new Date(podaci[i].created_on)).getFullYear();
                        if(podaci[i].full_name.indexOf(naziv) !== -1 && (godinaKreiranja == godina || godinaKreiranja == godina + 1))
                        {
                            var pomocnaFunakcija = function(err,data)
                            {
                                if(data)
                                    repozit.push(podaci.links.clone[1].href); 
                            };

                            dohvatiBranch(token, repozit[i].links.branches.href, branch, pomocnaFunakcija);    
                        }
                    } 
                    fnCallback(null,repozit);
                }
                else if (ajax.readyState == 4)
                    fnCallback(ajax.status,null);
                }
                    ajax.open("GET","https://api.bitbucket.org/2.0/repositories?role=member");
                    ajax.setRequestHeader("Authorization", 'Bearer ' + token);
                    ajax.send();
            },
        dohvatiBranch: function(token, url, naziv, fnCallback)
        {
            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function()
            {
                if (ajax.readyState == 4 && ajax.status == 200)
                {   
                    var lista_brancheva = JSON.parse(ajax.responseText).values;
                    
                    for(var i = 0; i < lista_brancheva.length; i++)
                    {
                        if(lista_brancheva[i].name == naziv)
                        {   
                           fnCallback(null,true);
                           return;
                        }
                    }
                }
                else if (ajax.readyState == 4)
                    fnCallback(ajax.status,false);
            }
            ajax.open("GET",url,true);
            ajax.send();
        }
    }
})();
