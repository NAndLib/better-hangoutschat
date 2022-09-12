function copyURI(evt) {
    evt.preventDefault();
    navigator.clipboard.writeText(evt.target.getAttribute('href')).then(() => {
      alert("Link copied to clipboard");
    }, () => {
      alert("Link failed to copy to clipboard");
    });
}

function inject(){

    var chanIDreg = /.*space\/([_a-zA-Z0-9-]+).*/g;

    var linkFunction = function(elt) {
        if (elt.hasAttribute("linked")) {
            return;
        }
        var chanIDdiv = document.getElementsByClassName("SSPGKf");
        if (chanIDdiv.length == 0) {
            console.log("failed to retrieve channel id");
            return;
        }
        var chanIDdata = chanIDdiv[0].getAttribute("data-p");
        var match = chanIDreg.exec(chanIDdata);
        chanIDreg.lastIndex = 0;
        if (match != null) {
            var tmpdiv = document.createElement("div");
            var link = "https://mail.google.com/mail/u/0/#chat/space/"+match[1]+"/"+elt.getAttribute("data-topic-id");
            link = link.replace("search/", "");
            // Remove the /u/[0-9] from the link, which is bad when sharing links because it
            // could try to open the link with their non-default Google account.
            link = link.replace(/\/u\/\d/, "");
            tmpdiv.innerHTML = '<p class="threadlink"><a href="'+link+'">Link: </a> '+link+' </p>';
            var copyLink = document.createElement("a");
            copyLink.className = "linkcpy";
            copyLink.setAttribute("link", link);
            copyLink.innerText = "(COPY TO CLIPBOARD)";
            copyLink.setAttribute("linked", "");
            copyLink.addEventListener("click", function() {
                const valelt = document.createElement('textarea');
                valelt.value = link;
                document.body.appendChild(valelt);
                valelt.select();
                document.execCommand('copy');
                document.body.removeChild(valelt);
                copyLink.innerText = "(COPIED TO CLIPBOARD)";
                copyLink.style.color = 'green';
                setTimeout(function(){
                    copyLink.innerText = "(COPY TO CLIPBOARD)";
                    copyLink.style.color = "var(--primary-app-color)";
                    }, 3000);
            });
            tmpdiv.childNodes[0].appendChild(copyLink);
            elt.insertBefore(tmpdiv, elt.childNodes[0]);
        }
    };

    // insertion-query v1.0.3 (2016-01-20)
    // license:MIT
    // Zbyszek Tenerowicz <naugtur@gmail.com> (http://naugtur.pl/)
    var insertionQ=function(){"use strict";function a(a,b){var d,e="insQ_"+g++,f=function(a){(a.animationName===e||a[i]===e)&&(c(a.target)||b(a.target))};d=document.createElement("style"),d.innerHTML="@"+j+"keyframes "+e+" {  from {  outline: 1px solid transparent  } to {  outline: 0px solid transparent }  }\n"+a+" { animation-duration: 0.001s; animation-name: "+e+"; "+j+"animation-duration: 0.001s; "+j+"animation-name: "+e+";  } ",document.head.appendChild(d);var h=setTimeout(function(){document.addEventListener("animationstart",f,!1),document.addEventListener("MSAnimationStart",f,!1),document.addEventListener("webkitAnimationStart",f,!1)},n.timeout);return{destroy:function(){clearTimeout(h),d&&(document.head.removeChild(d),d=null),document.removeEventListener("animationstart",f),document.removeEventListener("MSAnimationStart",f),document.removeEventListener("webkitAnimationStart",f)}}}function b(a){a.QinsQ=!0}function c(a){return n.strictlyNew&&a.QinsQ===!0}function d(a){return c(a.parentNode)?a:d(a.parentNode)}function e(a){for(b(a),a=a.firstChild;a;a=a.nextSibling)void 0!==a&&1===a.nodeType&&e(a)}function f(f,g){var h=[],i=function(){var a;return function(){clearTimeout(a),a=setTimeout(function(){h.forEach(e),g(h),h=[]},10)}}();return a(f,function(a){if(!c(a)){b(a);var e=d(a);h.indexOf(e)<0&&h.push(e),i()}})}var g=100,h=!1,i="animationName",j="",k="Webkit Moz O ms Khtml".split(" "),l="",m=document.createElement("div"),n={strictlyNew:!0,timeout:20};if(m.style.animationName&&(h=!0),h===!1)for(var o=0;o<k.length;o++)if(void 0!==m.style[k[o]+"AnimationName"]){l=k[o],i=l+"AnimationName",j="-"+l.toLowerCase()+"-",h=!0;break}var p=function(b){return h&&b.match(/[^{}]/)?(n.strictlyNew&&e(document.body),{every:function(c){return a(b,c)},summary:function(a){return f(b,a)}}):!1};return p.config=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b])},p}();"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=insertionQ);

    var topics = document.getElementsByClassName('cZICLc');
    var i;
    for (i = 0; i < topics.length; i++) {
        linkFunction(topics[i]);
    }

    var threadlinks = document.getElementsByClassName("threadlink");
    var i;
    for(i = 0; i < threadlinks.length; i++) {
      var p = threadlinks[i];
      var a = p.getElementsByTagName("a")[0];
      a.addEventListener("click", copyURI);
    }

// INSERTCSS
}

if ( window !== undefined ) {
  setInterval(() => {
    setTimeout(inject, 3500);
  }, 5000)
}
