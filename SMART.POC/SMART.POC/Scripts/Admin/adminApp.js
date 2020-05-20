var appAdmin = angular.module('admin', ['ngResource', 'checklist-model', 'ngUpload', 'ng.group', 'ngCookies']);

appAdmin.config(function ($provide) {
    $provide.decorator('$exceptionHandler', function ($delegate) {

        return function (exception, cause) {
            $delegate(exception, cause);
        };
    });
});

appAdmin.filter('loanTableFilter', function () {
    // Just add arguments to your HTML separated by :
    // And add them as parameters here, for example:
    // return function(dataArray, searchTerm, argumentTwo, argumentThree) {
    return function (dataArray, searchTerm) {
        // If no array is given, exit.
        if (!dataArray) {
            return;
        }
        // If no search term exists, return the array unfiltered.
        else if (!searchTerm) {
            return dataArray;
        }
        // Otherwise, continue.
        else {
            // Convert filter text to lower case.
            var term = searchTerm.toLowerCase();
            // Return the array and filter it by looking for any occurrences of the search term in each items id or name. 
            return dataArray.filter(function (item) {
                var LoanSkey = item.LoanSkey.toLowerCase().indexOf(term) > -1;
                var LoanNo = item.LoanNo.toLowerCase().indexOf(term) > -1;
                var LoanProgramDesc = item.LoanProgramDesc.toLowerCase().indexOf(term) > -1;
                var FHACaseNo = item.FHACaseNo.toLowerCase().indexOf(term) > -1;
                var BorrowerName = item.BorrowerName.toLowerCase().indexOf(term) > -1;
                var PropertyAddress = item.PropertyAddress.toLowerCase().indexOf(term) > -1;
                var County = item.County.toLowerCase().indexOf(term) > -1;
                var ClosedBoxNo = item.ClosedBoxNo.toLowerCase().indexOf(term) > -1;
                var ParcelNo = item.ParcelNo.toLowerCase().indexOf(term) > -1;
                var LoanType = item.LoanType.toLowerCase().indexOf(term) > -1;
                var LoanStatus = item.LoanStatus.toLowerCase().indexOf(term) > -1;
                var FannieMaeLoanNo = item.FannieMaeLoanNo.toLowerCase().indexOf(term) > -1;
                var BranchCode = item.BranchCode.toLowerCase().indexOf(term) > -1;
                var OfficerCode = item.OfficerCode.toLowerCase().indexOf(term) > -1;
                var OriginationDateString = item.OriginationDateString.toLowerCase().indexOf(term) > -1;
                var OrigPrinBal = item.OrigPrinBal.toString().indexOf(term) > -1;
                var UnpaidPrinBal = item.UnpaidPrinBal.toString().indexOf(term) > -1;
                var MortgageAmount = item.MortgageAmount.toString().indexOf(term) > -1;
                var MonthlyPrinBal = item.MonthlyPrinBal.toString().indexOf(term) > -1;
                var PrinPaidYtd = item.PrinPaidYtd.toString().indexOf(term) > -1;
                var IntPaidYtd = item.IntPaidYtd.toString().indexOf(term) > -1;
                var LoanCreatedBy = item.LoanCreatedBy.toLowerCase().indexOf(term) > -1;
                var LoanCreatedDateString = item.LoanCreatedDateString.toLowerCase().indexOf(term) > -1;
                var FileRecdDateFromString = item.FileRecdDateFromString.toLowerCase().indexOf(term) > -1;
                var LoanStatus1 = item.LoanStatus1.toLowerCase().indexOf(term) > -1;
                var ProgramType = item.ProgramType.toLowerCase().indexOf(term) > -1;
                //var LoanCloseDate = item.LoanCloseDate.toString().indexOf(term) > -1;
                return LoanSkey || LoanNo || LoanProgramDesc || FHACaseNo || BorrowerName || PropertyAddress || County || ClosedBoxNo || ParcelNo || LoanType || LoanStatus || FannieMaeLoanNo || BranchCode || OfficerCode || OriginationDateString || OrigPrinBal || UnpaidPrinBal || MortgageAmount || MonthlyPrinBal || PrinPaidYtd || IntPaidYtd || LoanCreatedBy || LoanCreatedDateString || FileRecdDateFromString || LoanStatus1 || ProgramType;

            });
        }
    }
});

appAdmin.filter('maskValueSSN', function () {
    return function (x) {
        var i, c, txt = "";
        if (x.length > 4) {
            for (i = 0; i < x.length - 4; i++) {
                c = x[i];
                if (c != '-' && c != '+' && c != ' ') {
                    txt += 'X';
                } else {
                    txt += c;
                }
            }
            txt += x.substring(x.length - 4, x.length);
        } else {
            for (i = 0; i < x.length; i++) {
                txt += "X";
            }
        }
        var ntxt = "";
        if (txt.length > 3) {
            txt = txt.trim();
            for (i = 0; i < txt.length; i++) {
                if (i == 0) {
                    ntxt += "" + txt[i];
                } else if (i == 2) {
                    ntxt += txt[i] + "-";
                } else if (i == 4) {
                    ntxt += txt[i] + "-";
                } else {
                    ntxt += txt[i];
                }
            }
        } else {
            ntxt = txt;
        }
        return ntxt;
    };
});

