/*
 * nojquery-postmessage by Jeff Lee
 * a non-jQuery fork of:
 *
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
function NoJQueryPostMessageMixin(g,a){var b,h,e,d,f,c=1;if(window.postMessage){if(window.addEventListener){b=function(i){window.addEventListener("message",i,false)};h=function(i){window.removeEventListener("message",i,false)}}else{b=function(i){window.attachEvent("onmessage",i)};h=function(i){window.detachEvent("onmessage",i)}}this[g]=function(i,k,j){if(!k){return}j.postMessage(i,k.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))};this[a]=function(k,j,i){if(e){h(e);e=null}if(!k){return false}e=b(function(l){switch(Object.prototype.toString.call(j)){case"[object String]":if(j!==l.origin){return false}break;case"[object Function]":if(j(l.origin)){return false}break}k(l)})}}else{this[g]=function(i,k,j){if(!k){return}j.location=k.replace(/#.*$/,"")+"#"+(+new Date)+(c++)+"&"+i};this[a]=function(k,j,i){if(d){clearInterval(d);d=null}if(k){i=typeof j==="number"?j:typeof i==="number"?i:100;d=setInterval(function(){var m=document.location.hash,l=/^#?\d+&/;if(m!==f&&l.test(m)){f=m;k({data:m.replace(l,"")})}},i)}}}return this};
(function ($, undef) {
    var global = this;

    // Namespace.
    global.FS = global.FS || {};

    if (null == global.FS.PostMessage) {
        global.FS.PostMessage = function () {
            var
                _isChild            = false,
                _isChildInitialized = false,
                _postman            = new NoJQueryPostMessageMixin('postMessage', 'receiveMessage'),
                _callbacks          = {},
                _baseUrl,
                _parentUrl,
                _parentSubdomain,
                _initParentUrl      = function (parentUrl) {
                    _parentUrl       = parentUrl;
                    _parentSubdomain = parentUrl.substring(0, parentUrl.indexOf('/', ('https://' === parentUrl.substring(0, ('https://').length)) ? 8 : 7));
                    _hasParent       = ('' !== parentUrl);
                },
                _init               = function () {
                    _postman.receiveMessage(function (e) {
                        var data;

                        try {
                            if (e && e.data && ('string' === typeof e.data) && '{' === e.data.charAt(0)) {
                                data = JSON.parse(e.data);

                                if (_callbacks[data.type]) {
                                    for (var i = 0; i < _callbacks[data.type].length; i++) {
                                        // Execute type callbacks.
                                        _callbacks[data.type][i](data.data);
                                    }
                                }
                            }
                        } catch (err) {
                            console.error('FS.PostMessage.receiveMessage', err.message);
                            console.log(e.data);
                        }
                    }, _baseUrl);
                },
                _prevHeight         = -1,
                _hasParent          = ('' !== _parentUrl),
                $window             = $(window),
                $html               = $('html');

            var _isIframe = true;

            try {
                _isIframe = (window.self !== window.top);
            } catch (e) {
            }

            if (_isIframe) {
                _initParentUrl(decodeURIComponent(document.location.hash.replace(/^#/, '')));
            }

            return {
                init              : function (url, iframes) {
                    _baseUrl = url;

                    _init();

                    // Automatically receive forward messages.
                    FS.PostMessage.receiveOnce('forward', function (data) {
                        window.location = data.url;
                    });

                    iframes = iframes || [];

                    if (iframes.length > 0) {
                        $window.on('scroll', function () {
                            for (var i = 0; i < iframes.length; i++) {
                                FS.PostMessage.postScroll(iframes[i]);
                            }
                        });
                    }
                },
                /**
                 * @param {string} [parentUrl]
                 */
                init_child        : function (parentUrl) {
                    if (parentUrl) {
                        _initParentUrl(parentUrl);
                    }

                    this.init(_parentSubdomain);

                    _isChild            = true;
                    _isChildInitialized = true;

                    // Post height of a child right after window is loaded.
                    $(window).bind('load', function () {
                        FS.PostMessage.postHeight();

                        // Post message that window was loaded.
                        FS.PostMessage.post('loaded');
                    });

                    // Post height of a child on window resize.
                    $(window).resize(function () {
                        FS.PostMessage.postHeight();

                        // Post message that window was loaded.
                        FS.PostMessage.post('resize');
                    });

                    console.log('PostMessage[iframe].initialized');
                },
                hasParent         : function () {
                    return _hasParent;
                },
                postHeight        : function (diff, wrapper) {
                    diff    = diff || 0;
                    wrapper = wrapper || '#wrap_section';

                    var newHeight = diff + $(wrapper).outerHeight(true);

                    if (newHeight == _prevHeight) {
                        // Don't post if height didn't change.
                        return false;
                    }

                    this.post('height', {
                        height: newHeight
                    });

                    _prevHeight = newHeight;

                    return true;
                },
                postScroll        : function (iframe) {
                    this.post('scroll', {
                        top   : $window.scrollTop(),
                        height: ($window.height() - parseFloat($html.css('paddingTop')) - parseFloat($html.css('marginTop')))
                    }, iframe);
                },
                post              : function (type, data, iframe) {
                    if (iframe) {
                        console.debug('PostMessage[parent].post[iframe]', type);

                        // Post to iframe.
                        _postman.postMessage(JSON.stringify({
                            type: type,
                            data: data
                        }), iframe.src, iframe.contentWindow);
                    }
                    else 
                    {
                        console.debug('PostMessage[iframe].post[parent]', type);

                        // Post to parent.
                        _postman.postMessage(JSON.stringify({
                            type: type,
                            data: data
                        }), _parentUrl, window.parent);
                    }
                },
                receive           : function (type, callback) {
                    console.debug('PostMessage[' + (_isIframe ? 'iframe' : 'parent') + '].receive', type);

                    if (null == _callbacks[type])
                        _callbacks[type] = [];

                    _callbacks[type].push(callback);
                },
                receiveOnce       : function (type, callback, flush) {
                    flush = (undef === flush) ?
                        false :
                        flush;

                    if (flush)
                        this.unset(type);

                    if (this.is_set(type))
                        return;

                    this.receive(type, callback);
                },
                // Check if any callbacks assigned to a specified message type.
                is_set            : function (type) {
                    return (null != _callbacks[type]);
                },
                /**
                 * Removes callbacks assigned to a specified message type.
                 *
                 * @author Leo Fajardo
                 *
                 * @param {string} type
                 */
                unset             : function (type) {
                    _callbacks[type] = null;
                },
                parent_url        : function () {
                    return _parentUrl;
                },
                parent_subdomain  : function () {
                    return _parentSubdomain;
                },
                isChildInitialized: function () {
                    return _isChildInitialized;
                }
            };
        }();
    }
})(jQuery);

