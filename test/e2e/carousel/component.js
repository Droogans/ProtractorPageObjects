'use strict';

/**
   Information about a particular slide.
 */
var Slide = function (rootElement) {
  this.rootElement = rootElement;
};

Slide.prototype.isActive = function () {
  return this.rootElement.getAttribute('class').then(function (classNames) {
    return classNames.indexOf('active') > -1;
  });
};

Object.defineProperty(Slide.prototype, 'imageHref', {
  get: function () {
    return this.rootElement.$('img').getAttribute('src');
  }
});

Object.defineProperty(Slide.prototype, 'text', {
  get: function () {
    return this.rootElement.element(by.binding('text')).getText();
  }
});

/**
   Information about all slides.
 */
var Slides = function (rootElement) {
  this.rootElement = rootElement;

  this.mappings = {
    get tblSlideIndicators() { return rootElement.$('.carousel-indicators').all(by.repeater('slide in slides')); },
    get tblSlides() { return rootElement.$('.carousel-inner').all(by.repeater('slide in slides')); }
  };
};

/**
   Will set the `slideIndex` slide to the current slide.
   The slide must be visible in order to retrieve any information about it.
 */
Slides.prototype.byIndex = function (slideIndex) {
  this.index = slideIndex;
  return new Slide(this.mappings.tblSlides.get(slideIndex));
};

Slides.prototype.count = function () {
  return this.mappings.tblSlideIndicators.count();
};

Object.defineProperty(Slides.prototype, 'index', {
  get: function () {
    return this.mappings.tblSlideIndicators.map(function (element, index) {
      return element.getAttribute('class').then(function (classes) {
        if (classes.indexOf('active') > -1) {
          return index;
        }
      });
    }).then(function (activeIndexes) {
      return activeIndexes.filter(function (i) { return i !== undefined; })[0];
    });
  },

  set: function (index) {
    return this.mappings.tblSlideIndicators.get(index).click();
  }
});

Object.defineProperty(Slides.prototype, 'activeSlide', {
  get: function () {
    return new Slide(this.rootElement.$('.carousel-inner .active'));
  }
});

/**
   Interactions with the entire carousel directive.
 */
var Carousel = function (rootElement) {
  this.rootElement = rootElement || $('.carousel');

  this.mappings = {
    get lnkPrevous() { return rootElement.$('.previous'); },
    get lnkNext() { return rootElement.$('.next'); }
  };
};

Object.defineProperty(Carousel.prototype, 'slides', {
  get: function () {
    return new Slides(this.rootElement);
  }
});

Carousel.prototype.hasPrevious = function () {
  return this.mappings.lnkPrevious.isDisplayed();
};

Carousel.prototype.hasNext = function () {
  return this.mappings.lnkNext.isDisplayed();
};

Carousel.prototype.previous = function () {
  var _this = this;
  return this.hasPrevious().then(function (hasPrevious) {
    if (hasPrevious) {
      _this.mappings.lnkPrevious.click();
    }
  });
};

Carousel.prototype.next = function () {
  var _this = this;
  return this.hasNext().then(function (hasNext) {
    if (hasNext) {
      _this.mappings.lnkNext.click();
    }
  });
};

exports.Carousel = Carousel;
