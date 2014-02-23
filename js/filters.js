// phonecatFilters module
var phonecatFilters = angular.module('phonecatFilters', []);

// CheckmarkFilter filter
phonecatFilters.filter('CheckmarkFilter',
                        function()
                        {
                            return function(input)
                            {
                                return input ? '\u2713' : '\u2718';
                            };
                        });
