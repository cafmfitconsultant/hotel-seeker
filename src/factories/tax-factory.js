const { Tax } = require('../models/index');

class TaxFactory {
    static getRegularTax = (value) => { return new Tax(value, false, false) };

    static getRegularWeekendTax = (value) => {
        return new Tax(value, true, false);
    }

    static getRewardProgramTax = (value) => {
        return new Tax(value, false, true);
    }

    static getRewardProgramWeekendTax = (value) => {
        return new Tax(value, true, true);
    }
}

module.exports = TaxFactory;