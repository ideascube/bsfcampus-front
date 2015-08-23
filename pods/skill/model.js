define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',

        'pods/lesson/model',
        'pods/lesson/collections/skill'
    ],
    function ($, _, Backbone, Config,
              AbstractModel,
              LessonModel, SkillLessonsCollection) {

        return AbstractModel.extend({

            serverPath: '/hierarchy/skills',

            parse: function (response) {
                response = AbstractModel.prototype.parse.apply(this, arguments);

                if (response.track) {
                    var tracksCollection = require('tracksCollection');
                    var track = tracksCollection.get(response.track);
                    if (!track) {
                        var TrackModel = require('pods/track/model');
                        track = new TrackModel({data: response.track}, {parse:true});
                        tracksCollection.add(track);
                    }
                    response.track = track;
                }

                var collection = this.get('lessons') || new SkillLessonsCollection([], {skill: this});
                if (response.lessons) {
                    _.each(response.lessons, function(lesson){
                        var model = new LessonModel({data: lesson}, {parse: true});
                        collection.add(model);
                    }, this);
                    collection.minimumFilled = true;
                }
                response.lessons = collection;

                return response;
            },

            _isValidated: null,

            isValidated: function () {
                if (this._isValidated == null) {
                    this._isValidated = this.get('is_validated');
                }
                return this._isValidated;
            },

            route: function () {
                return '#skill/' + this.id;
            },

            toJSON: function (forTemplate) {
                var json = AbstractModel.prototype.toJSON.call(this, forTemplate);
                if (forTemplate === true) {
                    json.is_validated = this.isValidated();
                }
                return json;
            }

        });

    }
);
