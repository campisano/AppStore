var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('PhoneService', ['$resource',
                         function($resource)
{
    return $resource('phones/:phoneId.json', {},
    {
        query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
}]);
