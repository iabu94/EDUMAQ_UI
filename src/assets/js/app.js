$(document).ready(function(){
	//$('#side-menu').metisMenu();
function s(e) {
        1 == $("#light-mode-switch").prop("checked") && "light-mode-switch" === e
            ? ($("#dark-mode-switch").prop("checked", !1),
              $("#rtl-mode-switch").prop("checked", !1),
              $("#bootstrap-style").attr("href", "assets/css/bootstrap.min.css"),
              $("#app-style").attr("href", "assets/css/app.min.css"),
              sessionStorage.setItem("is_visited", "light-mode-switch"))
            : 1 == t("#dark-mode-switch").prop("checked") && "dark-mode-switch" === e
            ? ($("#light-mode-switch").prop("checked", !1),
              $("#rtl-mode-switch").prop("checked", !1),
              $("#bootstrap-style").attr("href", "assets/css/bootstrap-dark.min.css"),
              $("#app-style").attr("href", "assets/css/app-dark.min.css"),
              sessionStorage.setItem("is_visited", "dark-mode-switch"))
            : 1 == t("#rtl-mode-switch").prop("checked") &&
              "rtl-mode-switch" === e &&
              ($("#light-mode-switch").prop("checked", !1),
              $("#dark-mode-switch").prop("checked", !1),
              $("#bootstrap-style").attr("href", "assets/css/bootstrap.min.css"),
              $("#app-style").attr("href", "assets/css/app-rtl.min.css"),
              sessionStorage.setItem("is_visited", "rtl-mode-switch"));
    }
    function e() {
        document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || (console.log("pressed") && $("body").removeClass("fullscreen-enable"));
    }
        $("#side-menu").metisMenu();
        $("#vertical-menu-btn").on("click", function (e) {
            e.preventDefault(); $("body").toggleClass("sidebar-enable"), 992 <= $(window).width() ? $("body").toggleClass("vertical-collpsed") : $("body").removeClass("vertical-collpsed");
        });
        $("#sidebar-menu a").each(function () {
            var e = window.location.href.split(/[?#]/)[0];
            this.href == e &&
                ($(this).addClass("active"),
                $(this).parent().addClass("mm-active"),
                $(this).parent().parent().addClass("mm-show"),
                $(this).parent().parent().prev().addClass("mm-active"),
                $(this).parent().parent().parent().addClass("mm-active"),
                $(this).parent().parent().parent().parent().addClass("mm-show"),
                $(this).parent().parent().parent().parent().parent().addClass("mm-active"));
        });
        $(".navbar-nav a").each(function () {
            var e = window.location.href.split(/[?#]/)[0];
            this.href == e && 
                ($(this).addClass("active"),
                $(this).parent().addClass("active"),
                $(this).parent().parent().addClass("active"),
                $(this).parent().parent().parent().addClass("active"),
                $(this).parent().parent().parent().parent().addClass("active"));
        });
        $('[data-toggle="fullscreen"]').on("click", function (e) {
            e.preventDefault();
                $("body").toggleClass("fullscreen-enable"),
                document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
                    ? document.cancelFullScreen
                        ? document.cancelFullScreen()
                        : document.mozCancelFullScreen
                        ? document.mozCancelFullScreen()
                        : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
                    : document.documentElement.requestFullscreen
                    ? document.documentElement.requestFullscreen()
                    : document.documentElement.mozRequestFullScreen
                    ? document.documentElement.mozRequestFullScreen()
                    : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUt);
        });
        document.addEventListener("fullscreenchange", e);
        document.addEventListener("webkitfullscreenchange", e);
        document.addEventListener("mozfullscreenchange", e);
        $(".right-bar-toggle").on("click", function (e) {
            $("body").toggleClass("right-bar-enabled");
        });
        $(document).on("click", "body", function (e) {
            0 < $(e.target).closest(".right-bar-toggle, .right-bar").length || $("body").removeClass("right-bar-enabled");
        });
        $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
            return $(this).next().hasClass("show") || $(this).parents(".dropdown-menu").first().find(".show").removeClass("show"); $(this).next(".dropdown-menu").toggleClass("show"); 1;
        });
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        $(function () {
            $('[data-toggle="popover"]').popover();
        });
        (function () {
            /*if (window.sessionStorage) {
                var e = sessionStorage.getItem("is_visited");
                e ? ($(".right-bar input:checkbox").prop("checked", !1), $("#" + e).prop("checked", !0), s(e)) : sessionStorage.setItem("is_visited", "light-mode-switch");
            }
            $("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch").on("change", function (e) {
                s(e.target.id);
            });*/
        })();
        $(window).on("load", function () {
            $("#status").fadeOut(); $("#preloader").delay(350).fadeOut("slow");
        });
        Waves.init();
});