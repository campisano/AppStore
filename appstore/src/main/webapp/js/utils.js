function Util(){};

// from http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
Util.isNumber = function(number)
{
    return !isNaN(parseFloat(number)) && isFinite(number);
};