appAdmin.filter('maskValue', function () {
    return function (x) {
        var i, c, txt = "";
        if (x.length > 4) {
            for (i = 0; i < x.length - 4; i++) {
                c = x[i];
                if (c != '-' && c != '+' && c != ' ') {
                    txt += 'X';
                } else {
                    txt += c;
                }
            }
            txt += x.substring(x.length - 4, x.length);
        } else {
            for (i = 0; i < x.length; i++) {
                txt += "X";
            }
        }
        return txt;
    };
});

appAdmin.filter('customCurrency', ["$filter", function ($filter) {
    return function (amount, currencySymbol) {
        var currency = $filter('currency');
        if (amount == undefined) { return null; }
        if (!isNaN(amount)) {
            amount = amount.toString();
        }
        if (amount.charAt(0) === "-") {
            return currency(amount, currencySymbol).replace("(", "-").replace(")", "");
        }

        return currency(amount, currencySymbol);
    };

}]);

//Start by SUNIL SAHU POC

appAdmin.controller('schedulerCtl', function ($scope, ServiceLocator) {
    _self = this;
    $scope.list = [];
    $scope.form = {id:2};
    $scope.display = function () {
        url = "api/propertydescriptioncode/get/" + $scope.form.id
        ServiceLocator.http.get(url, null, function (res) {
            console.log("----->", res);
            $scope.form.error = res.error;
            $scope.form.message = res.message;
            if (res.error == false) {
                $scope.form = res.dto;
            }
        })
    }

    $scope.submit = function () {
        console.log('calling submit');
        url = "api/propertydescriptioncode/add"
        if ($scope.form.id > 0) {
            url = "api/propertydescriptioncode/update"
        }
        ServiceLocator.http.post(url, $scope.form, function (res) {
            console.log("After save ----->", res);
            //$scope.form = res.dto;
        })
    }

    $scope.display();
});

appAdmin.controller('schedulerListCtl', function ($scope, ServiceLocator) {

    _self = this;

    //Contains search elements
    $scope.searchForm = {};

    //Contains List
    $scope.list = [];

    $scope.pageNo = 0;

    $scope.next = function () {
        $scope.pageNo++;
        $scope.search();
    }

    $scope.previous = function () {
        if ($scope.pageNo >= 0) {
            $scope.pageNo--;
            $scope.search();
        }
    }

    $scope.delete = function (id) {
        url = "api/propertydescriptioncode/delete/" + id;
        ServiceLocator.http.get(url, null, function (res) {
            console.log(res);
            $scope.search();
        })
    }

    $scope.search = function () {
        url = "api/propertydescriptioncode/search/" + $scope.pageNo;
        ServiceLocator.http.post(url, $scope.searchForm, function (res) {
            console.log("----->", res);
            $scope.list = res.list;
        })
    }

    $scope.search();
});

//End by SUNIL SAHU POC


//Start by SUNIL SAHU common component  

/**
 * Service contains endpoints
 */
appAdmin.service('EndpointService', function () {
    var self = this;
    this.COLLEGE = "/College";
    this.STUDENT = "/Student";
    this.MARKSHEET = "/Marksheet";
    this.USER = "/User";
    this.Role = "/Role";
    this.Message = "/Message";
    this.Login = "/Auth";

    self.getAPI = function (ep) {
        return {
            endpoint: ep,
            get: ep + "/get",
            save: ep + "/save",
            delete1: ep + "/delete",
            preload: ep + "/preload",
            search: ep + "/search"
        }
    }
});



/**
 * Service process server exceptions
 */
appAdmin.service('ErrorService',function ($window) {
    self = this;
    self.code = 0;
    self.setCode = function (c) {
        self.code = c;
    };
    self.getCode = function (c) {
        return self.code;
    };
    self.setMessage = function (c, m) {
        self.code = c;
        self.message = m;
    };
    self.getMessage = function () {
        return self.code + ":" + self.message;
    };

    self.handle = function (res) {
        self.code = res.status;
        self.message = res.statusText;
        if (self.code == 403) {
            $window.alert('OOPS Your session has been expired!');
            $location.path("login")
        } else {
            $window.alert(self.code + ':' + self.message);
        }
    };

});


/**
 * Error controller
 */
var errorCB = function ($scope, ServiceLocator) {
    $scope.errorMsg = "";
    $scope.errorShow = false;

    $scope.reset = function () {
        ServiceLocator.errorService.setCode(0);
        $scope.errorShow = false;
    }

    $scope.$watch(function () {
        return ServiceLocator.errorService.getCode();
    }, function (newVal, oldVal) {
        if (newVal > 0) {
            $scope.errorMsg = ServiceLocator.errorService.getMessage();
            $scope.errorShow = true;
        }
    });
}
appAdmin.controller('errorCtl', errorCB);


/**
 * Custom application HTTP Client service
 */
