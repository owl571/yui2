(function() {
    var Lang = YAHOO.util.Lang;

    /*
    Copyright (c) 2006, Yahoo! Inc. All rights reserved.
    Code licensed under the BSD License:
    http://developer.yahoo.net/yui/license.txt
    */
    
    /**
     * Provides and manages YAHOO.util.Attribute instances
     * @namespace YAHOO.util
     * @class AttributeProvider
     * @uses YAHOO.util.EventProvider
     */
    YAHOO.util.AttributeProvider = function() {};
    
    YAHOO.util.AttributeProvider.prototype = {
        
        /**
         * A key-value map of Attribute configurations
         * @property _configs
         * @protected (may be used by subclasses and augmentors)
         * @private
         * @type {Object}
         */
        _configs: null,
        /**
         * Returns the current value of the attribute.
         * @method get
         * @param {String} key The attribute whose value will be returned.
         */
        get: function(key){
            var configs = this._configs || {};
            var config = configs[key];
            
            if (!config) {
                YAHOO.log(key + ' not found', 'error', 'AttributeProvider');
                return undefined;
            }
            
            return config.value;
        },
        
        /**
         * Sets the value of a config.
         * @method set
         * @param {String} key The name of the attribute
         * @param {Any} value The value to apply to the attribute
         * @param {Boolean} silent Whether or not to suppress change events
         * @return {Boolean} Whether or not the value was set.
         */
        set: function(key, value, silent){
            var configs = this._configs || {};
            var config = configs[key];
            
            if (!config) {
                YAHOO.log('set failed: ' + key + ' not found',
                        'error', 'AttributeProvider');
                return false;
            }
            
            return config.setValue(value, silent);
        },
    
        /**
         * Returns an array of attribute names.
         * @method getAttributeKeys
         * @return {Array} An array of attribute names.
         */
        getAttributeKeys: function(){
            var configs = this._configs;
            var keys = [];
            var config;
            for (var key in configs) {
                config = configs[key];
                if ( configs.hasOwnProperty(key) && 
                        !Lang.isUndefined(config) ) {
                    keys[keys.length] = key;
                }
            }
            
            return keys;
        },
        
        /**
         * Sets multiple attribute values.
         * @method setAttributes
         * @param {Object} map  A key-value map of attributes
         * @param {Boolean} silent Whether or not to suppress change events
         */
        setAttributes: function(map, silent){
            for (var key in map) {
                if ( map.hasOwnProperty(key) ) {
                    this.set(key, map[key], silent);
                }
            }
        },
    
        /**
         * Resets the specified attribute's value to its initial value.
         * @method resetValue
         * @param {String} key The name of the attribute
         * @param {Boolean} silent Whether or not to suppress change events
         * @return {Boolean} Whether or not the value was set
         */
        resetValue: function(key, silent){
            var configs = this._configs || {};
            if (configs[key]) {
                this.set(key, configs[key]._initialConfig.value, silent);
                return true;
            }
            return false;
        },
    
        /**
         * Sets the attribute's value to its current value.
         * @method refresh
         * @param {String | Array} key The attribute(s) to refresh
         * @param {Boolean} silent Whether or not to suppress change events
         */
        refresh: function(key, silent){
            var configs = this._configs;
            
            key = ( ( Lang.isString(key) ) ? [key] : key ) || 
                    this.getAttributeKeys();
            
            for (var i = 0, len = key.length; i < len; ++i) { 
                if ( // only set if there is a value and not null
                    configs[key[i]] && 
                    ! Lang.isUndefined(configs[key[i]].value) &&
                    ! Lang.isNull(configs[key[i]].value) ) {
                    configs[key[i]].refresh(silent);
                }
            }
        },
    
        /**
         * Adds an Attribute to the AttributeProvider instance. 
         * @method register
         * @param {String} key The attribute's name
         * @param {Object} map A key-value map containing the
         * attribute's properties.
         */
        register: function(key, map) {
            this._configs = this._configs || {};
            
            if (this._configs[key]) { // dont override
                return false;
            }
            
            map.name = key;
            this._configs[key] = new YAHOO.util.Attribute(map, this);
            return true;
        },
        
        /**
         * Returns the attribute's properties.
         * @method getAttributeConfig
         * @param {String} key The attribute's name
         * @private
         * @return {object} A key-value map containing all of the
         * attribute's properties.
         */
        getAttributeConfig: function(key) {
            var configs = this._configs || {};
            var config = configs[key] || {};
            var map = {}; // returning a copy to prevent overrides
            
            for (key in config) {
                if ( config.hasOwnProperty(key) ) {
                    map[key] = config[key];
                }
            }
    
            return map;
        },
        
        /**
         * Sets or updates an Attribute instance's properties. 
         * @method configureAttribute
         * @param {String} key The attribute's name.
         * @param {Object} map A key-value map of attribute properties
         * @param {Boolean} init Whether or not this should become the intial config.
         */
        configureAttribute: function(key, map, init) {
            var configs = this._configs || {};
            
            if (!configs[key]) {
                YAHOO.log('unable to configure, ' + key + ' not found',
                        'error', 'AttributeProvider');
                return false;
            }
            
            configs[key].configure(map, init);
        },
        
        /**
         * Resets an attribute to its intial configuration. 
         * @method resetAttributeConfig
         * @param {String} key The attribute's name.
         * @private
         */
        resetAttributeConfig: function(key){
            var configs = this._configs || {};
            configs[key].resetConfig();
        },
        
        /**
         * Fires the attribute's beforeChange event. 
         * @method fireBeforeChangeEvent
         * @param {String} key The attribute's name.
         * @param {Obj} e The event object to pass to handlers.
         */
        fireBeforeChangeEvent: function(e) {
            var type = 'before';
            type += e.type.charAt(0).toUpperCase() + e.type.substr(1) + 'Change';
            e.type = type;
            return this.fireEvent(e.type, e);
        },
        
        /**
         * Fires the attribute's change event. 
         * @method fireChangeEvent
         * @param {String} key The attribute's name.
         * @param {Obj} e The event object to pass to the handlers.
         */
        fireChangeEvent: function(e) {
            e.type += 'Change';
            return this.fireEvent(e.type, e);
        }
    };
    
    YAHOO.augment(YAHOO.util.AttributeProvider, YAHOO.util.EventProvider);
})();

