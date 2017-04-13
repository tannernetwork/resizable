/*!
 * resizable 1.0.1
 * https://github.com/tannernetwork/resizable
 *
 * Copyright 2015-2017 Tanner (http://tanner.zone)
 * Released under the MIT license
 */

(function ($) {
 
    $.fn.resizable = function(options) {
 
        var settings = $.extend({
            direction: ['top', 'right', 'bottom', 'left']
        }, options);
        var current = null;

        return this.each(function() {
            var _this = this;
            var element = $(this);
            var isDragging = false;
            var initial = {};
            var prepareHandles = {
                top: false,
                right: false,
                bottom: false,
                left: false
            };
            var handles = {};

            element.addClass('resizable');

            if(settings.direction instanceof Array)
            {
                for (var i = settings.direction.length - 1; i >= 0; i--) {
                    switch(settings.direction[i])
                    {
                        case 'top':
                        case 't':
                        prepareHandles.top = true;
                        break;
                        case 'right':
                        case 'r':
                        prepareHandles.right = true;
                        break;
                        case 'bottom':
                        case 'b':
                        prepareHandles.bottom = true;
                        break;
                        case 'left':
                        case 'l':
                        prepareHandles.left = true;
                        break;
                    }
                };
            }
            else if(typeof settings.direction == 'string')
            {
                switch(settings.direction)
                {
                    case 'vertical':
                    case 'v':
                    prepareHandles.top = true;
                    prepareHandles.bottom = true;
                    break;
                    case 'horizontal':
                    case 'h':
                    prepareHandles.right = true;
                    prepareHandles.left = true;
                    break;
                    case 'top':
                    case 't':
                    prepareHandles.top = true;
                    break;
                    case 'right':
                    case 'r':
                    prepareHandles.right = true;
                    break;
                    case 'bottom':
                    case 'b':
                    prepareHandles.bottom = true;
                    break;
                    case 'left':
                    case 'l':
                    prepareHandles.left = true;
                    break;
                }
            }

            if(prepareHandles.top)
            {
                handles.top = $('<div />').addClass('resizable-handle resizable-t').appendTo(element);
            }
            if(prepareHandles.right)
            {
                handles.right = $('<div />').addClass('resizable-handle resizable-r').appendTo(element);
            }
            if(prepareHandles.bottom)
            {
                handles.bottom = $('<div />').addClass('resizable-handle resizable-b').appendTo(element);
            }
            if(prepareHandles.left)
            {
                handles.left = $('<div />').addClass('resizable-handle resizable-l').appendTo(element);
            }
            
            $(this).children('.resizable-l, .resizable-r, .resizable-t, .resizable-b').mousedown(function(e) {
                current = _this;
                var dir;
                switch(true)
                {
                    case $(this).hasClass('resizable-l'):
                    dir = 'l';
                    break;
                    case $(this).hasClass('resizable-r'):
                    dir = 'r';
                    break;
                    case $(this).hasClass('resizable-t'):
                    dir = 't';
                    break;
                    case $(this).hasClass('resizable-b'):
                    dir = 'b';
                    break;
                }
                isDragging = true;
                initial = {
                    x: e.clientX,
                    y: e.clientY,
                    height: element.height(),
                    width: element.width(),
                    direction: dir
                };

                $('html').addClass('resizable-resizing resizable-resizing-'+initial.direction);

                if (current == _this && typeof settings.start === 'function') {
                    settings.start.apply(_this);
                }
            });

            $(window).mousemove(function(e) {
                if(isDragging)
                {
                    var moveX = e.clientX-initial.x;
                    var moveY = e.clientY-initial.y;

                    switch(initial.direction)
                    {
                        case 'r':
                        element.width(initial.width+moveX);
                        break;
                        case 'l':
                        element.width(initial.width-moveX);
                        break;
                        case 'b':
                        element.height(initial.height+moveY);
                        break;
                        case 't':
                        element.height(initial.height-moveY);
                        break;
                    }

                    if (current == _this && typeof settings.resize === 'function') {
                        settings.resize.apply(_this);
                    }
                }
            }).mouseup(function(e) {
                isDragging = false;
                $('html').removeClass('resizable-resizing resizable-resizing-'+initial.direction);

                if (current == _this && typeof settings.stop === 'function') {
                    settings.stop.apply(_this);
                }
                _current = null;
            });

        });

    }
 
}(jQuery));