$= function (e) {
    return document.querySelector(e);
};
$$= function (e) {
    return document.querySelectorAll(e);
};

function getScroll(method,element){
    method = 'scroll' + method;
    return (element == window || element == document) ? (
        self[(method == 'scrollTop') ? 'pageYOffset' : 'pageXOffset'] ||
        (document.documentElement[method]) ||document.body[method]) : element[method];
}

function getOffset(element){
    var body = document.body,
        win = document.defaultView,
        docElem = document.documentElement,
        box = document.createElement('div');
    box.style.paddingLeft = box.style.width = "1px";
    body.appendChild(box);
    var isBoxModel = box.offsetWidth == 2;
    body.removeChild(box);
    box = element.getBoundingClientRect();
    var clientTop  = docElem.clientTop  || body.clientTop  || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
        scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
    return {
        top : box.top  + scrollTop  - clientTop,
        left: box.left + scrollLeft - clientLeft};
}

var addEvent=(function(window,undefined){
    var _eventCompat = function(event) {
        var type = event.type;
        if (type == 'DOMMouseScroll' || type == 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function() {
                event.returnValue = false;
            };
        }
        /*
         ......其他一些兼容性处理 */
        return event;
    };
    if (window.addEventListener) {
        return function(el, type, fn, capture) {
            if (type === "mousewheel" && document.mozHidden !== undefined) {
                type = "DOMMouseScroll";
            }
            el.addEventListener(type, function(event) {
                fn.call(this, _eventCompat(event));
            }, capture || false);
        }
    } else if (window.attachEvent) {
        return function(el, type, fn, capture) {
            el.attachEvent("on" + type, function(event) {
                event = event || window.event;
                fn.call(el, _eventCompat(event));
            });
        }
    }
    return function() {};
})(window);

function getWeekNumber(d) {
    d = new Date(+d);
    d.setHours(0,0,0);
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    var yearStart = new Date(d.getFullYear(),0,1),
        weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}