(function ($, undef) {
    var global = this;

    // Namespace.
    global.FS = global.FS || {};

    global.FS.Members = function () {
        var _isFlashingBrowser = false,
            _isSafari = false;

        var ua = navigator.userAgent.toLowerCase();

        if (/edge\/|trident\/|msie /.test(ua)){
            _isFlashingBrowser = true; // IE

            console.log('browser', 'ie');
        } else if (ua.indexOf('safari') != -1) {
            if (ua.indexOf('chrome') > -1) {
                // Chrome
                console.log('browser', 'chrome');
            } else {
                _isFlashingBrowser = true; // Safari
                _isSafari = true;
                console.log('browser', 'safari');
            }
        } else {
            console.log('browser', 'other');
        }

        var _isIframe = true;

        try {
          _isIframe = (window.self !== window.top);
        } catch (e) { }

        var
            _initialized = false,
            _parsePathFromHash = function () {
                var hash = window.location.hash,
                    pathStartsAt = hash.indexOf('!');

                return (0 <= pathStartsAt) ? 
                    hash.substr(pathStartsAt + 1).replace(/^\/+|\/+$/g, '') : 
                    '';
            },
            _hashJustUpdated = false,
            _lastPath = '',
            /**
             * Update the dashboard's container hash.
             * 
             * @author Vova Feldman
             * 
             * @param {string} path The new dashboard's path.
             * 
             * @return {boolean} If the hash was updated.
             */
            _updateHash = function (path) {
                var hash = window.location.hash,
                    pathStartsAt = hash.indexOf('!');

                var newHash = ((0 <= pathStartsAt) ?
                    hash.substr(0, pathStartsAt) :
                    '') + '!' + path;

                if (newHash == window.location.hash) {
                    return false;
                }

                _lastPath = path;

                window.location.hash = newHash;

                return true;
            },
            _findBaseUrl = function () {
                var scripts = document.getElementsByTagName('script');
                for (var i = 0; i < scripts.length; i++) {
                    if (-1 !== scripts[i].src.indexOf('//users.freemius')) {
                        var pos = scripts[i].src.substr('https://'.length).indexOf('/');
                        if (-1 === pos) {
                            // No additional backslashes.
                            return scripts[i].src;
                        } else {
                            return scripts[i].src.substr(0, pos + 'https://'.length);
                        }
                    }
                }

                // Fallback to production by default.
                return 'https://users.freemius.com';
            },
            _baseUrl = _findBaseUrl(),
            _overflow,
            _iframe,
            _s4 = function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            },
            _guid = function () {
                return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' +
                _s4() + '-' + _s4() + _s4() + _s4();
            },
            _options = {
                // mode: 'dialog',
                guid: _guid()
            },
            // @link http://stackoverflow.com/questions/8565821/css-max-z-index-value
            MAX_ZINDEX = 2147483647,
            _sanitizeOptions = function (options) {
                options = $.extend({}, _options, options);

                if (null == options.store_id &&
                    null == options.product_id &&
                    null == options.plugin_id &&
                    null == options.theme_id
                ) {
                    throw 'Running the dashboard in an iframe requires setting up a store or a product scope.';
                }
                
                if (null == options.public_key) {
                    throw 'You must set the public key of the dashboard\'s scope object.';
                }
                
                return options;
            },
            _getUri = function (options) {
                var uri = _baseUrl;

                if (options.store_id) {
                    uri += '/store/' + options.store_id;
                } else if (options.product_id) {
                    uri += '/product/' + options.product_id;
                } else if (options.plugin_id) {
                    uri += '/plugin/' + options.plugin_id;
                } else if (options.theme_id) {
                    uri += '/theme/' + options.plugin_id;
                }

                var path = _parsePathFromHash();

                if ('' !== path) {
                    uri += '/' + path;
                }

                var querystring = {},
                    parentQueryObject = _parseQuerystring(window.location.search),
                    preservedParams = [
                        'public_key',
                        'email',
                        'user_secret_key',
                        'developer_id',
                        'developer_secret_key',
                        'user_id',
                        'token'
                    ];

                for (var i = 0; i < preservedParams.length; i++) {
                    if (options[preservedParams[i]]) {
                        querystring[preservedParams[i]] = options[preservedParams[i]];
                    } else if (parentQueryObject[preservedParams[i]]) {
                        querystring[preservedParams[i]] = parentQueryObject[preservedParams[i]];
                }
                }

                uri += (0 <= uri.indexOf('?') ? '&' : '?') + _httpBuildQuery(querystring);

                return uri;
            },
            /**
             * @author Leo Fajardo
             */
            _tryFixEncoding = function () {
                var hash = window.location.hash;

                if ( ! (hash.indexOf('!') >= 0)) {
                    var encodedHashPosition = hash.indexOf('%21');
                    if (encodedHashPosition >= 0) {
                        // Try to fix the encoding of the '!' character.
                        hash = (hash.substring(0, encodedHashPosition) + '!' + hash.substr(encodedHashPosition + 3));
                    }
                }

                if (hash.indexOf('reset_token=') >= 0) {
                    // Try to fix the encoding of the `reset_token` param value.
                    var queryStringParts = hash.split('reset_token=');
                    if (2 === queryStringParts.length && queryStringParts[1].indexOf('?') >= 0) {
                        hash = (queryStringParts[0] + 'reset_token=' + encodeURIComponent(queryStringParts[1]));
                    }
                }

                window.location.hash = hash;
            },
            _prepare = function (options) {
                _tryFixEncoding();

                var src = _getUri(options);

                // Append the Iframe into the DOM.
                _iframe = $('<iframe id="' + options.guid + '" src="' + src + '" width="100%" height="100%" allowtransparency="true" frameborder="0" style="z-index: ' + MAX_ZINDEX + '; background: rgba(0,0,0,0.003); border: 0px none transparent; visibility: ' + (_isFlashingBrowser ? 'hidden' : 'visible') + '; margin: 0px; padding: 0; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; overflow: hidden;"><\/iframe>')
                    .appendTo($container);

                if ( ! _initialized)
                {
                    _initialized = true;

                    FS.PostMessage.init(_baseUrl, [_iframe[0]]);

                    FS.PostMessage.receiveOnce('pathChanged', function (data) {
                        _hashJustUpdated = _updateHash(data.path);
                    });

                    FS.PostMessage.receiveOnce('getLocation', function (data) {
                        FS.PostMessage.post(
                            'location',
                            { 
                                href:     window.location.href,
                                location: window.location.toString(),
                                hash:     window.location.hash
                            },
                            _iframe[0]
                        );
                    });

                    FS.PostMessage.receiveOnce('localStorage.setItem', function (data) {
                        if (data.key.length > 3 && 'fs_' === data.key.substr(0, 3)) {
                            localStorage.setItem(data.key, data.value);
                        }
                    });

                    FS.PostMessage.receiveOnce('localStorage.removeItem', function (key) {
                        if (key.length > 3 && 'fs_' === key.substr(0, 3)) {
                            localStorage.removeItem(key);
                        }
                    });

                    FS.PostMessage.receiveOnce('localStorage.getItem', function (key) {
                        if (key.length > 3 && 'fs_' === key.substr(0, 3)) {
                            FS.PostMessage.post(
                                'localStorage.getItem',
                                {
                                    key:   key,
                                    value: localStorage.getItem(key)
                                },
                                _iframe[0]
                            );
                        }
                    });

                    $(window).on('hashchange', function() {
                        // Don't notify the iframe about hash changes that were originally triggered from the iframe.
                        if (_hashJustUpdated) {
                            _hashJustUpdated = false;
                            return;
                        }

                        var newPath = _parsePathFromHash();

                        if (newPath == _lastPath) {
                            return;
                        }

                        FS.PostMessage.post(
                            'pathChanged', 
                            { path: newPath }, 
                            _iframe[0]
                        );

                        _lastPath = newPath;
                    });
                }
            },
            _addListener = function (event, options) {
                FS.PostMessage.receiveOnce(event, function (param) {
                    if (options[event]) {
                        try {
                            options[event](param);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }, true);
            },
            _open = function (options) {
                if (_isSafari) {
                    // Safari currently blocks IndexedDB when running within an iFrame.
                    top.location = _getUri(options);
                    return;
                }
                
                $('#loader_' + options.guid).show();

                _prepare(options);

                FS.PostMessage.receiveOnce('loaded', function (uniqueID) {
                    FS.PostMessage.post('handshake', uniqueID, _iframe[0]);
                    
                    $('#loader_' + options.guid).hide();

                    // @link https://css-tricks.com/prevent-white-flash-iframe/
                    if (_isFlashingBrowser) {
                        $('#' + options.guid).ready(function(){
                            $('#' + options.guid).css('visibility', 'visible');
                        });
                    }

                    if (options.afterLoad) {
                        try {
                            options.afterLoad();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }, true);

                FS.PostMessage.receiveOnce('removeScope', function () {
                    window.top.location.reload();
                });

                _addListener('afterLogin', options);
                _addListener('afterLogout', options);
                _addListener('afterDownloadsLoad', options);
            },
            _httpBuildQuery = function (object) {
                var query = '';

                for (var key in object) {
                    if (!object.hasOwnProperty(key) ||
                        'function' == typeof object[key] ||
                        ('object' == typeof object[key] && null !== object[key])
                    ) {
                        continue;
                    }

                    query += '&' + key + '=' + _encodeURIComponent(object[key]);
                }

                if (query.length > 0)
                    query = query.substr(1);

                return query;
            },
            _parseQuerystring = function (url) {
                var queryPosition = url.indexOf('?');
                
                if (!(-1 < queryPosition)) {
                    return {};
                }

                var query = url.substring(queryPosition + 1),
                    vars = query.split('&');

                var queryObject = {};
                for (var i = 0; i < vars.length; i++) {
                    try {
                        var pair = vars[i].split('=');
                        queryObject[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                    } catch (e) {

                    }
                }

                return queryObject;
            },
            _encodeURIComponent = function (mixed) {
                if (null === mixed)
                    return 'null';

                if (true === mixed)
                    return '1';

                if (false === mixed)
                    return '0';

                return encodeURIComponent(mixed)
                    .replace(/!/g, '%21')
                    .replace(/'/g, '%27')
                    .replace(/\(/g, '%28')
                    .replace(/\)/g, '%29')
                    .replace(/\*/g, '%2A')
                    .replace(/%20/g, '+');
            },
            $container,
            _configure = function () {
                var src = $anchor = $('#fs_dashboard_anchor');

                if (0 === $anchor.length) {
                    $container = $('<div></div>').appendTo('body');
                } else {
                    $container = $('<div></div>').insertAfter($anchor);
                }

                $container.attr('id', 'fs_dashboard_container');

                if (_options.css) {
                    $container.css(_options.css);
                }
            },
            _prepareLoader = function () {
                $container.append('<div id="loader_' + _options.guid + '" style="\
                position: absolute;\
                z-index: ' + MAX_ZINDEX + ';\
                width: 100%;\
                height: 100%;\
                top: 0;\
                right: 0;\
                bottom: 0;\
                left: 0;\
                text-align: left;\
                background: rgba(0,0,0,0.6);\
                ">\
                <img src="' + _baseUrl + '/assets/img/loader.gif" alt="Loading animation" style="\
                position: absolute;\
                top: 40%;\
                left: 50%;\
                margin-left: -25px;\
                background: #fff;\
                padding: 10px;\
                border-radius: 50%;\
                box-shadow: 2px 2px 2px rgba(0,0,0,0.1);\
                ">\
                </div>');
            },
            _gateKeeper = function () {
                if (_isIframe) {
                    throw 'Oops... the page cannot load the dashboard when running in an iFrame';
                }
            };

        return {
            /**
             * Configure context plugin.
             *
             * @param options Optional settings: plugin_id, store_id.
             */
            configure: function (options) {
                _gateKeeper();

                _options = _sanitizeOptions(options || {});

                _configure();
                _prepareLoader();

                return global.FS.Members;
            },
            /**
             * Open checkout.
             *
             * @param options pricing_id, plan_id, (optional) name
             */
            open     : function (options) {
                _gateKeeper();

                _open(_sanitizeOptions(options));
            },
            /**
             * Close checkout.
             */
            close    : function () {
                _gateKeeper();

                FS.PostMessage.post('close', null, _iframe[0]);
            },
            /**
             * Resets the existing options.
             *
             * @author Leo Fajardo
             */
            clearOptions: function() {
                _gateKeeper();

                _options = {
                    mode: _options.mode,
                    guid: _options.guid
                };
            },
            /**
             * Allows to add extra items to the downloads section.
             * 
             * @param {Array} downloads 
             * 
             * @author Vova Feldman
             */
            addDownloads: function(downloads) {
                if (downloads.length > 0) {
                    for (var i = 0; i < downloads.length; i++) {
                        if (null == downloads[i].id) {
                            // User the URL as the ID.
                            downloads[i].id = downloads[i].url.replace(/\W/g, '');
                        }
                    }
                }

                FS.PostMessage.post('addDownloads', downloads, _iframe[0]);
            },
            /**
             * This method should be called within the afterLoad callback handler.
             * 
             * @author Vova Feldman
             * 
             * @param {Callable} callback 
             */
            getUser: function (callback) {
                if (null == callback) {
                    return;
                }

                FS.PostMessage.receiveOnce('user', function (user) {
                    try {
                        callback(user);
                    } catch (e) {
                        console.log(e);
                    }
                }, true);

                FS.PostMessage.post('getUser', null, _iframe[0]);
            }
        };
    }();
})(jQuery);