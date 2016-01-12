(function (env) {
    var DDG;

    // in case we're running in an environment
    // which doesn't have the DDG namespace added
    if (!env.DDG) {
        env.DDG = {};
    }

    DDG = env.DDG;

    /**
     * Abbreviates numbers so we never have 
     * more than 4 digits
     *
     * 10000 => 10K
     * 1433223 => 1.4M
     * 400 => 400
     * 1,542 => 1.5K
     *
     * @param {number} num
     * @return {string}
     */
    DDG.abbrevNumber = function(num) {
        if (!$.isNumeric(num)) { return num; }
        if (num < 1000) { return num; }
        if (num < 10000) { return (Math.round(num / 100) / 10)+ 'K'; }
        if (num < 1000000) { return Math.round(num / 1000) + 'K'; }
        if (num < 10000000) { return (Math.round(num / 100000) / 10) + 'M'; }
        if (num < 1000000000) { return Math.round(num / 1000000) + 'M'; }
        if (num < 10000000000) { return Math.round(num / 100000000) + 'B'; }
        return Math.round(num / 1000000000) + 'B';
    };

    /**
     * Capitalizes the first letter of the given string
     * 
     * @param  {string} str String to capitalize
     * 
     * @return {string}
     */
    DDG.capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    /**
     * Capitalizes the first letter of each word in the given string
     * 
     * @param  {string} str String to capitalize
     * 
     * @return {string}
     */
    DDG.capitalizeWords = function(str) {
        str = str.replace(/\w\S+/g, DDG.capitalize);
        str = str.replace(/\b(?:Of|And|The|At|By|In|To|A|For|An|On|Or)\b/g, function(str) {
            return str.toLowerCase();
        });
        return str;
    };

    /**
     * Adds commas to numbers
     *
     * 100000 => 100,000
     * @param {number} num
     * @return {string}
     */
    DDG.commifyNumber = function(num) {
        if (!$.isNumeric(num)) { return num; }
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    /**
     * Takes a jQuery event and returns the x/y coordinates
     * for a touch event.
     *
     * @param {jQuery.Event} e
     * @return {object}
     */
    DDG.eventToCoordinates = function(e) {
        var oe = e.originalEvent,
            input = (oe.touches && oe.touches.length) ? oe.touches[0] : e;

        return {
            x: input.clientX,
            y: input.clientY
        };
    };

    /**
     * Find and execute a template
     * 
     * Searches through DDG.templates and DDH
     * 
     * @param  {string|function} template the template to execute
     * @param  {object}          obj      the argument to the template function
     * 
     * @return {string}
     */
    DDG.exec_template = function(template, obj) {
        if (!template) { 
            throw new Error("DDG.exec_template: template is null");
        }

        var html, t;

        // 1. Find a template function

        if ($.isFunction(template)) {
            t = template;
        }
        else if (DDG.templates[template]) {
            t = DDG.templates[template];
        }
        else if (template.match(/^DDH\./)) {       // string referencing a template
            t = DDG.getProperty(window, template);
        }

        if (!t) {
            throw new Error("Template Not Found: " + template);
        }

        // 2. render the template

        html = t(obj || {});

        if (!html) {
            throw new Error("Error Rendering Template: " + template, obj);
        }

        return html;
    };

    /**
     * convenience method for rendering
     * a template and returning a jquery object.
     * 
     * @param {string/Function} template
     * @param {Object} obj
     * @return {$} 
     */
    DDG.$exec_template = function(template, obj) {
        var str = DDG.exec_template(template, obj);
        return str && $(str);
    };

    /**
     * Functional method to find an object
     * in an array based on key/val pair
     *
     * Example:
     * DDG.findInArray([{ a: 1 },{ a: 2 }], 'a', 1) => { a: 1 }
     */
    DDG.findInArray = function(arr, key, val) {
        for (var i=0; i<arr.length; i++) {
            var item = arr[i];
            if (item && item[key] === val) {
                return item;
            }
        }
    };

    /**
     * Turns milliseconds into formatted duration (i.e. 1:12:03)
     *
     * @param {number} ms
     * 
     * @return {String}
     */
    DDG.formatDuration = function(ms) {
        var HR = 3600000,
            MIN = 60000,
            SEC = 1000;

        var hours = Math.floor(ms / HR),
            minutes = Math.floor((ms - (hours * HR)) / MIN),
            seconds = Math.round((ms - (hours * HR) - (minutes * MIN)) / SEC);

        if (hours && minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        var str = minutes + ":" + seconds;
        if (hours) {
            str = hours + ":" + str;
        }

        return str;
    };

    /**
     * Provides a JavaScript `Date()` object for the given Date string
     *
     * @param  {string} date Date string in UTC format with time (yyyy-mm-ddThh:mm:ss) or without (yyyy-mm-dd) or with spaces (yyyy-mm-dd hh:mm:ss)
     *
     * @return {Date object}
     */
    DDG.getDateFromString = function(date) {
        var dateArray = date.match(/([\d]{4})\-([\d]{2})\-([\d]{2})(?:(T|\s)([\d]{2}):([\d]{2}):([\d]{2,}))?($|Z|\s)?(UTC)?/);

        if (dateArray) {
            for (var i = 0; i < 10; i++) {
                if (dateArray[i] === undefined) {
                    dateArray[i] = false;
                }
            }

            if (dateArray[8] === 'Z' || dateArray[9] === 'UTC') { // ISO-8601 string for 'Zulu'/UTC time
                date = new Date(Date.UTC(dateArray[1], dateArray[2] - 1, dateArray[3], dateArray[5], dateArray[6], dateArray[7]));
            } else { // Presumed local
                date = new Date(dateArray[1], dateArray[2] - 1, dateArray[3], dateArray[5], dateArray[6], dateArray[7]);
            }

            return date;
        }
    };

    DDG.get_favicon_url = function(sourceUrl) {
        if (!sourceUrl || typeof sourceUrl !== "string") { return; }
        
        var domain, url, re, reArr, customFavicon, pixels, variant = '',
            isDarkBg = DDG.settings && DDG.settings.updater && DDG.settings.updater.isDarkBg,
            // we have custom icons for these domains
            faviconDomains = /wikipedia|amazon|youtube|yelp|apple|vimeo|metrolyrics|spotify|wolfram|metrolyrics|wordnik|brainyquote|soundcloud/;
            darkVariants = /wikipedia/; // icons sets that have a version for dark backgrounds

        re = /^.*?\/\/([^\/\?\:\#]+)/;
        reArr = re.exec(sourceUrl);
        if (reArr && $.isArray(reArr)) {
            domain = reArr[1];
        } else {
            domain = sourceUrl;
        }
        
        customFavicon = domain.match(faviconDomains);

        if (customFavicon) {
            // check for dark background & available variant
            if (isDarkBg && darkVariants.test(customFavicon)) {
                variant = '.white';
            }
            pixels = DDG.is3x ? '.3x' : DDG.is2x ? '.2x' : '';
            // we have a custom icon here folks
            url = '/assets/icons/favicons/'+customFavicon+variant+pixels+'.png';
        }

        if (!url ) {
            url = DDG.services.getURL('icons') + domain + ".ico";
        }

        return url;
    };

    DDG.getImageProxyURL = function (url, dontEncode) {
        if (DDG.isInternalURL(url)) { return url; }
        url = (dontEncode) ? url : encodeURIComponent(url);
        return DDG.services.getURL('images') + "?u=" + url + "&f=1";
    };

    /**
     * Provides the proper ordinal noun for a given number
     * 
     * @param  {number} number The number you need an ordinal for
     * 
     * @return {string}
     *
     * Example:
     *
     * `DDG.getOrdinal(456)` -> `'456th'`
     */
    DDG.getOrdinal = function(n){
        if (!n) { return ''; } // no '0th', no 'undefinedth'
        var s=["th","st","nd","rd"],
        v=n%100;
        return n+(s[(v-20)%10]||s[v]||s[0]);
    };

    /**
     * Provides the member of an object using dot separated path
     *
     * It's best to use this only when the sub elements might not be defined,
     * to avoid complex and awkward expressions.
     *
     * Note: Arrays can use the index number since we access object
     * properties and array indices in the same way.
     *
     * @param  {object} obj      the object to look through
     * @param  {string} pathname the dot separated path of object properties and/or array indices
     *
     * @return {string|number|object}
     *
     * Example:
     *
     * `obj = { a: { b: { c: 'test', d: [1,2,3] }}}`
     *
     * - `getProperty(obj, 'a.b.c')`     -> `'test'`
     * - `getProperty(obj, 'a.b')`       -> `{ c: 'test', d: [1,2,3] }`
     * - `getProperty(obj, 'a.b.d.0')`   -> `1`
     */
    DDG.getProperty = function(obj, pathname) {
        if (!pathname) {
            console.log("getProperty: no pathname");
            console.trace();
            return null;
        }
        var paths = pathname.split('.'),
            o = obj;

        for (var i=0,len=paths.length; i<len; i++) {
            if (!o) {
                return null;
            }

            o = o[paths[i]];
        }
        return o;
    };

    /**
     * Inject an object into the DDG
     * namespace.
     */
    DDG.inject = function(key, value) {
        var protoParts = key.split('.'),
        proto;

        for (var i = 0, protoPart; protoPart = protoParts[i]; i++) {
            var isLast = i === protoParts.length-1;

            if (i === 0) {
                if (!window[protoPart]) { window[protoPart] = {}; }
                if (isLast) { window[protoPart] = value; }

                proto = window[protoPart];

            } else {
                if (!proto[protoPart]) { proto[protoPart] = {}; }
                if (isLast) { proto[protoPart] = value; }

                proto = proto[protoPart];
            }
        }
    };

    /**
     * if a URL is an Internal URL. Internal URL's are a superset
     * of all relative urls (i.e. /about') and all url's likely
     * handled by js (i.e. 'javascript:;' or '#')
     * 
     * @param {String} url
     * @return {boolean}
     */
    DDG.isInternalURL = function (url) {
        var loc = window.location;

        return !url ||
            url.indexOf('http') === -1 ||
            url.indexOf(loc.protocol + "//" + loc.hostname + ":" + loc.port) === 0;
    };

    /**
     * Check if a value is a number
     *
     * from http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
     *
     * Note: This ensure the value is finite and **not** NaN.
     *
     * @type {Boolean}
     */
    DDG.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    /**
     * Functional method to turn object
     * into array of objects:
     *
     * Example:
     * { a: 1, b: 2 } => [{ a: 1 },{ b: 2 }]
     */
    DDG.objectToArray = function(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    };

    DDG.parseAbstract = function(s) {
        var abstractRe = /^(.*)\((.*)\)(.*)/,
        match = abstractRe.exec(s);

        var result = {
            content: s,
            main: s
        };

        if (match) {
            result.head = match[1];
            result.subTitle = match[2] || '';
            result.tail = match[3] || '';
            result.main = result.head + result.tail;
        }

        return result;
    };

    /**
     * Parses a string containing an anchor tag, ('<a href="URL">text</a>'), and returns the URL or text
     * as indicated
     *
     * Note: If more than one anchor tag exists in the string, the first will be parsed
     *
     * @param  {string} string A string containing an anchor tag
     * @param  {string} wanted **[optional]** The piece of the link to return Default: `'url'`
     *
     * @return {string}
     *
     * Example:
     *
     * `str = '<a href="https://mywebsite.com">Click here!</a> to see my website.'`
     *
     * - `DDG.parse_link(str)` -> `'https://mywebsite.com'`
     * - `DDG.parse_link(str, 'text')` -> `'Click here!'`
     * - `DDG.parse_link(str, 'rest')` -> `' to see my website.'`
     */
    DDG.parse_link = function(string,wanted) {
        var result, $tmp_p, $links, $firstLink;
        // you can ask for different parts of the link.  if you don't ask for anything you get the href.
        if (!wanted) { wanted = "url"; }

        // document parsing method
        $tmp_p = $('<p>' + string + '</p>');
        $links = $tmp_p.find("a");
        
        if ($links.length) {
            $firstLink = $($links[0]);
        } else {
            result = $tmp_p.text();
            wanted = "";
        }
        if (wanted === "text") {
            result = $firstLink.text();
        }
        else if (wanted === "rest") {
            // remove the first link, return the remaining *text*
            $firstLink.remove();
            result = $tmp_p.text();
            if (result) {
                // trim + strip any leading punctuation:
                result = result.replace(/^(\-|\:|\;|,|"|'|\s)+/,'');
            }
        } else if (wanted === "url") {
            result = $firstLink[0].href;
        }
        
        // we should be returning only text instead of html so that
        // word counts etc can be reliably run on the result
        // and occasionally there is more than one link in 
        // the parsed text. (e.g. international wikis)
        return result;
    };

    /**
     * Provides pluralization for a string
     * based on the # provided.
     *
     * DDG.pluralize(0, 'day') -> 'days'
     * DDG.pluralize(1, 'day') -> 'day'
     * DDG.pluralize(1.0, 'day') -> 'day'
     * DDG.pluralize(2, 'day') -> 'days'
     * DDG.pluralize(3, 'try', 'tries') -> 'tries'
     *
     * @param {number} count
     * @param {string} str
     * @param {string} strPlural (optional)
     * @return {string}
     */
    DDG.pluralize = function(count, str, strPlural) {
        count = parseFloat(count);
        if (!count && count !== 0) { return ''; }

        if (count === 1) {
            return str;
        } else {
            return strPlural || (str + 's');
        }
    };

    /**
     * Gets a querystring param value
     */
    DDG.querystringParam = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponentSafe(results[1].replace(/\+/g, " "));
    };

    /**
     * Scales an image/element to fit,
     * without a specific width/height region
     * 
     * Note: This maintains the original aspect ratio
     * 
     * @param {number} width Original width
     * @param {number} height Original height
     * @param {number} maxWidth **[optional]** Width constraint
     * @param {number} maxHeight **[optional]** Height constraint
     * 
     * @return {Object} with height/width attributes
     */
    DDG.scaleToFit = function(width, height, maxWidth, maxHeight) {
        var output = {
            width: width,
            height: height
        };

        if (maxWidth && output.width > maxWidth) {
            output.width = maxWidth;
            output.height = (maxWidth / width) * height;
        }
        if (maxHeight && output.height > maxHeight) {
            output.height = maxHeight;
            output.width = (maxHeight / height) * width;
        }

        return output;
    };

    /**
     * Shuffle an array of items
     * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     *
     * @param {Array} arr
     * @return {Array}
     */
    DDG.shuffle = function(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)),
                temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    };

    /**
     * More aggressive version strip_html that is capable
     * of stripping malformed html by converting tags to entities.
     *
     * http://stackoverflow.com/questions/295566/sanitize-rewrite-html-on-the-client-side/430240#430240
     *
     * @param {string}
     * @return {string}
     */
    DDG.strip_all_html = function(html) {
        var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*',
            tagOrComment = new RegExp(
                '<(?:' +
                // Comment body.
                '!--(?:(?:-*[^->])*--+|-?)' +
                // Special "raw text" elements whose content should be elided.
                '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*' +
                '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*' +
                // Regular name
                '|/?[a-z]' +
                tagBody +
                ')>',
            'gi'),
            oldHtml;

        while (html !== oldHtml) {
            oldHtml = html;
            html = html.replace(tagOrComment, '');
        }

        return html.replace(/</g, '&lt;');
    };

    /**
     * Mangles `src` and `href` attributes in HTML
     * to _src and _href so they won't load content
     *
     * @param  {string} html HTML string containing tags with `src` and `href` attributes
     *
     * @return {string} 
     */
    DDG.strip_href = function(html) {
        if (html) {
            return html.replace(/(src|href)\s*=\s*(['"])/gi, "_$1=$2" );
        }
        return "";
    };

    /**
     * Removes HTML tags/characters from a string. Not capable
     * of removing malformed HTML tags (i.e. opening tag w/o closing tag), because
     * that would screw up things like "1 < 2".
     *
     * @param  {string} html String containing HTML
     * @return {string}
     */
    DDG.strip_html = function(html) {
        // Code from underscore.string.js
        if (!html) { return ''; }

        return String(html).replace(/<\/?[^>]+>/g, '');
    };

    /**
     * Removes Non-Alpha characters (`\W`) from a string
     *
     * @param  {sting} str The input string to strip
     *
     * @return {string}
     */
    DDG.strip_non_alpha = function(str) {
        if (str) { str = str.replace(/\W/g, ''); }
        return str;
    };

    /**
     * Turns a URL that starts with "http" to "https", e.g., "http://duckduckgo.com" to "https://duckduckgo.com".
     *
     * @param {String} url
     * 
     * @return {String}
     */
    DDG.toHTTPS = function(url) {
        return url && url.replace(/^http:/,'https:');
    };

    /**
     * Turns a URL that starts with "https" to "http", e.g., "https://duckduckgo.com" to "http://duckduckgo.com".
     *
     * @param {String} url
     * 
     * @return {String}
     */
    DDG.toHTTP = function(url) {
        return url && url.replace(/^https/, "http");
    };

})(this);
