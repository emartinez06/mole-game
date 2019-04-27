var gameState = "";

$(document).ready(function () {

    gameState = "running";

    $("ul#moles").randomize("li");

    $("ul#moles li a").on("click", function (e) {
        e.preventDefault();

        var mole = $(this);

        if (mole.hasClass("hitted")) return;

        var moleHit = $("ul#moles li a.hitted").eq(0);

        mole.addClass("hitted");

        if (moleHit.length <= 0) return;

        setTimeout(function () {
            evaluateMole(mole, moleHit);
        }, 500);
    });

});

function evaluateMole(mole, moleHit) {

    if (mole.data("group") === moleHit.data("group")) {
        if (mole.data("group") == "bomb") {
            $("ul#moles li a").addClass("disabled");
            gameState = "over";
            Swal.fire({
                title: 'Sorry for your loss',
                text: 'Wanna play again?',
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Let\'s Go'
            }).then((result) => {
                if (result.value) {
                    document.location.reload();
                }
            });
        } else {
            mole.addClass("disabled");
            moleHit.addClass("disabled");
            $("ul#moles li a.hitted").removeClass("hitted");
        }
    } else {
        $("ul#moles li a.hitted").removeClass("hitted");
    }

    if (gameState != "over") {
        if ($("ul#moles li a.disabled").length == $("ul#moles li a:not([data-group='bomb'])").length) {
            gameState = "over";
            Swal.fire({
                title: 'Yay, you rock!!!',
                text: 'Wanna play again?',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Let\'s Go'
            }).then((result) => {
                if (result.value) {
                    document.location.reload();
                }
            });
        }
    }
}

$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};
