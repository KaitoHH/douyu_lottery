ko.extenders.fixed = function(target) {
    var result = ko.computed({
        read: function() {
            return parseInt(target() * 100) / 100.0
            // return target()
        },
        write: target
    })
    result.raw = target;
    return result;
}

function AppViewModel() {
    this.odds1 = ko.observable(1.0)
    this.odds2 = ko.observable(1.0)
    this.bal = ko.observable(2000)
    this.calc_odds_1 = ko.pureComputed(function() {
        return this.odds1() * 0.9
    }, this)
    this.calc_odds_2 = ko.pureComputed(function() {
        return this.odds2() * 0.9
    }, this)
    this.rev_odds_1 = ko.pureComputed(function() {
        return 0.9 / this.odds1()
    }, this)
    this.rev_odds_2 = ko.pureComputed(function() {
        return 0.9 / this.odds2()
    }, this)
    this.rev_exp = ko.pureComputed(function() {
        return this.rev_odds_1() * this.rev_odds_2()
    }, this)
    this.yield = ko.pureComputed(function() {
        return (this.rev_exp() - 1) / (this.rev_odds_1() + this.rev_odds_2() + 2) * 100
    }, this)
    this.rev_rate_1 = ko.pureComputed(function() {
        return this.rev_odds_2() + 1
    }, this)
    this.rev_rate_2 = ko.pureComputed(function() {
        return this.rev_odds_1() + 1
    }, this)
    this.rev_rate_tot = ko.pureComputed(function() {
        return this.rev_rate_1() + this.rev_rate_2()
    }, this)
    this.rev_bal_1 = ko.pureComputed(function() {
        return this.bal() / this.rev_rate_tot() * this.rev_rate_1()
    }, this)
    this.rev_bal_2 = ko.pureComputed(function() {
        return this.bal() / this.rev_rate_tot() * this.rev_rate_2()
    }, this)
    this.min_bal_1 = ko.pureComputed(function() {
        return this.rev_rate_1() <= this.rev_rate_2() ? 1000 : 1000 / this.rev_rate_2() * this.rev_rate_1()
    }, this)
    this.min_bal_2 = ko.pureComputed(function() {
        return this.rev_rate_2() < this.rev_rate_1() ? 1000 : 1000 / this.rev_rate_1() * this.rev_rate_2()
    }, this)

    this.calc_odds_1_f = ko.pureComputed(function() {
        return this.calc_odds_1()
    }, this).extend({
        fixed: 0
    })

    this.calc_odds_2_f = ko.pureComputed(function() {
        return this.calc_odds_2()
    }, this).extend({
        fixed: 0
    })

    this.rev_odds_1_f = ko.pureComputed(function() {
        return this.rev_odds_1()
    }, this).extend({
        fixed: 0
    })

    this.rev_odds_2_f = ko.pureComputed(function() {
        return this.rev_odds_2()
    }, this).extend({
        fixed: 0
    })

    this.yield_f = ko.pureComputed(function() {
        return this.yield()
    }, this).extend({
        fixed: 0
    })

    this.rev_rate_1_f = ko.pureComputed(function() {
        return this.rev_rate_1()
    }, this).extend({
        fixed: 0
    })

    this.rev_rate_2_f = ko.pureComputed(function() {
        return this.rev_rate_2()
    }, this).extend({
        fixed: 0
    })

    this.rev_bal_1_f = ko.pureComputed(function() {
        return this.rev_bal_1()
    }, this).extend({
        fixed: 0
    })

    this.rev_bal_2_f = ko.pureComputed(function() {
        return this.rev_bal_2()
    }, this).extend({
        fixed: 0
    })

    this.min_bal_1_f = ko.pureComputed(function() {
        return this.min_bal_1()
    }, this).extend({
        fixed: 0
    })

    this.min_bal_2_f = ko.pureComputed(function() {
        return this.min_bal_2()
    }, this).extend({
        fixed: 0
    })
}

ko.applyBindings(new AppViewModel())
