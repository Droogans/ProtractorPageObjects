var Carousel = require('./component').Carousel;

describe('Carousel', function () {
  var carousel;

  it('should go there', function () {
    browser.get(browser.baseUrl);
    carousel = new Carousel();
  });

  it('should have four slides by default', function () {
      expect(carousel.slides.count()).toEqual(4);
  });

});
