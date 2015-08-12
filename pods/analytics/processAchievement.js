define(
    [
        'jquery',
        'underscore',
        'backbone',
        'ds',
        'app/config'
    ],
    function ($, _, Backbone, DS, Config) {

        return function (achievement) {
            switch(achievement.get('_cls').split('.').pop()) {
                case 'CompletedResource':
                    var resourceId = achievement.get('resource')._id;
                    var resource = DS.get(Config.constants.dsResourceNames.RESOURCES, resourceId);
                    if (resource) {
                        resource._isValidated = true;
                        resource.trigger('change');
                    }
                    break;
                case 'CompletedSkill':
                    var skillId = achievement.get('skill')._id;
                    var skill = DS.get(Config.constants.dsResourceNames.SKILLS, skillId);
                    if (skill) {
                        skill._isValidated = true;
                        skill.trigger('change');
                    }
                    break;
                case 'CompletedTrack':
                    var completedTrackId = achievement.get('track')._id;
                    var completedTrack = DS.get(Config.constants.dsResourceNames.TRACKS, completedTrackId);
                    if (completedTrack) {
                        completedTrack._isValidated = true;
                        completedTrack.trigger('change');
                    }
                    break;
                case 'StartedTrack':
                    var startedTrackId = achievement.get('track')._id;
                    var startedTrack = DS.get(Config.constants.dsResourceNames.TRACKS, startedTrackId);
                    if (startedTrack) {
                        startedTrack._isStarted = true;
                        startedTrack.trigger('change');
                    }
                    break;
                case 'UnlockedTrackTest':
                    var unlockedTestTrackId = achievement.get('track')._id;
                    var unlockedTestTrack = DS.get(Config.constants.dsResourceNames.TRACKS, unlockedTestTrackId);
                    if (unlockedTestTrack) {
                        unlockedTestTrack._testIsUnlocked = true;
                        unlockedTestTrack.trigger('change');
                    }
                    break;
            }
        }

    }
);
