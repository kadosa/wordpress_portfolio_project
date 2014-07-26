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
    'view/project',
    'view/logo',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/app.html',
    'handlebars',
    'tweenlite',
    'scrollto'
], function(
    $,
    _,
    Backbone,
    AppModel,
    ProjectThumbnailView,
    HeaderView,
    FooterView,
    OverlayView,
    ProjectView,
    LogoView,
    template,
    Handlebars,
    TweenLite) {
    'use strict';
    var ProjectListView = Backbone.View.extend({
        el: $('#js-application'),

        events: {
            'mouseleave .project-thumbnail': 'onMouseLeave'
        },

        projectThumbnailListView: [],

        currentProjectView: null,

        currentHoveredProject: null,

        topOffset: null,

        initialize: function() {
            _.bindAll(this, 'onMouseLeave');
            this.listenTo(AppModel, 'change:project', this.onProjectChange);
            this.listenTo(Backbone, 'page:navigatedto', this.onPageNavigatedTo);
            this.topOffset = $(window).height() - 100;
        },

        render: function() {

            var compiledTemplate = Handlebars.compile(template);
            this.$el.append(compiledTemplate);
            this.createOverlay();
            this.createHeaderView();
            this.createLogo();
            this.createProjectThumbnailViews();
            this.createFooterView();
            this.setupWayPoints();
        },

        createLogo: function() {
            this.logoView = new LogoView();
            this.logoView.render();
            this.$el.append(this.logoView.$el);
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
            this.footerView = new FooterView({
                model: new Backbone.Model(this.model.get('about'))
            });
            this.footerView.render();
            this.footerView.$el.css({
                top: this.topOffset + this.$projectContainer.height()
            });
            this.$el.append(this.footerView.$el);
        },

        createProjectThumbnailViews: function() {
            this.$el.append('<div id="project-container"></div>');
            this.$projectContainer = this.$('#project-container');
            this.$projectContainer.css({
                top: this.topOffset
            });
            this.collection.each(function(project) {
                var thumbnailView = new ProjectThumbnailView({
                    model: project
                });
                thumbnailView.render();
                this.$projectContainer.append(thumbnailView.$el);
                this.projectThumbnailListView.push(thumbnailView);
            }, this);
        },

        createCurrentProjectView: function(currentProject) {
            this.currentProjectView = new ProjectView({
                model: currentProject
            });
            this.$el.append(this.currentProjectView.$el);
            this.currentProjectView.render();
        },

        updateCurrentProjectView: function(currentProject) {
            this.currentProjectView.model = currentProject;
            this.currentProjectView.render();
        },

        hideCurrentProjectView: function() {
            this.currentProjectView.out();
        },

        hideProjectContainer: function() {
            this.$projectContainer.hide();
        },

        showProjectContainer: function() {
            this.$projectContainer.show();
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
        },

        /**
         * When a new project is selected, or the current one is closed,
         * kick off the page transitions.
         *
         * @param  {[type]} AppModel       [description]
         * @param  {[type]} currentProject [description]
         * @return {[type]}                [description]
         */
        onProjectChange: function(AppModel, currentProject) {
            if (currentProject) {
                this.hideProjectContainer();
                if (!this.currentProjectView) {
                    this.createCurrentProjectView(currentProject);
                } else {
                    this.updateCurrentProjectView(currentProject);
                }
            } else {
                this.hideCurrentProjectView();
                this.showProjectContainer();
            }
        },

        /**
         * Navigate to the proper section.
         * @param  {[type]} AppModel    [description]
         * @param  {[type]} currentPage [description]
         * @return {[type]}             [description]
         */
        onPageNavigatedTo: function(url) {
            switch (url) {
                case 'home':
                    TweenLite.to(window, 0.4, {
                        scrollTo: {
                            y: 0
                        },
                        ease: Expo.easeOut
                    });
                    break;
                case 'work':
                    TweenLite.to(window, 0.4, {
                        scrollTo: {
                            y: this.$projectContainer.offset().top
                        },
                        ease: Expo.easeOut
                    });
                    break;
                case 'about':
                    TweenLite.to(window, 0.4, {
                        scrollTo: {
                            y: this.footerView.$el.offset().top
                        },
                        ease: Expo.easeOut
                    });
                    break;
            }
        },

        setupWayPoints: function() {
            this.footerView.$el.waypoint(function(direction) {
                console.log('footer', direction);
                if (direction === 'down' && AppModel.get('currentPage') !== 'about') {
                    Backbone.trigger('page:scrolledto', 'about');
                }
            });

            this.$projectContainer.waypoint(function(direction) {
                console.log('work', direction);
                if (AppModel.get('currentPage') !== 'work') {
                    Backbone.trigger('page:scrolledto', 'work');
                }
            });
        }

    });
    // Our module now returns our view
    return ProjectListView;
});