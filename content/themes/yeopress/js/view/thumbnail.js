// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    'controller/app',
    'model/app',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/project/thumbnail.html',
    'handlebars'
], function(
    $,
    _,
    Backbone,
    AppController,
    AppModel,
    thumbTemplate,
    Handlebars) {
    'use strict';
    var ProjectThumbnailView = Backbone.View.extend({
        className: 'project-thumbnail',

        events: {
            'click': 'onClick',
            'mouseover': 'onMouseOver',
            'mouseleave': 'onMouseLeave'
        },

        initialize: function() {
            _.bindAll(this, 'onClick', 'onProjectChange');
            this.listenTo(AppModel, 'change:project', this.onProjectChange);
            this.listenTo(AppModel, 'change:hoveredProject', this.onHoveredProjectChange);
            var compiledTemplate = Handlebars.compile(thumbTemplate)(this.model.toJSON());
            this.$el.append(compiledTemplate);
        },

        onClick: function() {
            if (AppController.getCurrentProject() !== this.model) {
                Backbone.trigger('project:selected', this.model);
            }
        },

        onProjectChange: function(appModel, currentProject) {
            if (currentProject === this.model) {
                console.log(this.model);
            }
        },

        onHoveredProjectChange: function(appModel, currentHoveredProject) {
            if (currentHoveredProject !== this.model) {
                this.$el.removeClass('active').addClass('inactive');
            } else {
                this.$el.removeClass('inactive').addClass('active');
            }
        },

        onMouseOver: function() {
            if (AppController.getHoveredProject() !== this.model) {
                Backbone.trigger('project:hovered', this.model);
            }

        },

        removeHoverState: function() {
            this.$el.removeClass('active inactive');
        }
    });
    // Our module now returns our view
    return ProjectThumbnailView;
});