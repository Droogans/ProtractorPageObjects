'use strict';

// Information about the current slide.
var Slides = function (rootElement) {
  var _this = this;
  this.rootElement = rootElement;

  this.mappings = {
    get tblSlides() { return rootElement.all(by.repeater('slide in slides')); }
  };

  Object.defineProperty(this, 'index', {
    get: function () {
      return mappings.tblSlides.each(function (element, index) {
        return element.getAttribute('class').then(function (classes) {
          if (classes.indexOf('active') > -1) {
            return index;
          }
        });
      });
    },

    set: function (index) {
      return rootElement.all(by.repeater('slide in slides')).get(index).click();
    }
  });

  this.count = function () {
    return _this.mappings.tblSlides.count();
  }

};

// Interactions with the entire carousel directive.
var Carousel = function (rootElement) {
  var _this = this;
  this.rootElement = rootElement || $('.carousel');

  this.mappings = {
    get lnkPrevous() { return rootElement.$('.previous'); },
    get lnkNext() { return rootElement.$('.next'); }
  };

  this.slides = new Slides(rootElement.$('.carousel-indicators'));

  this.hasPrevious = function () {
    return _this.mappings.lnkPrevious.isDisplayed();
  }

  this.hasNext = function () {
    return _this.mappings.lnkNext.isDisplayed();
  }

  this.previous = function () {
    return _this.hasPrevious().then(function (hasPrevious) {
      if (hasPrevious) {
        mappings.lnkPrevious.click();
      }
    });
  };

  this.next = function () {
    return _this.hasNext().then(function (hasNext) {
      if (hasNext) {
        mappings.lnkNext.click();
      }
    });
  };

};

exports.Carousel = Carousel;
