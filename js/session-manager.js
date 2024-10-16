



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
    // Obtener el nombre de usuario de la cookie
    let userName = getCookie('sessionUser');
    
    // Si hay un usuario, mostrar su nombre
    if (userName) {
        document.getElementById('user-name').innerHTML = userName;
    } else {
        // Si no hay cookie de sesión, redirigir a la página de login
        if (window.location.pathname !== "/login.html") {
            window.location.replace("login.html");
        }
    }

    // Botón de cerrar sesión
    let logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

            // Borrar la cookie de sesión
            document.cookie = "sessionUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            // Redirigir al usuario a la página de login
            window.location.replace("login.html");
        });
    }

    // Evitar que el usuario navegue hacia atrás después de cerrar sesión
    function preventBackNavigation() {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
    }

    // Llamar a la función para evitar el retroceso
    preventBackNavigation();
});


