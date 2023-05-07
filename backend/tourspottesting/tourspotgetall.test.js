const TourSpot = require('../models/tourspot');

describe('TourSpot Model', () => {
  it('should create a TourSpot instance', () => {
    const tourspotData = {
      title: 'TourSpot 1',
      maindescription: 'Main Description',
      description: 'Description',
      image: 'image-url.jpg',
      image1: 'image1-url.jpg',
      price: '10',
      NoTickets: '100',
      Address: 'Address 1',
      Address1: 'Address 2',
      user: '64548a4abb10df9af6d116e5',
    };

    const tourspot = new TourSpot(tourspotData);

    // Assert that the TourSpot instance has the correct properties
    expect(tourspot.title).toBe(tourspotData.title);
    expect(tourspot.maindescription).toBe(tourspotData.maindescription);
    expect(tourspot.description).toBe(tourspotData.description);
    expect(tourspot.image).toBe(tourspotData.image);
    expect(tourspot.image1).toBe(tourspotData.image1);
    expect(tourspot.price).toBe(tourspotData.price);
    expect(tourspot.NoTickets).toBe(tourspotData.NoTickets);
    expect(tourspot.Address).toBe(tourspotData.Address);
    expect(tourspot.Address1).toBe(tourspotData.Address1);
    expect(tourspot.user).toBe(tourspotData.user);
  });

  it('should throw a validation error if required fields are missing', () => {
    const tourspotData = {};

    // Create a TourSpot instance without required fields
    const tourspot = new TourSpot(tourspotData);

    // Validate the TourSpot instance
    const validationResult = tourspot.validateSync();
    const errors = validationResult.errors;

    // Assert that required fields have validation errors
    expect(errors.title).toBeDefined();
    expect(errors.maindescription).toBeDefined();
    expect(errors.description).toBeDefined();
    expect(errors.image).toBeDefined();
    expect(errors.image1).toBeDefined();
    expect(errors.price).toBeDefined();
    expect(errors.NoTickets).toBeDefined();
    expect(errors.Address).toBeDefined();
    expect(errors.Address1).toBeDefined();
    expect(errors.user).toBeDefined();
  });
});
