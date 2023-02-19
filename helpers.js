!function(){"use strict";var s={},e=0,f=function(t,e,n){var o,r=[];if("string"==typeof t&&"body"===t.toLocaleLowerCase()&&(t=document.body),"string"==typeof t)if(0===t.indexOf("<")&&1<t.indexOf(">")&&2<t.length)(e=document.createElement("div")).innerHTML=t,r.push(e.firstChild);else if(e?"object"==typeof e&&e.version?e=e[0]:"string"==typeof e&&(e=document.querySelector(e)):e=document,t.match(/^#[^s]+$/))r.push(e.querySelector(t));else if(n)try{r.push(e.querySelector(t))}catch(t){}else try{r=Array.prototype.slice.call(e.querySelectorAll(t))}catch(t){}else if("object"==typeof t&&(t instanceof Document||t instanceof Window||t instanceof Element||t instanceof Text))r.push(t);else if(t instanceof NodeList)r=Array.prototype.slice.call(t);else if(Array.isArray(t))r=r.concat(t);else if("object"==typeof t&&t.version)return t;for(o in r=r.filter(function(t){return null!=t}),f.fn)r[o]=f.fn[o];return r};f.fn={version:"1.0.0"},Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),n=e.length;0<=--n&&e.item(n)!==this;);return-1<n}),window.$=window.jQuery=f}();
var stats = {}
setInterval(function() {
    var cards;
    if (['/presale', '/giveaway'].indexOf(location.pathname) > -1 && (cards = $('.TimerCountdown')).length) {
        cards.forEach(function(el, index) {
            var remainingSeconds = el.dataset['remaining'],
                remainingDays, remainingHours, remainingMinutes, showDays = el.classList.contains('TimerShowsDays');

            if (undefined !== remainingSeconds && remainingSeconds > 0) {

                if (undefined === stats[index] || remainingSeconds !== stats[index].initial_value) {
                    stats[index] = {initial_value: remainingSeconds, iterations: 0};
                }

                remainingSeconds = stats[index].initial_value - stats[index].iterations;
                if (showDays) {

                    remainingDays = Math.floor(remainingSeconds / 86400);
                    remainingHours = Math.floor((remainingSeconds - (remainingDays * 86400)) / 3600);
                    remainingMinutes = Math.floor((remainingSeconds - (remainingDays * 86400) - (remainingHours * 3600)) / 60);
                    remainingSeconds = remainingSeconds - (remainingDays * 86400) - (remainingHours * 3600) - (remainingMinutes * 60);
                } else {
                    remainingHours = Math.floor(remainingSeconds / 3600);
                    remainingMinutes = Math.floor((remainingSeconds - (remainingHours * 3600)) / 60);
                    remainingSeconds = remainingSeconds - (remainingHours * 3600) - (remainingMinutes * 60);
                }

                if (remainingSeconds >= 0) {
                    if (showDays) {
                        $('strong', el).map((e, i) => { e.innerHTML = (i === 0 ? ((remainingDays < 10 ? '0' : '') + remainingDays) : (i === 1 ? ((remainingHours < 10 ? '0' : '') + remainingHours) : (i === 2 ? ((remainingMinutes < 10 ? '0' : '') + remainingMinutes): ((remainingSeconds < 10 ? '0' : '') + remainingSeconds)))); })
                    } else {
                        el.innerHTML =  (showDays ? ((remainingDays < 10 ? '0' : '') + remainingDays + ':') : '') +
                                        (remainingHours < 10 ? '0' : '') + remainingHours + ':' +
                                        (remainingMinutes < 10 ? '0' : '') + remainingMinutes + ':' +
                                        (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
                    }
                }

            }
            if (undefined !== stats[index]) {
                stats[index].iterations++;
            }
        });
    }
}, 1000);
