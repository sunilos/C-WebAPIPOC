app.service('crudService', function ($http) {


    //Create new record
    this.post = function (PropertyDescCode) {
        var request = $http({
            method: "post",
            url: "/propertydescriptioncode/add",
            data: PropertyDescCode
        });
        return request;
    }

    //Get Single Records
    this.get = function (ID) {
        return $http.get("/propertydescriptioncode/get/" + ID);
    }

    //Update the Record
    this.put = function (PropertyDescCode) {
        var request = $http({
            method: "put",
            url: "/propertydescriptioncode/update/" ,
            data: PropertyDescCode
        });
        return request;
    }
    //Delete the Record
    this.delete = function (ID) {
        var request = $http({
            method: "delete",
            url: "/propertydescriptioncode/delete/" + ID
        });
        return request;
    }

    //Create new record
    this.post = function (PropertyDescCode) {
        var request = $http({
            method: "post",
            url: "/propertydescriptioncode/search",
            data: PropertyDescCode
        });
        return request;
    }

    //Create new record
    this.post = function (pageNo, PropertyDescCode) {
        var request = $http({
            method: "post",
            url: "/propertydescriptioncode/search" + pageNo,
            data: PropertyDescCode
        });
        return request;
    }
});