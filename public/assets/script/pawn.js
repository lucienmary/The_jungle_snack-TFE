
// Choix du pion.

jQuery(document).ready(function () {
	window.localStorage.setItem('pawn', 'flamingo'); // Pion par defaut.

	const SLIDE_COUNT = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = SLIDE_COUNT * slideWidth;
	var selectedPawn = 1;
	var timedFun;

	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
		selected('left');
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
		selected('right');
    };

	// N° du pion select.
	function selected(data) {
		if (data === 'right') {
			if (selectedPawn === SLIDE_COUNT) selectedPawn = 1;
			else selectedPawn++;
		}else {
			if (selectedPawn === 1) selectedPawn = SLIDE_COUNT;
			else selectedPawn--;
		}

		timedFun = setTimeout(function(){
			var actual = $('#slider ul li:nth-child(2)').attr('id');
			window.localStorage.setItem('pawn', actual);
		}, 500);
	}

    $('a.control_prev').click(function (e) {
		e.preventDefault();
		clearTimeout(timedFun);
        moveLeft();
    });

    $('a.control_next').click(function (e) {
		e.preventDefault();
		clearTimeout(timedFun);
        moveRight();
    });

});
