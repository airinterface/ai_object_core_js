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
  var Util = com.ai.Util;
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
    AObject._uniqueId = 1;

    AObject.uniqueId = function( header ) {
      return header + AObject._uniqueId++;
    };

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

    AObject.prototype.uniqueId  = function( header ){
      return AObject.uniqueId( header );
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
