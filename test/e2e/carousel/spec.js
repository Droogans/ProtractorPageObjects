'use strict';

var Carousel = require('./component').Carousel;

describe('Carousel', function () {
  var carousel;

  it('should go there', function () {
    browser.get(browser.baseUrl);
    carousel = new Carousel();
    browser.sleep(1000);
  });

  it('should have four slides by default', function () {
    expect(carousel.slides.count()).toEqual(4);
  });

  it('should go to a slide', function () {
    carousel.slides.index = 3;
    expect(carousel.slides.index).toEqual(3);
  });

  it('should have an active slide', function () {
    carousel.slides.index = 2;
    expect(carousel.slides.activeSlide.text).toEqual('Surplus Cutes');
  });

  describe('single slide', function () {
    var slide;

    beforeAll(function () {
      slide = carousel.slides.byIndex(2);
    });

    it('should be the active slide', function () {
      expect(slide.isActive()).toBe(true);
    });

    it('should get a slide by index', function () {
      expect(slide.text).toEqual('Lots of Felines');
    });

  });

});
