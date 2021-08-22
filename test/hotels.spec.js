'use strict'

const chai = require('chai');
const sinon = require("sinon");
const expect = chai.expect
const { Hotel, Tax, SearchFilter } = require('../src/models');
const { HotelController } = require('../src/controllers');
const { HotelRepository } = require('../src/repositories');

const getHotel = (name, rate, taxes) => new Hotel(name, rate, taxes);

const getFlowerParkHotel = () => {
  const tax1 = Tax.getRegularTax(110);
  const tax2 = Tax.getRewardProgramTax(80);
  const tax3 = Tax.getRegularWeekendTax(90);
  const tax4 = Tax.getRewardProgramWeekendTax(80);
  const flowersPark = getHotel('Parque das flores', 3, [tax1, tax2, tax3, tax4]);
  return flowersPark;
}

const getBotanicGardenHotel = () => {
  const tax1 = Tax.getRegularTax(160);
  const tax2 = Tax.getRewardProgramTax(110);
  const tax3 = Tax.getRegularWeekendTax(60);
  const tax4 = Tax.getRewardProgramWeekendTax(50);
  const botanicGarden = getHotel('Jardim Botânico', 4, [tax1, tax2, tax3, tax4]);
  return botanicGarden;
}

const getAtlanticOceanHotel = () => {
  const tax1 = Tax.getRegularTax(220);
  const tax2 = Tax.getRewardProgramTax(100);
  const tax3 = Tax.getRegularWeekendTax(150);
  const tax4 = Tax.getRewardProgramWeekendTax(40);
  const botanicGarden = getHotel('Mar Atlântico', 5, [tax1, tax2, tax3, tax4]);
  return botanicGarden;
}

describe('Hotel scenarios', () => {
  const hotels = []
  before(() => {
    const flowersPark = getFlowerParkHotel();
    const botanicGarden = getBotanicGardenHotel();
    const atlanticHotel = getAtlanticOceanHotel();
    hotels.push(flowersPark);
    hotels.push(botanicGarden);
    hotels.push(atlanticHotel);
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
  it('should have one tax with value 110 and not belongs to a reward program', () => {
    const [flowersPark] = hotels;
    const [tax] = flowersPark.taxes;
    expect(flowersPark.rate).to.equal(3);
    expect(tax.value).to.equal(110);
    expect(tax.forRewardsProgram).to.equal(false);
  })
  
  it('should return cheapest hotel for regular client in the week days', () => {
    const [flowersPark] = hotels;
    const hotelRepository = new HotelRepository();
    const forWeek = hotels.filter((h) => h.taxes.filter((t) => !t.forWeekend && !t.forRewardsProgram));
    sinon.stub(hotelRepository, "getAllInWeekForRegularClient").returns(forWeek);
    const hotelController = new HotelController(hotelRepository);
    const searchFilter = new SearchFilter(false, false);
    const hotel = hotelController.findCheapestByFilter(searchFilter);
    expect(hotel).to.equal(flowersPark);
  })
});

