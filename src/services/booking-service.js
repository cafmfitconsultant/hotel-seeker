const { Hotel } = require("../models");

class BookingService {

    getCheapestHotelByBookingPrice(client, dates) {
        const results = this.calculateBookingPeriodForClient(client, dates);
        results.sort((a, b) => a.value - b.value);
        const [result] = results;
        const { hotel } = result;
        return hotel;
    }

    calculateBookingPeriodForClient(client, dates) {
        const hotels = this.getHotels();
        const result = [];
        for (const hotel of hotels) {
            const value = hotel.calculateBookingByPeriod(client, dates);
            result.push({
                value,
                hotel
            });
        }

        return result;
    }

    getHotels() {

    }

}

module.exports = BookingService;