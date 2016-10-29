/**
 * Created by sophia on 10/19/16.
 */
$(document).ready(function() {

    /*names are given from problem. use these to look up display_name. Two separate API links are used, the only commonality in the data between the two is display_name*/
    var names = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404"];

    /*match the given names to the display_name*/
    function doPull() {
        for (var k = 0; k < names.length; k++) {
            function doCall(userName) {
                $.ajax({
                    url: 'https://api.twitch.tv/kraken/users/' + userName,
                    dataType: 'jsonp'
                }).done(function(data) {
                    if (data) {
                        displayNameRow(data.display_name, userName);
                        displayLogoColumn(data.logo, userName);
                    }
                });
            }
            doCall(names[k])
        }
    }
    /*function doPull end*/

    doPull();

    /*results in the display_name. inputs supplied by function above. push into HTML, and establish the 3-column layout of the HTML*/
    var displayNameRow = function(displayName, userName) {
        /*console.log('displayRow' + userName);*/
        $(".userStatus").append('<div class="row ' + userName + ' eachRow"><div class="col-md-1"></div><div class="col-md-2 displayCurrentLogo"></div><div class="col-md-8 main"><div class="row status"><div class="col-md-4 name"><a target="_blank">' + displayName + '</a></div><div class="col-md-4 displayStatus"></div></div><div class="row streaming"></div></div><div class="col-md-1"></div></div>');
        /*run function isActive in here to ensure that userName has been established*/
        isActive(userName);
        userURL(userName);
    };
    /*var displayNameRow end*/

    var displayLogoColumn = function(displayLogo, userName) {
        if (displayLogo === null) {
            $(".userStatus ." + userName + " .displayCurrentLogo").text("?").addClass("noImage")
        } else {
            $(".userStatus ." + userName + " .displayCurrentLogo").html('<img src=\"' + displayLogo + '\"/>');
        }
    };

    function userURL(userName) {
        var endpoint = "https://api.twitch.tv/kraken/channels";
        $.ajax({
            url: 'https://api.twitch.tv/kraken/channels/' + userName,
            dataType: 'jsonp'
        }).done(function(data) {
            if (data) {
                displayUserURL(data.url, userName);
                displayCurrentStream(data.status, userName);
            }
        });
    }
    var post;
    var displayCurrentStream = function(currentStream, userName) {
        post = currentStream;
    };
    /*comes before isActive function to establish the displayStatusColumn function used in isActive.?? convert the displayStatus code to the desired name. then push name to HTML*/
    var displayStatusColumn = function(displayStatus, userName) {
        if (displayStatus === null) {
            displayStatus = 'Offline';
        } else if (displayStatus) {
            displayStatus = 'Online';
            $(".userStatus ." + userName + " .main .streaming").html('<div> currently streaming -  ' + post + '</div>');
        } else {
            displayStatus = 'Account Closed';
        }
        $(".userStatus ." + userName + " .displayStatus").html('<div>' + displayStatus + '</div>').attr('data-displaystatus', displayStatus);
    }
    /*var displayStatusColumn end*/

    var displayUserURL = function(displayURL, userName) {
        $(".userStatus ." + userName + " .name a").attr('href', displayURL);
    }

    /*pulls weather user is online or offline. comes after the function is being called as it is read from top to bottom*/
    function isActive(userName) {
        var endpoint = "https://api.twitch.tv/kraken/streams";
        $.ajax({
            url: 'https://api.twitch.tv/kraken/streams/' + userName,
            dataType: 'jsonp'
        }).done(function(data) {
            /* console.log({
             userName: userName,
             data: data
             });*/
            if (data) {
                displayStatusColumn(data.stream, userName);
            }
        });
    }
    /*function isActive end*/
    $('[name="filter"]').on("click", function() {
        $('.displayStatus').closest('.eachRow').show();
        if ($(this).attr('data-filter') === 'online') {
            $('.displayStatus').filter('[data-displaystatus!="Online"]').closest('.eachRow').hide();
        } else if ($(this).attr('data-filter') === 'offline') {
            $('.displayStatus').filter('[data-displaystatus!="Offline"]').closest('.eachRow').hide();
        }
    })

});
/*document ready end*/
/*


 /*return val id !== online*/