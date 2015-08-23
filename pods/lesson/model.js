define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',

        'pods/resource/model',
        'pods/resource/collections/lesson'
    ],
    function ($, _, Backbone, Config,
              AbstractModel,
              ResourceModel, LessonResourcesCollection) {

        return AbstractModel.extend({

            serverPath: '/hierarchy/lessons',

            parse: function (response) {
                response = AbstractModel.prototype.parse.apply(this, arguments);

                if (response.skill) {
                    var skillsCollection = require('skillsCollection');
                    var skill = skillsCollection.get(response.skill);
                    if (!skill) {
                        var SkillModel = require('pods/skill/model');
                        skill = new SkillModel({data: response.skill}, {parse: true});
                        skillsCollection.add(skill);
                    }
                    response.skill = skill;
                }

                var collection = this.get('resources') || new LessonResourcesCollection([], {lesson: this});
                if (response.resources) {
                    _.each(response.resources, function(resource){
                        var model = new ResourceModel({data: resource}, {parse: true});
                        collection.add(model);
                    }, this);
                    collection.minimumFilled = true;
                }
                response.resources = collection;

                return response;
            },

            route: function () {
                return '#lesson/' + this.id;
            }

        });

    }
);
