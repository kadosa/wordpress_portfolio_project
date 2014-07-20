// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    'model/app',
    'view/thumbnail',
    'view/header',
    'view/footer',
    'view/overlay',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/app.html',
    'handlebars'
], function(
    $,
    _,
    Backbone,
    AppModel,
    ProjectThumbnailView,
    HeaderView,
    FooterView,
    OverlayView,
    template,
    Handlebars) {
    'use strict';
    var ProjectListView = Backbone.View.extend({
        el: $('#js-application'),

        events: {
            'mouseleave .project-thumbnail': 'onMouseLeave'
        },

        projectThumbnailListView: [],

        currentHoveredProject: null,

        initialize: function() {
            _.bindAll(this,  'onMouseLeave');
            this.listenTo(AppModel, 'change:project', this.onProjectChange);
        },

        render: function() {

            var compiledTemplate = Handlebars.compile(template);
            this.$el.append(compiledTemplate);
            this.createOverlay();
            this.createHeaderView();
            this.createProjectThumbnailViews();
            this.createFooterView();
        },

        createOverlay: function() {
            this.overlayView = new OverlayView();
            this.overlayView.render();
            this.$el.append(this.overlayView.$el);
            //this.$el.append('<div class="overlay"></div>');

        },

        createHeaderView: function() {
            this.headerView = new HeaderView();
            this.headerView.render();
            this.$el.append(this.headerView.$el);
        },

        createFooterView: function() {
            this.footerView = new FooterView();
            this.footerView.render();
            this.$el.append(this.footerView.$el);
        },

        createProjectThumbnailViews: function() {
            this.$el.append('<div id="project-container"></div>');
            this.$projectContainer = this.$('#project-container');
            this.collection.each(function(project) {
                var thumbnailView = new ProjectThumbnailView({
                    model: project
                });
                thumbnailView.render();
                this.$projectContainer.append(thumbnailView.$el);
                this.projectThumbnailListView.push(thumbnailView);
            }, this);
        },

        onHover: function(e) {
            var project = this.collection.get($(e.currentTarget).data("id"));
            if (this.currentHoveredProject !== project) {
                this.currentHoveredProject = project;
                console.log(this.currentHoveredProject);
            }
        },

        onMouseLeave: function(e) {
            if (!$(e.relatedTarget).hasClass('project-thumbnail') &&
                !$(e.toElement).hasClass('project-thumbnail')) {
                    this.removeHoverFromThumbnails();
            }
        },

        removeHoverFromThumbnails: function() {
            _.each(this.projectThumbnailListView, function(thumbnailView) {
                Backbone.trigger('project:hovered', null);
                thumbnailView.removeHoverState();
            });
        }


    });
    // Our module now returns our view
    return ProjectListView;
});