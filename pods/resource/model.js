define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',
        'model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection, AbstractModel) {

        var ResourceModel = AbstractModel.extend({

            serverPath: '/resources',

            initialize: function () {
                var self = this;
                this.listenTo(this, 'completed', function () {
                    var skill = self.skill();
                    if (skill) {
                        skill.fetch();
                    }
                });
            },

            parse: function (response) {
                response = AbstractModel.prototype.parse.apply(this, arguments);

                if (response.parent) {
                    switch (response.parent._cls.split('.').pop()) {
                        case 'Lesson':
                            var lessonsCollection = require('lessonsCollection');
                            var lesson = lessonsCollection.get(response.parent);
                            if (!lesson) {
                                var LessonModel = require('pods/lesson/model');
                                lesson = new LessonModel({data: response.parent}, {parse: true});
                                lessonsCollection.add(lesson);
                            }
                            response.lesson = response.parent = lesson;
                            break;
                        case 'Track':
                            var tracksCollection = require('tracksCollection');
                            var track = tracksCollection.get(response.parent);
                            if (!track) {
                                var TrackModel = require('pods/track/model');
                                track = new TrackModel({data: response.parent}, {parse: true});
                                tracksCollection.add(track);
                            }
                            response.track = response.parent = track;
                            break;
                    }
                }

                if (response.parent_resource) {

                }

                if (response.is_additional === false) {
                    var collection = this.get('additional_resources') || new AdditionalResourcesCollection([], {mainResource: this});
                    if (response.additional_resources) {
                        _.each(response.additional_resources, function (additionalResource) {
                            var model = new AdditionalResourceModel({data: additionalResource}, {parse: true});
                            collection.add(model);
                        }, this);
                        collection.minimumFilled = true;
                    }
                    response.additional_resources = collection;
                }

                return response;
            },

            _isValidated: null,

            isValidated: function () {
                if (this._isValidated == null) {
                    this._isValidated = this.get('is_validated');
                }
                return this._isValidated;
            },

            hierarchyUrl: function () {
                return this.url() + '/hierarchy';
            },

            skill: function () {
                var lesson = this.get('lesson');
                var LessonModel = require('pods/lesson/model');
                if (lesson instanceof LessonModel && lesson.fetched) {
                    return lesson.get('skill');
                }
                return null;
            },

            track: function () {
                var skill = this.skill();
                if (skill) {
                    return skill.get('track');
                }
                return null;
            },

            route: function () {
                var skill;
                if (skill = this.skill()) {
                    return skill.route() + '/resource/' + this.id;
                }
                if (this.get('is_additional')) {
                    return '#additional_resource/' + this.id;
                }
                return '#resource/' + this.id;
            },

            toJSON: function (forTemplate) {

                var json = AbstractModel.prototype.toJSON.call(this, forTemplate);

                if (forTemplate === true) {

                    json.is_validated = this.isValidated();

                    var cls = this.get('_cls').split('.').pop();

                    switch (cls) {
                        case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
                            if (this.isValidated()) {
                                json.icon_url = Config.imagesDict.resourceIconOn.RICH_TEXT;
                            } else {
                                json.icon_url = Config.imagesDict.resourceIconOff.RICH_TEXT;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
                        case Config.stringsDict.RESOURCE_TYPE.VIDEO:
                            if (this.isValidated()) {
                                json.icon_url = Config.imagesDict.resourceIconOn.VIDEO;
                            } else {
                                json.icon_url = Config.imagesDict.resourceIconOff.VIDEO;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
                            if (this.isValidated()) {
                                json.icon_url = Config.imagesDict.resourceIconOn.EXERCISE;
                            } else {
                                json.icon_url = Config.imagesDict.resourceIconOff.EXERCISE;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.AUDIO:
                            if (this.isValidated()) {
                                json.icon_url = Config.imagesDict.resourceIconOn.AUDIO;
                            } else {
                                json.icon_url = Config.imagesDict.resourceIconOff.AUDIO;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
                            if (this.isValidated()) {
                                json.icon_url = Config.imagesDict.resourceIconOn.DOWNLOADABLE_FILE;
                            } else {
                                json.icon_url = Config.imagesDict.resourceIconOff.DOWNLOADABLE_FILE;
                            }
                            break;
                    }

                }

                return json;

            }

        });

        var AdditionalResourceModel = ResourceModel.extend({});

        var AdditionalResourcesCollection = AbstractCollection.extend({

            model: AdditionalResourceModel,

            mainResource: null,

            initialize: function (models, options) {
                options || (options = {});
                this.mainResource = options.mainResource;
            },

            add: function (models, options) {
                var resourcesCollection = require('resourcesCollection');
                var addedModels = resourcesCollection.add(models, options);
                return AbstractCollection.prototype.add.call(this, addedModels, options);
            }

        });

        return ResourceModel;

    }
);
