!(function(s) {
  var e,
    d =
      '<svg><symbol id="icon-suosou" viewBox="0 0 1024 1024"><path d="M888.6 851.9L669.1 632.5c44.9-53.3 72-122.1 72-197 0-169-137.5-306.6-306.5-306.6S128 266.4 128 435.4 265.5 742 434.5 742c75.9 0 145.3-27.8 198.9-73.6l219.3 219.3c4.9 4.9 11.4 7.4 17.9 7.4 6.5 0 13-2.5 17.9-7.4 10-9.9 10-25.9 0.1-35.8z m-710-416.5c0-141.1 114.8-255.9 255.9-255.9s255.9 114.8 255.9 255.9c0 141.1-114.8 255.9-255.9 255.9S178.6 576.6 178.6 435.4z"  ></path></symbol></svg>',
    t = (e = document.getElementsByTagName("script"))[
      e.length - 1
    ].getAttribute("data-injectcss");
  if (t && !s.__iconfont__svg__cssinject__) {
    s.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState))
        setTimeout(e, 0);
      else {
        var t = function() {
          document.removeEventListener("DOMContentLoaded", t, !1), e();
        };
        document.addEventListener("DOMContentLoaded", t, !1);
      }
    else
      document.attachEvent &&
        ((o = e),
        (i = s.document),
        (c = !1),
        (d = function() {
          try {
            i.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(d, 50);
          }
          n();
        })(),
        (i.onreadystatechange = function() {
          "complete" == i.readyState && ((i.onreadystatechange = null), n());
        }));
    function n() {
      c || ((c = !0), o());
    }
    var o, i, c, d;
  })(function() {
    var e, t, n, o, i, c;
    ((e = document.createElement("div")).innerHTML = d),
      (d = null),
      (t = e.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (n = t),
        (o = document.body).firstChild
          ? ((i = n), (c = o.firstChild).parentNode.insertBefore(i, c))
          : o.appendChild(n));
  });
})(window);
