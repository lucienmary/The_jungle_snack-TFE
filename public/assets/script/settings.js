$( document ).ready(function() {
    var musicInput = $('#music');
    var effectInput = $('#effect');
    var bgImgInput = $('#bgImg');

    var musicValue;
    var effectValue;
    var bgImgValue;

    // vérif. ds local storage para. dernière visite.
    if ("settingsTJS" in localStorage){
        var oldSettings = JSON.parse(localStorage.getItem("settingsTJS"));
        musicInput.val(oldSettings.music);
        effectInput.val(oldSettings.effect);
        bgImgInput.prop("checked", oldSettings.bgImg);
    }

    // Indicat° en %.
    musicValue = musicInput.val();
    effectValue = effectInput.val();
    bgImgValue = bgImgInput.prop( "checked" );

    console.log(bgImgValue);

    $('#musicValue').text(musicValue);
    $('#effectValue').text(effectValue);


    // Enregistre nvlles données ds localStorage.
    musicInput.on('input', function () {
        musicValue = musicInput.val();
        $('#musicValue').text(musicValue);
        window.localStorage.setItem('settingsTJS', JSON.stringify({music: musicValue, effect: effectValue, bgImg: bgImgValue}));
    });

    // Enregistre nvlles données ds localStorage.
    effectInput.on('input', function () {
        effectValue = effectInput.val();
        $('#effectValue').text(effectValue);
        window.localStorage.setItem('settingsTJS', JSON.stringify({music: musicValue, effect: effectValue, bgImg: bgImgValue}));
    });

    bgImgInput.on('input', function () {
        bgImgValue = bgImgInput.prop( "checked" );
        window.localStorage.setItem('settingsTJS', JSON.stringify({music: musicValue, effect: effectValue, bgImg: bgImgValue}));
    });
}); // Fin jQuery.
