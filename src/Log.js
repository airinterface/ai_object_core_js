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
