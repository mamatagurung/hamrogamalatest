(function (a) {
    function h() {
        var i = jQuery("body").innerWidth();
        if (i > 991) {
            a(".teamo-menu-wapper").each(function () {
                if (a(this).length > 0) {
                    var j = a(this);
                    if (j != "undefined") {
                        var l = 0, k = j.offset();
                        l = j.innerWidth();
                        setTimeout(function () {
                            a(".main-menu .item-megamenu").each(function (p, o) {
                                a(o).children(".megamenu").css({"max-width": l + "px"});
                                var v = a(o).children(".megamenu").outerWidth(), r = a(o).outerWidth(), m = k.left,
                                    n = (m + l), q = a(o).offset().left, t = (v / 2 > (q - m)), u = ((v / 2 + q) > n);
                                a(o).children(".megamenu").css({left: "-" + (v / 2 - r / 2) + "px"});
                                if (t) {
                                    var s = (q - m);
                                    a(o).children(".megamenu").css({left: -s + "px"})
                                }
                                if (u && !t) {
                                    var s = (q - m);
                                    s = s - (l - v);
                                    a(o).children(".megamenu").css({left: -s + "px"})
                                }
                            })
                        }, 100)
                    }
                }
            })
        }
    }

    function b() {
        var i = parseInt(a(".container").innerWidth()) - 30;
        a(".teamo-menu-wapper.vertical.support-mega-menu").each(function () {
            var j = parseInt(a(this).actual("width")), k = (i - j);
            if (k > 0) {
                a(this).find(".megamenu").each(function () {
                    var l = a(this).attr("style");
                    l = (l == undefined) ? "" : l;
                    l = l + " max-width:" + k + "px;";
                    a(this).attr("style", l)
                })
            }
        })
    }


    function f() {
        if (!a(".teamo-menu-clone-wrap").length && a(".teamo-clone-mobile-menu").length > 0) {
            a("body").prepend('<div class="teamo-menu-clone-wrap"><div class="teamo-menu-panels-actions-wrap"><a class="teamo-menu-close-btn teamo-menu-close-panels" href="#">x</a></div><div class="teamo-menu-panels"></div></div>')
        }
        var j = 0, k = Array();
        if (!a(".teamo-menu-clone-wrap .teamo-menu-panels #teamo-menu-panel-main").length) {
            a(".teamo-menu-clone-wrap .teamo-menu-panels").append('<div id="teamo-menu-panel-main" class="teamo-menu-panel teamo-menu-panel-main"><ul class="depth-01"></ul></div>')
        }
        a(".teamo-clone-mobile-menu").each(function () {
            var i = a(this), p = i, m = p.attr("id"), l = "teamo-menu-clone-" + m;
            if (!a("#" + l).length) {
                var n = i.clone(true);
                n.find(".menu-item").addClass("clone-menu-item");
                n.find("[id]").each(function () {
                    n.find('.vc_tta-panel-heading a[href="#' + a(this).attr("id") + '"]').attr("href", "#" + e(a(this).attr("id"), "teamo-menu-clone-"));
                    n.find('.teamo-menu-tabs .tabs-link a[href="#' + a(this).attr("id") + '"]').attr("href", "#" + e(a(this).attr("id"), "teamo-menu-clone-"));
                    a(this).attr("id", e(a(this).attr("id"), "teamo-menu-clone-"))
                });
                n.find(".teamo-menu-menu").addClass("teamo-menu-menu-clone");
                var o = a(".teamo-menu-clone-wrap .teamo-menu-panels #teamo-menu-panel-main ul");
                o.append(n.html());
                d(o, j)
            }
        })
    }

    function d(j, k) {
        if (j.find(".menu-item-has-children").length) {
            j.find(".menu-item-has-children").each(function () {
                var m = a(this);
                d(m, k);
                var i = "teamo-menu-panel-" + k;
                while (a("#" + i).length) {
                    k++;
                    i = "teamo-menu-panel-" + k
                }
                m.prepend('<a class="teamo-menu-next-panel" href="#' + i + '" data-target="#' + i + '"></a>');
                var l = a("<div>").append(m.find("> .submenu").clone()).html();
                m.find("> .submenu").remove();
                a(".teamo-menu-clone-wrap .teamo-menu-panels").append('<div id="' + i + '" class="teamo-menu-panel teamo-menu-sub-panel teamo-menu-hidden">' + l + "</div>")
            })
        }
    }

    function e(j, i) {
        return i + j
    }

    function g(i, k) {
        var j = new RegExp(i + "=([^&]*)", "i").exec(k);
        return j && j[1] || ""
    }

    a(document).ready(function () {
        h();
        b();
        a(document).on("click", ".menu-toggle", function () {
            a(".teamo-menu-clone-wrap").addClass("open");
            return false
        });
        a(document).on("click", ".teamo-menu-clone-wrap .teamo-menu-close-panels", function () {
            a(".teamo-menu-clone-wrap").removeClass("open");
            return false
        });
        a(document).on("click", function (i) {
            if (i.offsetX > a(".teamo-menu-clone-wrap").width()) {
                a(".teamo-menu-clone-wrap").removeClass("open")
            }
        });
        a(document).on("click", ".teamo-menu-next-panel", function (j) {
            var i = a(this), n = i.closest(".menu-item"), o = i.closest(".teamo-menu-panel"), m = i.attr("href");
            if (a(m).length) {
                o.addClass("teamo-menu-sub-opened");
                a(m).addClass("teamo-menu-panel-opened").removeClass("teamo-menu-hidden").attr("data-parent-panel", o.attr("id"));
                var l = n.find(".teamo-menu-item-title").attr("title"), k = "";
                if (a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").length > 0) {
                    k = a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").html()
                }
                if (typeof l != "undefined" && typeof l != false) {
                    if (!a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").length) {
                        a(".teamo-menu-panels-actions-wrap").prepend('<span class="teamo-menu-current-panel-title"></span>')
                    }
                    a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").html(l)
                } else {
                    a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").remove()
                }
                a(".teamo-menu-panels-actions-wrap .teamo-menu-prev-panel").remove();
                a(".teamo-menu-panels-actions-wrap").prepend('<a data-prenttitle="' + k + '" class="teamo-menu-prev-panel" href="#' + o.attr("id") + '" data-cur-panel="' + m + '" data-target="#' + o.attr("id") + '"></a>')
            }
            j.preventDefault()
        });
        a(document).on("click", ".teamo-menu-prev-panel", function (k) {
            var i = a(this), j = i.attr("data-cur-panel"), n = i.attr("href");
            a(j).removeClass("teamo-menu-panel-opened").addClass("teamo-menu-hidden");
            a(n).addClass("teamo-menu-panel-opened").removeClass("teamo-menu-sub-opened");
            var m = a(n).attr("data-parent-panel");
            if (typeof m == "undefined" || typeof m == false) {
                a(".teamo-menu-panels-actions-wrap .teamo-menu-prev-panel").remove();
                a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").remove()
            } else {
                a(".teamo-menu-panels-actions-wrap .teamo-menu-prev-panel").attr("href", "#" + m).attr("data-cur-panel", n).attr("data-target", "#" + m);
                var l = a("#" + m).find('.teamo-menu-next-panel[data-target="' + n + '"]').closest(".menu-item").find(".teamo-menu-item-title").attr("data-title");
                l = a(this).data("prenttitle");
                if (typeof l != "undefined" && typeof l != false) {
                    if (!a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").length) {
                        a(".teamo-menu-panels-actions-wrap").prepend('<span class="teamo-menu-current-panel-title"></span>')
                    }
                    a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").html(l)
                } else {
                    a(".teamo-menu-panels-actions-wrap .teamo-menu-current-panel-title").remove()
                }
            }
            k.preventDefault()
        })
    });
    a(window).on("resize", function () {
        h();
        b()
    });
    a(window).load(function () {
        f()
    })
})(jQuery);