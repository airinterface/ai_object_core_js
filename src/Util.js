/*
 * @class       Util
 * this function supplies set of utility functionality
 * Description:
 * This component provides utility functions.
 *
 * required library :
 *   shim.js / sham.js
 *
 * Revision History
 * Date    Version    CreatedBy    Description
 * ---------------------------------------------------
 * Jan 17 2019  0.0.1      Yuri Fukuda  Created
 */

(function() {
  var Util = (function() {
    function Util() {
    }

    Util.TEMPLATEMATHCER = /###(\w+)###/;



    /*
     * escapeHTML(message)
     * This excapes HTML
     *
     * Examples
     * Util.escapeHTML("<div></div>");
     * will return "&lt;div&gt;&lt;/div&gt;""
     *
     * @param {String} string to escape
     * @return {String} escaped html
     * @api public
     */

    Util.escapeHTML = function( origString ) {
      if( typeof origString != "string" ||
        origString.trim().length == 0 )
        return "";
      return String( origString )
        .replace( /&/g, '&amp;' )
        .replace( /"/g, '&quot;' )
        .replace( /'/g, '&#39;' )
        .replace( /</g, '&lt;' )
        .replace( />/g, '&gt;' );
    };


    /*
     * toCammelCase(message)
     * this returns cammel case of the string
     *
     * Examples
     * Util.toCamelCase("InnerWidth")
     * will return "innerWidth"
     *
     * @param {String} string to apply cammel case
     * @return {String} escaped html
     * @api public
     */

    Util.toCammelCase = function( origString ) {
      var res;
      res = null;
      if( (origString != null ? origString.length : void 0) > 0 ) {
        res = "" + (origString[0].toLowerCase()) + origString.slice( 1 );
      }
      return res;
    };


    /*    
     * namespace
     * Description:
     * This file will have following
     * 1. keep common function aside from the block objects.
     * 2. Create es namespace
     *
     * Example:
     * Util.namespace("es.im") will result generating the object
     * window.es.im
     *
     * @param {String} namespace if there is any level to the namespace,
     *   it will be separeated by "."
     * @param {object} parent object which create namespace to
     * @param {object} object that will be assigned to the name space
     * @return {String} escaped html
     * @api public
     *
     */

    Util.namespace = function( name, parent, assignedObject ) {
      var names, ns, res, _parent;
      res = null;
      _parent = parent;
      if( parent === null ) {
        _parent = window;
      }
      if( name.length > 0 && typeof name === 'string' ) {
        names = name.split( "." );
        ns = null;
        if( Util.hasOwnProperty( _parent, names[0] ) ) {
          return ns = _parent[names[0]];
        }
        else if( names.length === 1 ) {
          return _parent[names[0]] = assignedObject === null ? {} : assignedObject;
        }
        else if( names.length > 1 ) {
          _parent[names[0]] = {};
          return Util.namespace( names.slice( 1 ).join( "." ), _parent[names[0]] );
        }
      }
      else {
        return null;
      }
    };

    Util.hasOwnProperty = function( arg1, arg2 ) {
      var name, obj;
      obj = arguments.length === 1 ? window : arg1;
      name = arguments.length === 1 ? arg1 : arg2;
      return name in obj || obj.hasOwnProperty( name );
    };


    // For now, 
    // a = ["a"];
    // Util.merge(a, ["b"], ["c"]) will be ["a",["b"],["c"]] not ["a", "b", "c"]
    Util.merge = function( obj ) {
      var i, prop, source, _i, _j, _len, _ref;
      if( !this.isObject( obj ) ) {
        return obj;
      }
      if( Array.isArray( obj ) ) {
        for( i = _i = 1, _ref = arguments.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i ) {
          val = arguments[i];
          obj.push( val );
        }
        return obj;
      }
      var source, prop;
      for( i = _i = 1, _ref = arguments.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i ) {
        source = arguments[i];
        for( prop in  source ) {
          if( this.hasOwnProperty( source, prop ) ) {
            obj[prop] = source[prop];
          }
        }
      }
      return obj;
    };

    Util.replacePattern = function( template, data, pattern ) {
      var lPattern, matchedKey, tmp, tmpStr, val;
      tmpStr = "";
      lPattern = Util.TEMPLATEMATHCER;
      if( pattern ) {
        lPattern = pattern;
      }
      tmpStr = template;
      while( (matchedKey = lPattern.exec( tmpStr )) ) {
        val = "";
        tmp = data[matchedKey[1]];
        if( tmp !== 'undefined' ) {
          if( typeof tmp === 'function' ) {
            val = tmp();
          }
          else {
            val = tmp;
          }
        }
        tmpStr = tmpStr.replace( lPattern, val );
      }
      return tmpStr;
    };

    Util.blank = function( obj ) {
      var res;
      res = true;
      if( typeof obj !== 'undefined' ) {
        if( typeof obj === 'string' ) {
          if( obj.trim().length > 0 ) {
            res = false;
          }
        }
        else if( Array.isArray( obj ) ) {
          if( obj.length > 0 ) {
            res = false;
          }
        }
        else if( obj !== null ) {
          res = false;
        }
      }
      return res;
    };

    Util.isArray = function( obj ) {
      return Array.isArray( obj );
    };


    Util.isObject = function( obj ) {
      var type;
      type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    };

    Util.isNumber = function( obj ) {
      var _obj;
      _obj = obj;
      if( typeof _obj === 'string' ) {
        _obj = _obj.trim();
      }
      return typeof _obj !== 'undefined' && _obj !== null && _obj !== "" && typeof _obj !== "object" && !isNaN( _obj );
    };

    Util.compare = function( a, b ) {
      if( typeof a === 'string' && typeof b === 'string' ) {
        if( Util.IntlSupported ) {
          return new Intl.Collator().compare( a, b );
        }
        else {
          return a.localeCompare( b );
        }
      }
      else {
        if( a > b ) {
          return 1;
        }
        if( a < b ) {
          return -1;
        }
      }
      return 0;
    };
    
    /**
     * @function   
     * @memberof   Util
     * @static
    */
    Util.toClassName =  function(value){
      return value
        .replace(/_/g, " ")
        .replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1)})
        .replace(/\s/g, "");
    }

    Util.escapeHTML = function ( value ) {
      SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;
      var res = value.replace(/&/g, '&amp;').
      replace(SURROGATE_PAIR_REGEXP, function(value) {
        var hi = value.charCodeAt(0);
        var low = value.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
      }).
      replace(NON_ALPHANUMERIC_REGEXP, function(value) {
        return '&#' + value.charCodeAt(0) + ';';
      }).
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;');
      return res;
    }; 


    return Util;

  })();

  Util.IntlSupported = typeof Intl === 'object';
  this.Util = Util;

}).call( com.ai );