appAdmin.service('httpClient', function ($http, ErrorService) {

    var self = this;

    //Makes HTTP GET call
    self.get = function (url, form, callback) {
        if (form) {
            var params = "?";
            var flag = false;

            //Form elements are in query string
            angular.forEach(form, function (value, key) {
                params += key + "=" + value + "&"
                flag = true;
            });

            //Add query string to url
            if (flag) {
                url += params;
            }
        }

        //call endpoint
        $http.get(url).then(function (serverResponse) {
            callback(serverResponse.data);
        }, function (serverResponse) {
            console.log(serverResponse);
            ErrorService.handle(serverResponse);
        });
    }

    //Makes HTTP POST call
    self.post = function (url, data, ctlResponse) {
        $http.post(url, data).then(
            function (serverResponse) {
                ctlResponse(serverResponse.data);
            },
            function (serverResponse) {
                console.log(serverResponse);
                ErrorService.handle(serverResponse);
            });
    }

    //Makes HTTP POST Mutipart form data call
    self.postMutipart = function (url, folder, data, ctlResponse) {
        var fd = new FormData();
        fd.append('file', folder.file);
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                fd.append(key, data[key]);
            }
        }

        fd.append("form", angular.toJson(data));

        $http.post(url, fd, {
            withCredentials: false,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            },
            data: angular.toJson(data)
        }).then(
            function (serverResponse) {
                ctlResponse(serverResponse.data);
            },
            function (serverResponse) {
                console.log(serverResponse);
                ErrorService.handle(serverResponse);
            });
    };
});

/**
 * ServiceLocator locates singleton services of application
 */
appAdmin.service('ServiceLocator',
    function (httpClient, $location, EndpointService, ErrorService) {
        var self = this;
        self.http = httpClient;
        self.locationService = $location;
        self.errorService = ErrorService;
        self.endpointService = EndpointService;
    }
);

//End by SUNIL SAHU common component  


