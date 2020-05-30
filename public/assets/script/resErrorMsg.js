$( document ).ready(function() {

    if (!!$.cookie('resErrorMsg')) {

        const ERROR_MSG = $.cookie('resErrorMsg');
        var msg;

        $.removeCookie('resErrorMsg', { path: '/' });

        switch (ERROR_MSG) {
            case 'username':
                msg = 'Ton pseudo doit avoir entre 4 et 13 caractères.';
            break;

            case 'emptyInput':
                msg = 'Tu as oublié de remplir un champs.';
            break;

            case 'email':
                msg = 'Ton email n\'est pas valide.';
            break;
            case 'psw':
                msg = 'Ton mot de passe doit faire de 4 à 8 caractères (minimum un chiffre).';
            break;
            case 'invalidPsw':
                msg = 'Mot de passe incorrect.';
            break;
            case 'verifyError':
                msg = 'L\'adresse mail n\'a pu être vérifiée.';
            break;
            case 'updateError':
                msg = 'Le compte n\'a pas pu être mis à jour.';
            break;
            case 'userNotFound':
                msg = 'Impossible de trouver l\'utilisateur.';
            break;
            case 'alreadyExist':
                msg = 'Cette adresse mail est déjà utilisée.';
            break;
            case 'internalError':
                msg = 'Le serveur rencontre un problème, le compte ne peut-être créé.';
            break;
            case 'notExist':
                msg = 'Cet utilisateur n\'existe pas. <a href="/register">S\'inscrire</a>';
            break;
            case 'connectionError':
                msg = 'Le serveur ne parvient pas à connecter l\'utilisateur.';
            break;
            case 'tokenError':
                msg = 'Connexion invalide, reconnecte-toi stp.';
            break;
            default:
                msg = 'Le serveur rencontre une erreur inconnue, l\'opération n\'a pas fonctionnée.';
        }


        if ($('.area')) {
            alertArea = $('.area:first');
        }else{
            alertArea = $('body');
        }
        alertArea.prepend(`
            <div class="alert-msg">
                <p>`+ msg +`</p>
                <span class="cross-msg"></span>
            </div>
        `);
    }
    $('.cross-msg').click(() => {
        $('.alert-msg').remove();
    })

}); // Fin jQuery.
