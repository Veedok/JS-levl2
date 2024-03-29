! function (e) {
    var n = {};

    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    t.m = e, t.c = n, t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: r
        })
    }, t.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function (e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var o in e) t.d(r, o, function (n) {
                return e[n]
            }.bind(null, o));
        return r
    }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, t.p = "/", t(t.s = 3)
}([function (e, n) {
    e.exports = require("fs")
}, function (e, n) {
    e.exports = require("path")
}, function (e, n) {
    e.exports = require("express")
}, function (e, n, t) {
    var r = t(2),
        o = t(0),
        i = t(4),
        u = r(),
        s = t(1);
    u.use(r.json()), u.use("/", r.static(s.resolve(__dirname, "../public"))), u.use("/api/cart", i);
    var a = s.resolve(__dirname, "./db/products.json");
    u.get("/api/products", (function (e, n) {
        o.readFile(a, "utf-8", (function (e, t) {
            e ? n.send(JSON.stringify({
                result: 0,
                text: e
            })) : n.send(t)
        }))
    }));
    var c = process.env.PORT || 5555;
    u.listen(c, (function () {
        console.log("Server started at port ".concat(c))
    }))
}, function (e, n, t) {
    var r = t(2),
        o = t(0),
        i = t(5),
        u = r.Router(),
        s = t(1).resolve(__dirname, "./db/userCart.json");
    u.get("/", (function (e, n) {
        o.readFile(s, "utf-8", (function (e, t) {
            e ? n.sendStatus(404, JSON.stringify({
                result: 0,
                text: e
            })) : n.send(t)
        }))
    })), u.post("/", (function (e, n) {
        i(e, n, "add", s)
    })), u.put("/:id", (function (e, n) {
        i(e, n, "change", s)
    })), u.delete("/:id", (function (e, n) {
        i(e, n, "remove", s)
    })), e.exports = u
}, function (e, n, t) {
    var r = t(0),
        o = t(6),
        i = t(7),
        u = {
            add: o.add,
            change: o.change,
            remove: o.remove
        };
    e.exports = function (e, n, t, o) {
        r.readFile(o, "utf-8", (function (s, a) {
            if (s) n.sendStatus(404, JSON.stringify({
                result: 0,
                text: s
            }));
            else {
                var c = u[t](JSON.parse(a), e),
                    f = c.name,
                    d = c.newCart;
                r.writeFile(o, d, (function (e) {
                    e ? n.send('{"result": 0}') : (console.log(f), i(f, t), n.send('{"result": 1}'))
                }))
            }
        }))
    }
}, function (e, n) {
    e.exports = {
        add: function (e, n) {
            return e.contents.push(n.body), {
                name: n.body.product_name,
                newCart: JSON.stringify(e, null, 4)
            }
        },
        change: function (e, n) {
            var t = e.contents.find((function (e) {
                return e.id_product === +n.params.id
            }));
            return t.quantity += n.body.quantity, {
                name: t.product_name,
                newCart: JSON.stringify(e, null, 4)
            }
        },
        remove: function (e, n) {
            var t = e.contents.find((function (e) {
                return e.id_product === +n.params.id
            }));
            return e.contents.splice(e.contents.indexOf(t), 1), {
                name: t.product_name,
                newCart: JSON.stringify(e, null, 4)
            }
        }
    }
}, function (e, n, t) {
    var r = t(8),
        o = t(0),
        i = t(1).resolve(__dirname, "./db/stats.json");
    e.exports = function (e, n) {
        o.readFile(i, "utf-8", (function (t, u) {
            if (t) console.log(t);
            else {
                var s = JSON.parse(u);
                s.push({
                    time: r().format("DD MMM YYYY, h:mm:ss a"),
                    prod_name: e,
                    action: n
                }), o.writeFile(i, JSON.stringify(s, null, 4), (function (e) {
                    e && console.log(e)
                }))
            }
        }))
    }
}, function (e, n) {
    e.exports = require("moment")
}]);