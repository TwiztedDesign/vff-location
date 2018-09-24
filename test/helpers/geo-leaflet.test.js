import geoHelpers from '../../src/helpers/geo-leaflet';


describe('Leaflet helper', () => {
    beforeEach(() => {
        // document.body.innerHTML = '';
        // vffData.clear();
    });

    it('should create bounds', () => {

        // Arrange
        let points = [];
        // Act
        let bounds = geoHelpers.getBound(points);

        // Assert

        // let element = htmlToElement('<h1 vff-template="test-template" vff-name="test-control"></h1>');
        // element.innerText = 'Title';
        // element.style.color = 'red';
        // document.body.appendChild(element);
        // _init();
        // expect(vffData.getTemplate('test-template')).toBeDefined();
        // expect(vffData.getTemplate('test-template')['test-control text']).toBe('Title');
        // expect(vffData.getTemplate('test-template')['test-control color']).toBe('red');
    });

    it('should failed to create bounds', () => {

    });

});