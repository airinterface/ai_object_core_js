(function(){
  var com    = ( this.com    || {} );
  com.ai = ( this.com.ai || {} );
  this.com = com;
}).call(this);

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




(function() {
  var __slice = [].slice;

  this.Log = (function() {
    function Log() {
    }

    Log.debugFlag = false;


    Log.logError = function(e, url, lineNumber, column, error) {
      var errorID, messageContent, _error, _ref;
      if (e == null) {
        e = null;
      }
      if (url == null) {
        url = null;
      }
      if (lineNumber == null) {
        lineNumber = null;
      }
      if (column == null) {
        column = null;
      }
      if (error == null) {
        error = null;
      }
      errorID = "[" + ((new Date()).getTime()) + "]" + (typeof ESB !== "undefined" && ESB !== null ? (_ref = ESB.AppController) != null ? _ref.getCurrentAppContextInfo() : void 0 : void 0);
      messageContent = {};
      _error = typeof e === "object" ? e : error || {};
      messageContent['error'] = _error;
      messageContent.error['message'] = "" + (typeof e === 'string' ? e : (e.message ? e.message : void 0)) + "[" + errorID + "]";
      if (url) {
        messageContent.error['fileName'] = url;
      }
      if (lineNumber) {
        messageContent.error['line_number'] = lineNumber;
      }
      messageContent.error['columnNumber'] = column || 0;
      messageContent.error['context'] = {
        errorID: errorID
      };
      if (Log.debugFlag || ((typeof debugFlag !== "undefined" && debugFlag !== null) ? debugFlag : false)) {
        alert("Error Occured. Please report with ID : " + errorID + "\n" + e);
      } else {
        Log.error(Log.dumpObj(messageContent));
      }
      return typeof Airbrake !== "undefined" && Airbrake !== null ? Airbrake.push(messageContent) : void 0;
    };

    Log.initialize = function() {
      window.onerror = function(e, url, lineNumber, column, error) {
        Log.logError(e, url, lineNumber, column, error);
        return true;
      };
      return null;
    };

    Log.initialize = function() {
      // @yuri: can't we just do
      // if( Log.debugFlag || !!debugFlag ) {

      if( Log.debugFlag || ((typeof debugFlag !== "undefined" && debugFlag !== null) ? debugFlag : false) ) {
        return window.onerror = function( e, url, lineNumber ) {
          return alert( "" + e + "url:" + url + "lineNumber:" + lineNumber );
        };
      }
    };

    Log.log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call( arguments, 0 ) : [];
      return this.call( 'log', args );
    };

    Log.debug = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call( arguments, 0 ) : [];
      return this.call( 'debug', args );
    };

    Log.info = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call( arguments, 0 ) : [];
      return this.call( 'log', args );
    };

    Log.warn = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call( arguments, 0 ) : [];
      return this.call( 'warn', args );
    };

    Log.error = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call( arguments, 0 ) : [];
      return this.call( 'warn', args );
    };

    Log.call = function( name, args ) {
      if( (typeof console !== "undefined" && console !== null) && console[name] ) {
        return console[name]( args[0] );
      }
    };

    Log.logToServer = function( msg ) {
      var img;
      img = new Image();
      return img.src = "_clear.png?msg=" + msg + "&_esTime=" + ((new Date()).getTime());
    };

    Log.dumpObj = function( obj, level ) {
      var arr, count, dumped_text, e, endString, i, isArray, isHash, isString, item, j, key, level_padding, size, startString, tmpText, value, _i, _ref;
      dumped_text = "";
      try {
        level_padding = "";
        if( level === null || typeof level === 'undefined' ) {
          level = 0;
        }
        // @yuri: oh...the humanity!
        for( j = _i = 0, _ref = level + 1; 0 <= _ref ? _i < _ref : _i > _ref; j = 0 <= _ref ? ++_i : --_i ) {
          level_padding += "    ";
        }
        startString = "";
        endString = "";
        isArray = obj !== null && (typeof obj === 'object') && (obj.constructor === Array);
        isHash = obj !== null && (typeof obj === 'object') && (obj.constructor !== Array);
        isString = typeof obj === 'string';
        if( isArray ) {
          startString = "[\n";
          endString = "]\n";
        }
        if( isHash ) {
          startString = "{\n";
          endString = "}\n";
        }
        if( isString ) {
          startString = "\"";
          endString = "\"";
        }
        if( typeof obj === 'object' ) {
          dumped_text += "\n" + level_padding + startString;
          arr = obj;
          count = 0;
          size = 0;
          for( key in arr ) {
            i = arr[key];
            size++;
          }
          for( key in arr ) {
            item = arr[key];
            count++;
            value = arr[key];
            dumped_text += "" + level_padding + "\"" + key + "\":" + (Log.dumpObj( value, level + 1 ));
            if( count !== size ) {
              dumped_text += ",\n";
            }
          }
          dumped_text += "" + level_padding + endString;
        }
        else if( typeof obj !== 'function' ) {
          tmpText = obj !== null && obj !== void 0 ? obj : "null";
          if( (obj != null ? obj.length : void 0) === 0 && startString.length === 0 ) {
            tmpText = "null";
          }
          if( startString === "\"" ) {
            tmpText = tmpText.replace( /\"/g, "\\\"" );
          }
          dumped_text += startString + tmpText + endString;
        }
      } catch( _error ) {
        e = _error;
        alert( e );
      }
      return dumped_text;
    };

    return Log;

  })();

  this.Log.initialize();

}).call( com.ai );

