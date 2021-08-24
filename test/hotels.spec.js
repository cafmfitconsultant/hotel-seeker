'use strict'

const chai = require('chai');
const sinon = require("sinon");
const expect = chai.expect
const { Hotel, Tax } = require('../src/models');
const { BookingService } = require('../src/services');


const getHotel = (name, rate, taxes) => new Hotel(name, rate, taxes);


describe('Hotel scenarios', () => {
  const hotels = []
  let taxes = [];
  let bookingService;
  before(() => {
    bookingService = new BookingService();
    const botanicGarden = getHotel('Jardim Botânico', 4);
    
    const botanicGardenTaxes = [];
    botanicGardenTaxes.push(Tax.getRegularTax(160));
    botanicGardenTaxes.push(Tax.getRewardProgramTax(110));
    botanicGardenTaxes.push(Tax.getRegularWeekendTax(60));
    botanicGardenTaxes.push(Tax.getRewardProgramWeekendTax(50));
    botanicGarden.setTaxes(botanicGardenTaxes);
    botanicGardenTaxes.forEach((t) => t.hotel = botanicGarden);

    const atlanticOcean = getHotel('Mar Atlântico', 5);
    const atlanticOceanTaxes = [];
    atlanticOceanTaxes.push(Tax.getRegularTax(220));
    atlanticOceanTaxes.push(Tax.getRewardProgramTax(100));
    atlanticOceanTaxes.push(Tax.getRegularWeekendTax(150));
    atlanticOceanTaxes.push(Tax.getRewardProgramWeekendTax(40));
    atlanticOcean.setTaxes(atlanticOceanTaxes);
    atlanticOceanTaxes.forEach((t) => t.hotel = atlanticOcean);

    const flowersPark = getHotel('Parque das flores', 3);
    const flowersParkTaxes = [];
    flowersParkTaxes.push(Tax.getRegularTax(110));
    flowersParkTaxes.push(Tax.getRewardProgramTax(80));
    flowersParkTaxes.push(Tax.getRegularWeekendTax(90));
    flowersParkTaxes.push(Tax.getRewardProgramWeekendTax(80));
    flowersPark.setTaxes(flowersParkTaxes);
    flowersParkTaxes.forEach((t) => t.hotel = flowersPark);
    taxes = [...atlanticOceanTaxes,...botanicGardenTaxes,...botanicGardenTaxes];
    
    hotels.push(botanicGarden);
    hotels.push(atlanticOcean);
    hotels.push(flowersPark);

    sinon.stub(bookingService, "getHotels").returns(hotels);
  });

  after(() => {
    // runs once after the last test in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  afterEach(() => {
    // runs after each test in this block
  });

  // test cases

  it('should calculate booking value', () => {
    const atlanticOcean = hotels.find((t) => t.name === 'Mar Atlântico');
    const dates = ['26Mar2020', '27Mar2020', '28Mar2020'];
    const bookingValue = atlanticOcean.calculateBookingByPeriod('reward', dates);
    expect(bookingValue).to.equal(180);
  })

  it('should return cheapest hotel for regular client in the week days', () => {
    const flowersPark = hotels.find((t) => t.name === 'Parque das flores');
    const dates = ['16Mar2020', '17Mar2020', '18Mar2020'];
    const hotel = bookingService.getCheapestHotelByBookingPrice('regular', dates);
    expect(hotel).to.equal(flowersPark);
  })

  it('should return cheapest hotel for regular client in the weekend days', () => {
    const botanicGarden = hotels.find((t) => t.name === 'Jardim Botânico');
    const dates = ['20Mar2020', '21Mar2020', '22Mar2020'];
    const hotel = bookingService.getCheapestHotelByBookingPrice('regular', dates);
    expect(hotel).to.equal(botanicGarden);
  })

  it('should return cheapest hotel for rewards program client in the mixed days', () => {
    const atlanticOcean = hotels.find((t) => t.name === 'Mar Atlântico');
    const dates = ['26Mar2020', '27Mar2020', '28Mar2020'];
    const hotel = bookingService.getCheapestHotelByBookingPrice('reward', dates);
    expect(hotel).to.equal(atlanticOcean);
  })
});

