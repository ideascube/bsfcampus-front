define(
    [
        'jquery',
        'underscore',
        'backbone',
        'ds',
        'app/config'
    ],
    function ($, _, Backbone, DS, Config) {

        return Backbone.Model.extend({

            process: function () {
                switch (this.get('_cls').split('.').pop()) {
                    case 'CompletedResource':
                        var resourceId = this.get('resource')._id;
                        var resource = DS.get(Config.constants.dsResourceNames.RESOURCES, resourceId);
                        if (resource) {
                            resource._isValidated = true;
                            resource.trigger('change', resource);
                            // For some reason we need to pass the model as an argument to the callback
                            // Otherwise a bug occurs in the collection's change event
                        }
                        break;
                    case 'CompletedSkill':
                        var skillId = this.get('skill')._id;
                        var skill = DS.get(Config.constants.dsResourceNames.SKILLS, skillId);
                        if (skill) {
                            skill._isValidated = true;
                            skill.trigger('change', skill);
                        }
                        break;
                    case 'CompletedTrack':
                        var completedTrackId = this.get('track')._id;
                        var completedTrack = DS.get(Config.constants.dsResourceNames.TRACKS, completedTrackId);
                        if (completedTrack) {
                            completedTrack._isValidated = true;
                            completedTrack.trigger('change', completedTrack);
                        }
                        break;
                    case 'StartedTrack':
                        var startedTrackId = this.get('track')._id;
                        var startedTrack = DS.get(Config.constants.dsResourceNames.TRACKS, startedTrackId);
                        if (startedTrack) {
                            startedTrack._isStarted = true;
                            startedTrack.trigger('change', startedTrack);
                        }
                        break;
                    case 'UnlockedTrackTest':
                        var unlockedTestTrackId = this.get('track')._id;
                        var unlockedTestTrack = DS.get(Config.constants.dsResourceNames.TRACKS, unlockedTestTrackId);
                        if (unlockedTestTrack) {
                            unlockedTestTrack._testIsUnlocked = true;
                            unlockedTestTrack.trigger('change', unlockedTestTrack);
                        }
                        break;
                }
            }

        });

    }
);

