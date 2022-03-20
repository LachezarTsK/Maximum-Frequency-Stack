
var FreqStack = function () {
    this.groupsWithSameFrequency = new Map();//Key: frequency | Value: array of integers with this frequency.
    this.valueToFrequency = new Map();//Key: integer | Value: frequency of this integer.
    this.maxFrequency = 0;
};

/** 
 * @param {number} value
 * @return {void}
 */
FreqStack.prototype.push = function (value) {
    let frequency = (this.valueToFrequency.has(value) ? this.valueToFrequency.get(value) : 0) + 1;
    this.valueToFrequency.set(value, frequency);
    if (!this.groupsWithSameFrequency.has(frequency)) {
        this.groupsWithSameFrequency.set(frequency, []);
    }
    this.groupsWithSameFrequency.get(frequency).push(value);
    this.maxFrequency = Math.max(this.maxFrequency, frequency);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
    let popValue = this.groupsWithSameFrequency.get(this.maxFrequency).pop();

    if (this.valueToFrequency.get(popValue) === 1) {
        this.valueToFrequency.delete(popValue);
    } else {
        this.valueToFrequency.set(popValue, this.valueToFrequency.get(popValue) - 1);
    }

    if (this.groupsWithSameFrequency.get(this.maxFrequency).length === 0) {
        this.groupsWithSameFrequency.delete(this.maxFrequency);
        this.maxFrequency--;
    }
    return popValue;
};
