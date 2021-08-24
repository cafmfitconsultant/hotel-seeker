class Hotel {
    constructor(name, rate){
        this.name = name;
        this.rate = rate;
    }

    setTaxes(taxes){
        this.taxes = taxes;
    }

    calculateBookingByPeriod(type, dates) {
        const reward = type === 'reward';
        let total = 0;
        for (const date of dates) {
            const d = new Date(date);
            const day = d.getDay();
            let tax = null;
            if(day === 0 || day === 5 || day == 6){
                tax = this.taxes.find((t) => t.forRewardsProgram === reward && t.forWeekend);
            } else {
                tax = this.taxes.find((t) => t.forRewardsProgram === reward && !t.forWeekend);
            }
            total = total + tax.value;
        }
        return total;
    }
}
module.exports = Hotel;