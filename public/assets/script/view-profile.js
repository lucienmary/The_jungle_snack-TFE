$( document ).ready(function() {
    if (document.cookie.indexOf("clientAuth") >= 0) {
        $('#linkConnection').addClass('hidden');
        let pseu = document.cookie.split('Pseudo=');
        $('#connected p').text(pseu[1]);
    }else{
        $('#connected').remove();
    }
});
