$( document ).ready(function() {

    modalDelete = $('.modalDelete');

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


    // Remove modal.
    $(document).on('click', '.cancelModal', () => {
        $('.blackscreen').remove();
    })

}); // fin JQUERY.