function AppCtrl($scope, $http, $location, $window, $cookieStore, $routeParams, WatchService) {

    $scope.flag = $routeParams.flag;
    $scope.menuList = [];
    $scope.menuListSub = [];
    $scope.Hello = "Hello World..";
    if ($scope.flag != undefined && $scope.flag) {
        $scope.homeCall();
    }
    //CheckUserSecurity();
    $scope.IsPageShow = false;
    $scope.fhaslShow = $cookieStore.get("fhaslShow");
    $scope.glShow = $cookieStore.get("glShow");
    $scope.spsShow = $cookieStore.get("spsShow");
    $scope.cambuShow = $cookieStore.get("cambuShow");
    $scope.sysadmShow = $cookieStore.get("sysadmShow");
    $scope.admShow = $cookieStore.get("admShow");
    $scope.reportsShow = $cookieStore.get("reportsShow");
    $scope.relatedsubsystem = $cookieStore.get("relatedsubsystem");
    $scope.transprocessadmin = $cookieStore.get("transprocessadmin");
    $scope.fhasladmin = $cookieStore.get("fhasladmin");
    $scope.cashmgmtadmin = $cookieStore.get("cashmgmtadmin");
    $scope.treasuryadmin = $cookieStore.get("treasuryadmin");
    $scope.transprocesssubadmin = $cookieStore.get("transprocesssubadmin");
    $scope.fhaslsubadmin = $cookieStore.get("fhaslsubadmin");
    $scope.cashmgmtsub = $cookieStore.get("cashmgmtsub");
    $scope.treasurysubadmin = $cookieStore.get("treasurysubadmin");

    $scope.$watch(function () {
        return $scope.cambuShow;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.cambuShow = false;
        } else if (newVal == 'false') {
            $scope.cambuShow = false;
        } else if (newVal == 'true') {
            $scope.cambuShow = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.fhaslShow;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.fhaslShow = false;
        } else if (newVal == 'false') {
            $scope.fhaslShow = false;
        } else if (newVal == 'true') {
            $scope.fhaslShow = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.glShow;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.glShow = false;
        } else if (newVal == 'false') {
            $scope.glShow = false;
        } else if (newVal == 'true') {
            $scope.glShow = true;
        }
    }, true);

    $scope.GoBack = function () {
        //$scope.homeCall();
        $scope.checkMenu();
    };

    $scope.$watch(function () {
        return $scope.spsShow;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.spsShow = false;
        } else if (newVal == 'false') {
            $scope.spsShow = false;
        } else if (newVal == 'true') {
            $scope.spsShow = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.sysadmShow;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.sysadmShow = false;
        } else if (newVal == 'false') {
            $scope.sysadmShow = false;
        } else if (newVal == 'true') {
            $scope.sysadmShow = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.admShow;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.admShow = false;
        } else if (newVal == 'false') {
            $scope.admShow = false;
        } else if (newVal == 'true') {
            $scope.admShow = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.reportsShow;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.reportsShow = false;
        } else if (newVal == 'false') {
            $scope.reportsShow = false;
        } else if (newVal == 'true') {
            $scope.reportsShow = true;
        }
    }, true);
    $scope.$watch(function () {
        return $scope.relatedsubsystem;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.relatedsubsystem = false;
        } else if (newVal == 'false') {
            $scope.relatedsubsystem = false;
        } else if (newVal == 'true') {
            $scope.relatedsubsystem = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.Bulkuploadservice;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.Bulkuploadservice = false;
        } else if (newVal == 'false') {
            $scope.Bulkuploadservice = false;
        } else if (newVal == 'true') {
            $scope.Bulkuploadservice = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.transprocessadmin;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.transprocessadmin = false;
        } else if (newVal == 'false') {
            $scope.transprocessadmin = false;
        } else if (newVal == 'true') {
            $scope.transprocessadmin = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.fhasladmin;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.fhasladmin = false;
        } else if (newVal == 'false') {
            $scope.fhasladmin = false;
        } else if (newVal == 'true') {
            $scope.fhasladmin = true;
        }
    }, true);


    $scope.$watch(function () {
        return $scope.treasuryadmin;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.treasuryadmin = false;
        } else if (newVal == 'false') {
            $scope.treasuryadmin = false;
        } else if (newVal == 'true') {
            $scope.treasuryadmin = true;
        }
    }, true);


    $scope.$watch(function () {
        return $scope.cashmgmtadmin;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.cashmgmtadmin = false;
        } else if (newVal == 'false') {
            $scope.cashmgmtadmin = false;
        } else if (newVal == 'true') {
            $scope.cashmgmtadmin = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.transprocesssubadmin;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.transprocesssubadmin = false;
        } else if (newVal == 'false') {
            $scope.transprocesssubadmin = false;
        } else if (newVal == 'true') {
            $scope.transprocesssubadmin = true;
        }
    }, true);

    $scope.$watch(function () {
        return $scope.fhaslsubadmin;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.fhaslsubadmin = false;
        } else if (newVal == 'false') {
            $scope.fhaslsubadmin = false;
        } else if (newVal == 'true') {
            $scope.fhaslsubadmin = true;
        }
    }, true);


    $scope.$watch(function () {
        return $scope.treasurysubadmin;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.treasurysubadmin = false;
        } else if (newVal == 'false') {
            $scope.treasurysubadmin = false;
        } else if (newVal == 'true') {
            $scope.treasurysubadmin = true;
        }
    }, true);


    $scope.$watch(function () {
        return $scope.cashmgmtsub;
    }, function (newVal) {
        if (newVal == undefined) {
            $scope.cashmgmtsub = false;
        } else if (newVal == 'false') {
            $scope.cashmgmtsub = false;
        } else if (newVal == 'true') {
            $scope.cashmgmtsub = true;
        }
    }, true);



    $scope.containsValue = function (arr, value) {
        if (arr != undefined && arr.indexOf(value) != -1) {
            return false;
        } else {
            return true;
        }
    };

    $scope.redirectTo = function (val, menunam) {
        if (menunam == 'My_Loans') {
            window.location = val.My_Loans;
            //window.open(val.MyLoans, '_blank');
        } else if (menunam == 'My_Ticket') {
            window.location = val.My_Ticket;
            //window.open(val.MyTicket, '_blank');
        } else if (menunam == 'Supervisor_Inbox') {
            window.location = val.Supervisor_Inbox;
            // window.open(val.SupervisorInbox, '_blank');
        } else if (menunam == 'Loan_Search') {
            window.location = val.Loan_Search;
            //window.open(val.LoanSearch, '_blank');
        } else if (menunam == 'Loan_Wizard') {
            window.location = val.Loan_Wizard;
            //window.open(val.LoanWizard, '_blank');
        } else if (menunam == 'Loan_Holding_Pen') {
            window.location = val.Loan_Holding_Pen;
            //window.open(val.LoanHoldingPen, '_blank');
        } else if (menunam == 'Document_Dashboard') {
            window.location = val.Document_Dashboard;
            //window.open(val.DocumentDashboard, '_blank');
        } else if (menunam == 'Document_Wizard') {
            window.location = val.Document_Wizard;
            //window.open(val.DocumentWizard, '_blank');
        } else if (menunam == 'Servicing_Search') {
            window.location = val.Servicing_Search;
            //window.open(val.ServicingSearch, '_blank');
        } else if (menunam == 'Bankruptcy_Search') {
            window.location = val.Bankruptcy_Search;
            //window.open(val.BankruptcySearch, '_blank');
        } else if (menunam == 'Foreclosure_Search') {
            window.location = val.Foreclosure_Search;
            //window.open(val.ForeclosureSearch, '_blank');
        } else if (menunam == 'Mortgage_Search') {
            window.location = val.Mortgage_Search;
            //window.open(val.MortgageSearch, '_blank');
        } else if (menunam == 'Check_Search') {
            window.location = val.Check_Search;
            //window.open(val.CheckSearch, '_blank');
        } else if (menunam == 'Ticket_Search') {
            window.location = val.Ticket_Search;
            //window.open(val.TicketSearch, '_blank');
        } else if (menunam == 'Create_New_Ticket') {
            window.location = val.Create_New_Ticket;
            //window.open(val.CreateNewTicket, '_blank');
        } else if (menunam == 'NOVAD_Inbox') {
            window.location = val.NOVAD_Inbox;
            //window.open(val.NOVADInbox, '_blank');
        } else if (menunam == 'HUD_Inbox') {
            window.location = val.HUD_Inbox;
            //window.open(val.HUDInbox, '_blank');
        } else if (menunam == 'Print_Batch_Search') {
            window.location = val.Print_Batch_Search;
            //window.open(val.PrintBatchSearch, '_blank');
        } else if (menunam == 'Customer_Service') {
            window.location = val.Customer_Service;
            //window.open(val.CustomerService, '_blank');
        } else if (menunam == 'Monthly_Weekly_Reports') {
            window.location = val.Monthly_Weekly_Reports;
            //window.open(val.MonthlyWeeklyReports, '_blank');
        } else if (menunam == 'Ticket_Round_Robin') {
            window.location = val.Ticket_Round_Robin;
            //window.open(val.TicketRoundRobin, '_blank');
        } else if (menunam == 'NCF_Queue') {
            window.location = val.NCF_Queue;
            //window.open(val.NCFQueue, '_blank');
        } else if (menunam == 'PMC_Queue') {
            window.location = val.PMC_Queue;
            //window.open(val.PMCQueue, '_blank');
        }
    };

    $scope.setActive = function (type) {

        // Admin Routes
        $scope.DailyWorkingTransactionActive = '';
        $scope.AdminHomeActive = '';
        $scope.UsersActive = '';
        $scope.UsersRoleActive = '';

        $scope[type + 'Active'] = 'active';

        $scope.currentDate = Date.now();

        // setInterval(function () { alert("Hello") }, 3000);

        SessionCtrl(type);

    }

    $scope.reportsCall = function (IsReport) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", true);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = true;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (IsReport == 'Report') {
            $location.path("ReportList_GL");
        }
    }

    $scope.LastObects = function (abc) {
        if (abc != "") {
            $scope.slesh = ' / ';
            $scope.sessionStorage = abc + $scope.slesh;
            $scope.storevalue($scope.sessionStorage);
        }
    }

    $scope.Getsession = function () {
        var endpoint = "/Admin/Getsession";
        $http({ method: 'GET', url: endpoint }).
            success(function (data, status, headers, config) {
                $scope.sessionStorage = data.sessionStorage;
            }).
            error(function (data, status, headers, config) {
                error = status + " Request failed";
            });
    }


    $scope.storevalue = function (sessionStorage) {
        var endpoint = "/Admin/Holdsession";
        $http({
            method: 'POST',
            url: endpoint,
            data: { sessionStorage: sessionStorage }
        }).then(function (response) {
        })
    }

    $scope.sysadmCall = function (IsSystemadmin) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", true);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = true;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (IsSystemadmin == 'Systemadmin') {
            $location.path("Users");
        }
    }

    $scope.admCall = function (IsAdmin) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", true);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = true;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (IsAdmin == 'Admin') {
            $location.path("Users");
        }
    }

    $scope.CambuCall = function (IsCambuHome) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", true);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = true;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (IsCambuHome == 'Cambu') {
            $location.path("BatchRunOption_CAMBU");
        }
    }

    $scope.fhaslCall = function (IsFhasl) {
        $cookieStore.put("fhaslShow", true);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;

        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = true;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (IsFhasl == 'Fhasl') {
            $location.path("BatchRunOption_FHASL");
        }
    }

    $scope.homeCall = function () {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        $location.path("Home");
    }

    $scope.hideMenus = function () {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
    }

    $scope.relatedsubsystemcall = function (IsSubsystem) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("relatedsubsystem", true);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = true;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (IsSubsystem == 'IsSubsystem') {
            $location.path("Home");
        }
    }
    $scope.Bulkuploadservicecall = function (IsBulkupload) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", true);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = true;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (IsBulkupload == 'IsBulkupload') {
            $location.path("BulkDocumentUpload");
        }
    }
    $scope.transprocessadmincall = function (Istransprocess) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;

        if (Istransprocess == 'transprocessadmin' && Istransprocess != null && Istransprocess != undefined) {
            $cookieStore.put("transprocessadmin", true);
            $scope.transprocessadmin = true;
            $cookieStore.put("transprocesssubadmin", false);
            $scope.transprocesssubadmin = false;
            $location.path("MonitorServiceSelf_CAMBU");


        }
        if (Istransprocess == 'transprocesssubadmin' && Istransprocess != null && Istransprocess != undefined) {
            $cookieStore.put("transprocesssubadmin", true);
            $scope.transprocesssubadmin = true;
            $cookieStore.put("transprocessadmin", false);
            $scope.transprocessadmin = false;
            $location.path("MonitorServiceSelf_CAMBU");
        }
    }


    $scope.fhasladmincall = function (Isfhasl) {

        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.transprocesssubadmin = false;
        $scope.transprocessadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;

        if (Isfhasl == 'fhasladmin' && Isfhasl != null && Isfhasl != undefined) {
            $cookieStore.put("fhasladmin", true);
            $scope.fhasladmin = true;
            $cookieStore.put("fhaslsubadmin", false);
            $scope.fhaslsubadmin = false;
            $location.path("Scheduler_FHASL");


        }
        if (Isfhasl == 'fhaslsubadmin' && Isfhasl != null && Isfhasl != undefined) {
            $cookieStore.put("fhasladmin", false);
            $scope.fhasladmin = false;
            $cookieStore.put("fhaslsubadmin", true);
            $scope.fhaslsubadmin = true;
            $location.path("Scheduler_FHASL");

        }

    }

    $scope.cashmgmtadmincall = function (Iscashmgmt) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.fhaslsubadmin = false;
        $scope.fhasladmin = false;
        $scope.treasuryadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
        if (Iscashmgmt == 'cashadmin') {
            $cookieStore.put("cashmgmtsub", false);
            $scope.cashmgmtsub = false;
            $cookieStore.put("cashmgmtadmin", true);
            $scope.cashmgmtadmin = true;
            $location.path("GL2MonitorService_GL");
        }
        if (Iscashmgmt == 'cashmgmtsub') {
            $cookieStore.put("cashmgmtsub", true);
            $scope.cashmgmtsub = true;
            $cookieStore.put("cashmgmtadmin", false);
            $scope.cashmgmtadmin = false;
            $location.path("GL2MonitorService_GL");
        }

    }

    $scope.treasuryadmincall = function (Istreasury) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);

        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;

        if (Istreasury == 'treasuryadmin' && Istreasury != null && Istreasury != undefined) {
            $cookieStore.put("treasuryadmin", true);
            $scope.treasuryadmin = true;
            $cookieStore.put("treasurysubadmin", false);
            $scope.treasurysubadmin = false;
            $location.path("Scheduler_SPS");

        }
        if (Istreasury == 'treasurysubadmin' && Istreasury != null && Istreasury != undefined) {
            $cookieStore.put("treasuryadmin", false);
            $scope.treasuryadmin = false;
            $cookieStore.put("treasurysubadmin", true);
            $scope.treasurysubadmin = true;
            $location.path("Scheduler_SPS");
        }
    }


    $scope.systemCall = function () {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = false;
        $scope.spsShow = false;
    }

    $scope.glCall = function (ISCasemanagementHome) {
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", true);
        $cookieStore.put("spsShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.fhasladmin = false;
        $scope.transprocessadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.glShow = true;
        $scope.spsShow = false;
        if (ISCasemanagementHome == 'Cashmanagement') {
            $location.path("GeneralLedger_GL");
        }

    }
    $scope.checkMenu = function () {
        $scope.fhaslShow = $cookieStore.get("fhaslShow");
        $scope.glShow = $cookieStore.get("glShow");
        $scope.spsShow = $cookieStore.get("spsShow");
        $scope.cambuShow = $cookieStore.get("cambuShow");
        $scope.sysadmShow = $cookieStore.get("sysadmShow");
        $scope.admShow = $cookieStore.get("admShow");
        $scope.reportsShow = $cookieStore.get("reportsShow");
        $scope.relatedsubsystem = $cookieStore.get("relatedsubsystem");
        $scope.Bulkuploadservice = $cookieStore.get("Bulkuploadservice");
        $scope.fhasladmin = $cookieStore.get("fhasladmin");
        $scope.transprocessadmin = $cookieStore.get("transprocessadmin");
        $scope.cashmgmtadmin = $cookieStore.get("cashmgmtadmin");
        $scope.treasuryadmin = $cookieStore.get("treasuryadmin");
        $scope.fhaslsubadmin = $cookieStore.get("fhaslsubadmin");
        $scope.transprocesssubadmin = $cookieStore.get("transprocesssubadmin");
        $scope.cashmgmtsub = $cookieStore.get("cashmgmtsub");
        $scope.treasurysubadmin = $cookieStore.get("treasurysubadmin");
    }
    $scope.spsCall = function (ISSPSHome) {
        $cookieStore.put("spsShow", true);
        $cookieStore.put("fhaslShow", false);
        $cookieStore.put("glShow", false);
        $cookieStore.put("cambuShow", false);
        $cookieStore.put("sysadmShow", false);
        $cookieStore.put("admShow", false);
        $cookieStore.put("reportsShow", false);
        $cookieStore.put("relatedsubsystem", false);
        $cookieStore.put("Bulkuploadservice", false);
        $cookieStore.put("cashmgmtadmin", false);
        $cookieStore.put("treasuryadmin", false);
        $cookieStore.put("transprocessadmin", false);
        $cookieStore.put("fhasladmin", false);
        $cookieStore.put("transprocesssubadmin", false);
        $cookieStore.put("fhaslsubadmin", false);
        $cookieStore.put("cashmgmtsub", false);
        $cookieStore.put("treasurysubadmin", false);
        $scope.treasurysubadmin = false;
        $scope.cashmgmtsub = false;
        $scope.fhaslsubadmin = false;
        $scope.transprocesssubadmin = false;
        $scope.transprocessadmin = false;
        $scope.fhasladmin = false;
        $scope.treasuryadmin = false;
        $scope.cashmgmtadmin = false;
        $scope.Bulkuploadservice = false;
        $scope.relatedsubsystem = false;
        $scope.reportsShow = false;
        $scope.admShow = false;
        $scope.sysadmShow = false;
        $scope.cambuShow = false;
        $scope.fhaslShow = false;
        $scope.spsShow = true;
        $scope.glShow = false;
        if (ISSPSHome == 'SPS') {
            $location.path("BatchRunOption_SPS");
        }
    }
    //changed by shivam for back button work

    $(".modal").on("shown.bs.modal", function () { // any time a modal is shown
        var urlReplace = "#" + $(this).attr('id'); // make the hash the id of the modal shown
        history.pushState(null, null, urlReplace); // push state that hash into the url
    });

    // If a pushstate has previously happened and the back button is clicked, hide any modals.
    $(window).on('popstate', function () {
        location.reload(true);
    });

    $scope.$watch(WatchService.getCount, function (newVal) {
        if (newVal != undefined && newVal > 0) {
            $scope.CheckUserSecurity();
        }
        $scope.Getsession();
    }, true);

    $scope.$watch(WatchService.getGlShow, function (newVal) {
        if (newVal) {
            $scope.glShow = WatchService.getGlShow();
        }
    }, true);

    $scope.$watch(WatchService.getFHASLShow, function (newVal) {
        if (newVal) {
            $scope.fhaslShow = WatchService.getFHASLShow();
        }
    }, true);

    $scope.$watch(WatchService.getSPSShow, function (newVal) {
        if (newVal) {
            $scope.spsShow = WatchService.getSPSShow();
        }
    }, true);

    $scope.$watch(WatchService.getCAMBUShow, function (newVal) {
        if (newVal) {
            $scope.cambuShow = WatchService.getCAMBUShow();
        }
    }, true);

    $scope.$watch(WatchService.getSYSADMShow, function (newVal) {
        if (newVal) {
            $scope.sysadmShow = WatchService.getSYSADMShow();
        }
    }, true);

    $scope.$watch(WatchService.getADMShow, function (newVal) {
        if (newVal) {
            $scope.admShow = WatchService.getADMShow();
        }
    }, true);


    $scope.$watch(WatchService.getREPORTSShow, function (newVal) {
        if (newVal) {
            $scope.reportsShow = WatchService.getREPORTSShow();
        }
    }, true);

    //$scope.CheckUserSecurity = function () {
    //    var endpoint = "/Admin/CheckRoleSecurityControlMenu";
    //    $http({ method: 'GET', url: endpoint }).
    //    success(function (data, status, headers, config) {
    //        $scope.menuList = data;
    //        $scope.UserRole = data.UserRole;
    //        if ($scope.UserRole != "SuperAdmin" && $scope.UserRole != "Admin") {
    //            $location.path("Home");
    //        }            
    //        $scope.CheckUserWindowSecurity();
    //    }).
    //    error(function (data, status, headers, config) {
    //        error = status + " Request failed";
    //    });
    //}
    //$scope.CheckUserWindowSecurity = function () {
    //    var endpoint = "/Admin/CheckRoleSecurityControlMenuWindow";
    //    $http({ method: 'GET', url: endpoint }).
    //    success(function (data, status, headers, config) {

    //        $scope.menuListSub = data;



    //        $scope.IsCaseDetailsShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Case Detail');

    //        $scope.IsCaseFilingShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Case Filing');
    //        $scope.IsCaseRecordingShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Case Recording');
    //        $scope.IsCaseRecordingShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Case Recording');
    //        $scope.IsBorrowerShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Borrower');
    //        $scope.IsPropertyInspectionShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Property Inspection');
    //        $scope.IsServicingShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Servicing');
    //        $scope.IsBankruptcyShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Bankruptcy');
    //        $scope.IsForeclosureShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Foreclosure');
    //        $scope.IsREOShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'REO');
    //        $scope.IsLossMitigationShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Loss Mitigation');
    //        $scope.IsMortgageReleaseShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Mortgage Release');
    //        $scope.IsPayOffShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Pay Off');
    //        $scope.IsDisbursementShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Disbursement');
    //        $scope.IsTransactionShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Transaction');
    //        $scope.IsManualTransactionShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Manual Transaction');
    //        $scope.IsCashTransactionHistoryShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Cash Transaction History');
    //        $scope.IsClaimHistoryShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Claim History');
    //        $scope.IsPaymentScheduleShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Payment Schedule');
    //        $scope.IsBillingStatementShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Billing Statement');
    //        $scope.IsCaseHistoryShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Case History');
    //        $scope.IsReinstatementShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Reinstatement');
    //        $scope.IsExceptionShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Exception');
    //        $scope.IsDocumentsShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Documents');
    //        $scope.IsNotesShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Notes');
    //        $scope.IsManageDelinquencyShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Manage Delinquency');
    //        $scope.IsMthStatementShow = $scope.containsValue($scope.menuListSub.windowname, $scope.sessionStorage + 'Mth Statement');
    //    }).
    //    error(function (data, status, headers, config) {
    //        error = status + " Request failed";
    //    });
    //}
    //$scope.CheckRoleSecuritysubobject = function () {
    //    var endpoint = "/Admin/CheckRoleSecuritysubobject";
    //    $http({ method: 'GET', url: endpoint }).
    //    success(function (data, status, headers, config) {
    //        $scope.subojbectlist = data.subobjectlist;
    //    }).
    //    error(function (data, status, headers, config) {
    //        error = status + " Request failed";
    //    });
    //}
    //$scope.CheckRoleSecuritysubobject();
    //function SessionCtrl(event) {

    //    document.onkeydown = function (evt) {
    //        evt = evt || window.event;
    //        var keyCode = evt.keyCode;
    //    };

    //    var endpoint = "/Logout/CheckSession";
    //    // return $http.get(url);
    //    $http({ method: 'POST', url: endpoint, data: {} }).
    //    success(function (data, status, headers, config) {
    //        if (data.Error == 'Error') {
    //            location.reload(true);
    //            window.location.replace('/Home')
    //        } else {
    //            $scope.IsPageShow = true;
    //        }
    //    }).
    //    error(function (data, status, headers, config) {
    //        error = status + " Request failed";
    //    });
    //}

    $scope.ToJavaScriptDate = function (value) {
        var updateDate = '';
        if (value != '') {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);

            if (results != null) {
                var dt = new Date(parseFloat(results[1]));

                updateDate = (dt.getUTCMonth() + 1) + '/' + dt.getUTCDate() + '/' + dt.getUTCFullYear();
                if (updateDate == '1/1/1753' || dt.getFullYear() < '1900') {
                    updateDate = '';
                }
            }
        }
        return updateDate;
    }

    // Rajendra
    $scope.convertDatetoString = function (value) {
        if (value) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            if (results) {
                var dt = new Date(parseFloat(results[1]));
                //return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + dt.getUTCHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                var dateStr = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                if (dateStr === '1/1/1753') {
                    return '';
                } else {
                    return dateStr;
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    $scope.ToJavaScriptDateNew = function (value) {
        if (value) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            var dt = new Date(parseFloat(results[1]));
            var dateStr = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
            if (dateStr === '1/1/1753') {
                return '';
            } else {
                return dt.toLocaleString();
            }
        } else {
            return '';
        }
    }

    $scope.ToJavaScriptToDateTime = function (value) {
        var updateDate = '';
        if (value != '') {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            if (results != null) {
                var dt = new Date(parseFloat(results[1]));
                updateDate = (dt.getUTCMonth() + 1) + '/' + dt.getUTCDate() + '/' + dt.getUTCFullYear();
                if (updateDate == '1/1/1753' || dt.getUTCFullYear() < '1900') {
                    updateDate = '';
                } else {
                    var hours = dt.getUTCHours();
                    var minutes = dt.getUTCMinutes();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;
                    updateDate = (dt.getUTCMonth() + 1) + "/" + dt.getUTCDate() + "/" + dt.getUTCFullYear() + ", " + strTime;
                }
            }
        }
        return updateDate;
    }

    $scope.DateLong = function (value) {
        var updateDate = '';
        var l = 0;
        if (value != '') {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            if (results != null) {

                var dt = new Date(parseFloat(results[1]));
                var updateDate = (dt.getUTCMonth() + 1) + '/' + dt.getUTCDate() + '/' + dt.getUTCFullYear();
                if (updateDate == '1/1/1753' || dt.getUTCFullYear() < '1900') {
                    l = '';
                } else {
                    l = parseFloat(results[1]);
                }
            }
        }
        return l;
    }

    $scope.logout = function () {
        var endpoint = "/Logout/Logout";
        $http({ method: 'POST', url: endpoint }).
            success(function (data, status, headers, config) {
                if (data.Error == "Success") {
                    $scope.homeCall();
                    location.reload(true);
                    window.location.replace('/Home')
                }
            }).
            error(function (data, status, headers, config) {
                error = status + " Request failed";
            });

    }

};

