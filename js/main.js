function initNavToggler() {
    var toggler = document.querySelector('.navbar-burger');
    var menu = document.querySelector('.navbar-menu');
    var navbarClose = document.querySelector('.navbar-close')


    toggler.addEventListener('click', function(evt) {
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden")
            menu.classList.add("block")
        } else {
            menu.classList.add("hidden")
            menu.classList.remove("block")
        }
        evt.stopImmediatePropagation()
    });
}


/*------------Init scripts on pageload--------------*/
/*--------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    initNavToggler();
})
