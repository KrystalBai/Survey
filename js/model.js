var table=document.getElementsByTagName('table')[0];
var thead=document.getElementsByTagName('thead')[0];
var scrollEvent=function(){
    var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
    if (table.offsetTop-scrolltop<=0) {
        thead.style.position="fixed";
        thead.style.top=0;
        if (table.offsetTop+parseInt(getComputedStyle(table).height)-scrolltop<=0) {
            thead.style.position="absolute";
        }
    }else {
        thead.style.position="static";
    }
}
if(document.addEventListener){
    document.addEventListener("DOMMouseScroll" ,scrollEvent, false);
}
window.onscroll=document.onscroll=scrollEvent;