appAdmin.factory("WatchService", function () {
    var count = 0;
    var glShow = 0;
    var fhaslShow = 0;
    var spsShow = 0;
    var cambuShow = 0;
    var sysadmShow = 0;
    var admShow = 0;
    var reportsShow = 0;
    return {

        getCount: function () {
            return count;
        },

        setCount: function () {
            count++;
        },

        getGlShow: function () {
            return glShow;
        },

        setGlShow: function (flag) {
            glShow = flag;
        },
        getFHASLShow: function () {
            return fhaslShow;
        },

        setFHASLShow: function (flag) {
            fhaslShow = flag;
        },

        getCAMBUShow: function () {
            return cambuShow;
        },

        setCAMBUShow: function (flag) {
            cambuShow = flag;
        },

        getSPSShow: function () {
            return spsShow;
        },

        setSPSShow: function (flag) {
            spsShow = flag;
        },

        getSYSADMShow: function () {
            return sysadmShow;
        },

        setSYSADMShow: function (flag) {
            sysadmShow = flag;
        },

        getADMShow: function () {
            return admShow;
        },

        setADMShow: function (flag) {
            admShow = flag;
        },

        getREPORTSShow: function () {
            return reportsShow;
        },

        setREPORTSShow: function (flag) {
            reportsShow = flag;
        }

    }

});

