
class HotelRepository {
    findCheapestInWeekForRewardProgramClient(filter){
    }
    findCheapestInWeekForRegularClient(){
        const allInWeekForRegularClient = this.getAllInWeekForRegularClient();
        const [result] = allInWeekForRegularClient.sort((h1, h2) => h2.tax.value - h1.tax.value);
        return result;
    }
    getAllInWeekForRegularClient(){

    }
}

module.exports = HotelRepository;