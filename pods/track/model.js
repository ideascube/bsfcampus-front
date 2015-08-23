define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',

        'pods/skill/model',
        'pods/skill/collections/track'
    ],
    function ($, _, Backbone, Config,
              AbstractModel,
              SkillModel, TrackSkillsCollection) {

        return AbstractModel.extend({

            serverPath: '/hierarchy/tracks',

            parse: function(response) {
                response = AbstractModel.prototype.parse.apply(this, arguments);

                var collection = this.get('skills') || new TrackSkillsCollection([], {track: this});
                if (response.skills) {
                    _.each(response.skills, function(skill){
                        var model = new SkillModel({data: skill}, {parse: true});
                        collection.add(model);
                    }, this);
                    collection.minimumFilled = true;
                }
                response.skills = collection;

                return response;
            },

            _isValidated: null,

            isValidated: function () {
                if (this._isValidated == null) {
                    this._isValidated = this.get('is_validated');
                }
                return this._isValidated;
            },

            _isStarted: null,

            isStarted: function () {
                if (this._isStarted == null) {
                    this._isStarted = this.get('is_started');
                }
                return this._isStarted;
            },

            _testIsUnlocked: null,

            testIsUnlocked: function () {
                if (this._testIsUnlocked == null) {
                    this._testIsUnlocked = this.get('test_is_unlocked');
                }
                return this._testIsUnlocked;
            },

            route: function () {
                return '#track/' + this.id;
            },

            toJSON: function (forTemplate) {
                var json = AbstractModel.prototype.toJSON.call(this, forTemplate);
                if (forTemplate === true) {
                    json.is_validated = this.isValidated();
                    json.is_started = this.isStarted();
                    json.test_is_unlocked = this.testIsUnlocked();
                }
                return json;
            }

        });

    }
);
