$( document ).ready(function() {

    modalDelete = $('.modalDelete');
    modalPsw = $('.modalPsw');

    modalDelete.click(() => {
        $('body').prepend(`
            <div class="blackscreen">
                <div class="modal">
                    <h2>Veux-tu supprimer ce compte?</h2>
                    <p>Attention, cette action sera irréversible. Ton score et tes bonus seront perdu!</p>
                    <form action="../api/users/delete/?_method=PUT" method="post">
                        <input class="submit suppr" type="submit" value="Supprimer mon compte">
                    </form>
                    <a href="#" class="cancelModal">Annuler</a>
                </div>
            </div>
        `);
    })

    modalPsw.click(() => {
        $('body').prepend(`
            <div class="blackscreen">
                <div class="modal">
                <h2>Modifier le mot de passe</h2>
                <p>Entre ton nouveau mot de passe.</p>

                <form action="../api/users/new-psw/?_method=PUT" method="post">
                    <label for="password">Mot de passe:</label><br>
                    <input type="password" name="password" value="" placeholder="...">

                    <input class="submit submit--classic" type="submit" value="Enregistrer les modifications">
                </form>
                <button class="submit submit--suppr cancelModal">Annuler</button>
                </div>
            </div>
        `);
    })

    
    // Remove modal.
    $(document).on('click', '.cancelModal', () => {
        $('.blackscreen').remove();
    })

}); // fin JQUERY.
