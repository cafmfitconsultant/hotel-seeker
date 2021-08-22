class HotelController {
    constructor(repository){
        this.repository = repository;
    }
    findCheapestByFilter(filter){
        if(!filter.forWeekend && !filter.forRewardsProgram){
            return this.repository.findCheapestInWeekForRegularClient(filter);
        }
    }
}

module.exports = HotelController;