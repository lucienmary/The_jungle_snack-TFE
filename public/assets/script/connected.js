$( document ).ready(function() {
    // Si le client s'est déjà connecté, alors il est redirigé vers le salon. (grâce au cookie 'clientAuth').
    // (Redirection par le client)
    if (document.cookie.indexOf("clientAuth") >= 0) {
        window.location.replace("/jeu/salon");
    }
});
