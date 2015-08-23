define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/analytics/models/achievement'
    ],
    function ($, _, Backbone, Config,
              AchievementModel) {

        return Backbone.Model.extend({

            idAttribute: '_id',

            minimumFilled: false,
            fetched: false,
            fetching: false,

            set: function(key, val, options) {
                var rv = Backbone.Model.prototype.set.apply(this, arguments);

                var attrs;
                if (typeof key === 'object') {
                    attrs = key;
                } else {
                    (attrs = {})[key] = val;
                }
                if (!(Object.keys(attrs).length == 1 && this.idAttribute in attrs)) {
                    this.minimumFilled = true;
                }

                return rv;
            },

            clear: function(options) {
                this.fetched = null;
                return Backbone.Model.prototype.clear.apply(this, arguments);
            },

            markFetched: function(when, options) {
                this.fetching = false;
                when || (when = _.now());
                options || (options = {});
                this.fetched = when;
                if (!options.silent) {
                    this.trigger('fetch');
                }
            },

            fetch: function(options) {
                if (this.fetching) {
                    var self = this;
                    var dfd = $.Deferred();
                    this.listenTo(this, 'fetch', function(){
                        dfd.resolve().promise(self);
                    });
                    return dfd;
                }
                this.fetching = true;
                options || (options = {});
                var success = options.success;
                options.success = function(model, response, xhrOptions) {
                    model.markFetched(null, xhrOptions);
                    if (success) success.call(this, model, response, xhrOptions);
                };
                return Backbone.Model.prototype.fetch.call(this, options);
            },

            fetchIfNeeded: function(options) {
                if (this.fetched) {
                    return $.Deferred().resolve().promise(this);
                } else {
                    return this.fetch(options);
                }
            },

            processAchievements: function (response) {
                if (response.achievements) {
                    var achievements = new Backbone.Collection(
                        this.recursiveNormalize(response.achievements),
                        {model: AchievementModel}
                    );
                    achievements.each(function (achievement) {
                        achievement.process()
                    });
                }
            },

            parse: function (response, options) {
                options || (options = {});

                this.processAchievements(response);

                if (!options.collection && !options.merge) {
                    var jsonKey = options.jsonKey || this.jsonKey || 'data';
                    response = response[jsonKey];
                }

                response = this.recursiveNormalize(response);

                return response;
            },

            recursiveNormalize: function (obj) {

                // Normalize the payload to convert BSON to JSON.
                // Go through the entire object recursively,
                // and transform special types (ObjectId, Date) to strings.

                if (obj === null) {
                    return null;
                }

                if (obj.constructor === Array) {
                    // If this is an array, normalize each element

                    return _.map(obj, function (value) {
                        return this.recursiveNormalize(value);
                    }, this);


                } else if (obj.constructor === Object) {
                    // If this is an object, normalize each element

                    var keys = Object.keys(obj);

                    // Detect ObjectIds and Dates, then extract the relevant value.
                    if (keys.length === 1) {
                        if (keys[0] === "$oid") {
                            return obj[keys[0]];
                        } else if (keys[0] === "$date") {
                            return obj[keys[0]];
                        }
                    }

                    // If this was not a special type, proceed with all keys.
                    return _.object(
                        _.map(obj, function (value, key) {
                            return [key, this.recursiveNormalize(value)];
                        }, this)
                    );

                } else {

                    return obj;

                }
            },

            toJSON: function (forTemplate) {
                var json = Backbone.Model.prototype.toJSON.call(this);
                if (forTemplate === true) {
                    json.id = json._id;
                    json.route = _.result(this, 'route', null);
                }
                return json;
            },

            serverPath: '',

            urlRoot: function () {
                return Config.constants.serverGateway + _.result(this, 'serverPath', '');
            }

        });

    }
);