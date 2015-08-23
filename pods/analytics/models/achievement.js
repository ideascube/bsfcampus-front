define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config'
    ],
    function ($, _, Backbone, Config) {

        return Backbone.Model.extend({

            process: function () {
                var resource, skill, track;
                var tracksCollection = require('tracksCollection');
                var skillsCollection = require('skillsCollection');
                var resourcesCollection = require('resourcesCollection');
                switch (this.get('_cls').split('.').pop()) {
                    case 'CompletedResource':
                        resource = resourcesCollection.getOrInstantiate(this.get('resource'));
                        resource._isValidated = true;
                        resource.trigger('change', resource);
                        resource.trigger('completed');
                        break;
                    case 'CompletedSkill':
                        skill = skillsCollection.getOrInstantiate(this.get('skill'));
                        skill._isValidated = true;
                        skill.trigger('change', skill);
                        skill.trigger('completed');
                        break;
                    case 'CompletedTrack':
                        track = tracksCollection.getOrInstantiate(this.get('track'));
                        track._isValidated = true;
                        track.trigger('change', track);
                        track.trigger('completed');
                        break;
                    case 'StartedTrack':
                        track = tracksCollection.getOrInstantiate(this.get('track'));
                        track._isStarted = true;
                        track.trigger('change', track);
                        track.trigger('started');
                        break;
                    case 'UnlockedTrackTest':
                        track = tracksCollection.getOrInstantiate(this.get('track'));
                        track._testIsUnlocked = true;
                        track.trigger('change', track);
                        track.trigger('unlockedTest');
                        break;
                }
            }

        });

    }
);

