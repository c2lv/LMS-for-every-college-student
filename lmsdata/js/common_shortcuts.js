/********** Slide and Push Menus **********/
$(function() {
    /*var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
    	menuRight = document.getElementById( 'cbp-spmenu-s2' ),
    	showLeftPush = document.getElementById( 'showLeft' ),
    	showRightPush = document.getElementById( 'showRightPush' ),
    	body = document.body;*/

    var menuLeft = menuRight = document.getElementById('cbp-spmenu-s2'),
        showRightPush = document.getElementById('showRightPush'),
        body = document.body;

    /*showLeft.onclick = function() { // 오늘의 할일 용
    	classie.toggle( this, 'active' );
    	classie.toggle( menuLeft, 'cbp-spmenu-open' );
    	disableOther( 'showLeft' );
    };*/
    showRightPush.onclick = function() {
        classie.toggle(this, 'active');
        classie.toggle(body, 'cbp-spmenu-push-toleft');
        classie.toggle(menuRight, 'cbp-spmenu-open');
        disableOther('showRightPush');
    };

    function disableOther(button) {
        /*if( button !== 'showLeft' ) {
        	classie.toggle( showLeft, 'disabled' );
        }*/
        if (button !== 'showRightPush') {
            classie.toggle(showRightPush, 'disabled');
        }

    }
});