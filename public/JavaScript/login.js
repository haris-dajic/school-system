/**Onemogucio sam i ponovni povratak na login formu nakon login-a 
 * 
 */
function login()
{ 
    var JSONobjekat = JSON.stringify({
            email: document.getElementById('login_mail').value, 
            password:document.getElementById('login_pass').value
    });
    var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200){
                if(ajax.responseText == 'Student')
                {
                    document.getElementById("statistikaMeni").style.display = "inline-block";
                    document.getElementById("komentariMeni").style.display = "inline-block";
                   // document.getElementById("logMeni").style.display = "none";
                }
                else if(ajax.responseText == 'Profesor')
                {
                    document.getElementById("spisakMeni").style.display = "inline-block";
                    document.getElementById("nastavnikMeni").style.display = "inline-block";
                    document.getElementById("bitMeni").style.display = "inline-block";
                    //document.getElementById("logMeni").style.display = "none";
                }
                else if(ajax.responseText == 'Admin')
                {
                    document.getElementById("listaMeni").style.display = "inline-block";
                   // document.getElementById("logMeni").style.display = "none";
                }
            }
            else if(ajax.readyState == 4){
                console.log("Logovanje admina");
                console.log(ajax.status, ajax.responseText);
            }
        };
        
        ajax.open("POST",'http://localhost:3000/logovanje', true); 
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSONobjekat);
    
}