appAdmin.run(function ($rootScope, $route, $location) {

    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () { return $location.path() }, function (newLocation, oldLocation) {
        if ($rootScope.actualLocation === newLocation) {

        }
    });
});

appAdmin.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

appAdmin.directive('progressbar', [function () {
    return {
        restrict: 'A',
        scope: {
            'progress': '=progressbar'
        },
        controller: function ($scope, $element, $attrs) {
            $element.progressbar({
                value: $scope.progress
            })

            $scope.$watch(function () {
                $element.progressbar({ value: $scope.progress })
            })
        }
    }
}]);

appAdmin.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
}]);

appAdmin.directive('uploadFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var file_uploaded = $parse(attrs.uploadFile);

            element.bind('change', function () {
                scope.$apply(function () {
                    file_uploaded.assign(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

appAdmin.filter("nl2br", function ($filter) {
    return function (data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
    };
});

appAdmin.filter('myLimitTo', function () {
    return function (input, limit, begin) {
        return input.slice(begin, begin + limit);
    };
});

appAdmin.filter("mydate", function () {
    return function (filterDate) {
        var date = new Date(parseInt(filterDate.substr(6)));
        var chkdate = date.toLocaleDateString();
        var year = date.getUTCFullYear();
        if (filterDate == '/Date(-6847781400000)/' && year < '1900' || chkdate == '1/1/1753' && year < '1900')
            return '-'
        else
            return date;
    };
});
//edit by shivam for not storing data in IE9 inside cache because page is not refreshing
appAdmin.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

appAdmin.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function () {
                element.datepicker({
                    // dateFormat: 'dd-MM-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: new Date(1940, 1 - 1, 26),
                    maxDate: new Date(2050, 1 - 1, 26),
                    yearRange: "1940:2050",
                    dateFormat: 'mm/dd/yy',
                    onSelect: function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});


appAdmin.directive('datepicker2', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function () {
                element.datepicker({
                    // dateFormat: 'dd-MM-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: new Date(1940, 1 - 1, 26),
                    maxDate: new Date(),
                    yearRange: "1940:2050",
                    dateFormat: 'mm/dd/yy',
                    onSelect: function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});

appAdmin.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/Home21', {
            templateUrl: '/Scripts/Home/Index.html',
            controller: ''
        }).when('/PropertyDescriptionCode', {
            templateUrl: '/Scripts/Smart/PropertyDescriptionCode.html',
            controller: 'schedulerCtl'
        })
    }
]);