/**
 * #AObject
 *  This component is a set of common functionality for
 *  all instance of eachscape library component.
 *
 * ##Example:
 *  `yourClass extends AObject
 *     .. place yoru implementation here ...
 *  `
 *
 */


/*!
 * required library : 
 * Revision History
 * Date    Version    CreatedBy    Description
 * ---------------------------------------------------
 * Jan 17 2019  0.0.1      Yuri Fukuda  Created
 */

(function() {
  this.AObject = (function() {
    var nameProp = '__name__';
    var createNamedConstructor = function( name, constructor ) {
      var fn = new Function( 'constructor', 'return function ' + name + '()\n'
      + '{\n'
      + '    // wrapper function created dynamically for "' + name + '" constructor to allow instances to be identified in the debugger\n'
      + '    constructor.apply(this, arguments);\n'
      + '};' );
      return fn( constructor );
    }
    /*!
     * this function is called to define the setter and getter in the
     * prototype
     */
    function AObject() {
    };


    AObject.esNameSpace = "es";

    AObject.prototype.confVal = {};


    AObject.merge = function( obj ) {
      if( !Util.isObject( obj ) ) return obj;
      var source, prop;
      for( var i = 1, length = arguments.length; i < length; i++ ) {
        source = arguments[i];
        for( prop in source ) {
          if( hasOwnProperty.call( source, prop ) ) {
            obj[prop] = source[prop];
          }
        }
      }
      return obj;
    };
    AObject.uniqueID = 1;
    AObject.extends = function( protoVal, staticVal ) {
        var name = 'child';
        var constructor = null;
        if( protoVal && protoVal.hasOwnProperty( nameProp ) ) {
          // TODO - check that name is a valid identifier
          name = protoVal[nameProp] || 'child';
        }
        // wrap constructor from protoVal if supplied or 'this' (the function we are extending)
        constructor = protoVal.hasOwnProperty( 'constructor' ) ? protoVal.constructor : this;
        protoVal = Util.merge( protoVal, {
          constructor : createNamedConstructor( name, constructor )
        } );
        var parent = this;
        var child = protoVal.constructor;
        for( var key in parent ) {
          if( Util.hasOwnProperty( parent, key ) ) {
            if( Array.isArray(parent[key]) ){
              child[key] = parent[key].splice();
            } else {
              child[key] = parent[key];
            }
          }
        }
        for( var key in staticVal ) {
          if( Util.hasOwnProperty( staticVal, key ) ) child[key] = staticVal[key];
        }
        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        Util.merge( child.prototype, protoVal );
        child.__super__ = parent.prototype;
        //child.__super__.constructor = eval( this.name );
        return child;
      };

    AObject.extend = AObject.extends;

    /*
     * prop is global function which is used right after
     * the declaration of the each class.
     * by setting prop name, default value, it will create
     * a property if it doesn't exists, and create
     * auxiliary function of it's property
     *
     * ##Examples:
     *  `class @YourClass extends AObject
     *    ....
     *   @YourClass.prop("yourName","test",null)
     *   obj = new YourClass()
     *   alert(obj.getYourName()
     *   ->returns 'test'
     *   obj.setYourName("test2")
     *   alert(obj.getYourName()
     *   -> returns 'test2'
     *   `
     * @param {String} name name of the property
     * @param {AObject} defaultVal default value to initialized with
     * @api public
     */

    AObject.prop = function( name, defaultVal, confObj ) {
      var funcName;
      name = name;
      AObject.prototype[name] = defaultVal;
      if( name === null ) {
        return;
      }
      funcName = "" + (name[0].toUpperCase()) + (name.length > 1 ? name.slice( 1 ) : '');
      AObject.prototype["set" + funcName] = function( val ) {
        return this.set( name, val );
      };
      AObject.prototype["get" + funcName] = function() {
        return this.get( name );
      };
      return null;
    };

    AObject.prototype.debugFlag = false;

    AObject.prototype.uniqueID  = function( header ){
      return header + AObject.uniqueID++;
    };

    AObject.prototype.toString = function() {
      return this.constructor.name;
    };


    /*
     * log thisfunction will execute logging dependingon thedebug setting.
     * Debug setting will be turned off and on globally with
     * windows.debugFlag or this.debugFlag
     * AObject is inherited to all the ESObject. so the instance of that
     * could call log function.
     *
     * ##Examples:
     *  `this.log('testint')`
     *
     * @param {String} message log message to be display at the console
     * @param {AObject} object the object that implements AObject
     * @api public
     */

    AObject.prototype.log = function( msg, obj ) {
      if( this.debugFlag ) {
        Log.log( this, msg );
      }
      if( (obj != null ? obj.debugFlag : void 0) ) {
        Log.log( obj, msg );
      }
      if( (window.debugFlag != null) ) {
        return Log.log( null, msg );
      }
    };

    AObject.prototype.get = function( name ) {
      if( name in this ) {
        return this[name];
      }
      return null;
    };

    AObject.prototype.set = function( name, value ) {
      if( name in this ) {
        this[name] = value;
      }
      return null;
    };

    return AObject;

  })();

  this.AObject.prop( "name", "", null );

}).call( com.ai );
