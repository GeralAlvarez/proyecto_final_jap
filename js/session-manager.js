



// Obtener cookie dado el nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


// Redireccionar al Login en caso de que no esté autenticado
function redirectToLogin(sessionUser) {
    if (!sessionUser) {
        window.location.replace("login.html");
    }
}

// Redireccionar al Home en caso de que esté autenticado
function redirectToHome(sessionUser) {
    if (sessionUser) {
        // Redirigir al usuario automáticamente si ya tiene una sesión activa
        window.location.replace("index.html");
    }
}

// Chequear estado de la sesión y redireccionar a la página correspondiente
function checkSession() {
    const URL = window.location.href;
    const sessionUser = getCookie("sessionUser");

    if (URL.includes('login.html')) {
        redirectToHome(sessionUser);
    } else {
        redirectToLogin(sessionUser);
    }
}

checkSession();

function buildUserData(){
    if (userData == null){
      userData= {firstname:'',secondname:'',lastname:'',secondlastname:'',userphone:''};
    }
    return (userData);
  
  }


//Cerrar sesión 
document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener la cookie de sesión
    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for(let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if(name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    // Verificar si el usuario está logeado (cookie de sesión)
    let userName = getCookie('sessionUser');
    
    if (userName) {
        document.getElementById('user-name').innerHTML = userName;
    } else {
        // Si no hay cookie de sesión, redirigir al login desde cualquier página
        if (window.location.pathname !== "/login.html") {
            window.location.replace("login.html");
        }
    }

    // Botón de cerrar sesión
    let logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir comportamiento por defecto
            
            // Borrar la cookie de sesión
            document.cookie = "sessionUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            // Reemplazar la entrada actual en el historial con login.html (esto evitará que puedan volver atrás)
            window.history.replaceState(null, null, "login.html");
            
            // Redirigir al login
            window.location.replace("login.html");
        });
    }

    // Manejo del evento popstate para bloquear volver atrás
    window.addEventListener('popstate', function() {
        // Si la sesión no existe (cookie eliminada), redirigir al login
        if (!getCookie('sessionUser')) {
            window.location.replace("login.html");
        }
    });
});
