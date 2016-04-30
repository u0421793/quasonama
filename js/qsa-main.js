/* this brings in the segments - the base layer */
function helloSegments() {
    $("#left-hemipan-segment").fadeIn(400, function () {
        $("#right-hemipan-segment").fadeIn(400, function () {
            $("#left-120-arrow-arc").fadeIn(400, function () {
                $("#zerodegrees").fadeIn(400, function () {
                    $("#right-120-arrow-arc").fadeIn(400, function () {
                        $("#legend-segments").delay(300).fadeIn(400, function () {
                            $("#listener-egocentre").delay(150).fadeIn(200);
                        });
                    });
                });
            });
        });
    });
}

/* this hides the segments, used initially */
function goodbyeSegments() {
    $("#left-hemipan-segment").hide();
    $("#right-hemipan-segment").hide();
    $("#left-120-arrow-arc").hide();
    $("#right-120-arrow-arc").hide();
    $("#listener-egocentre").hide();
    $("#legend-segments").hide();
    $("#zerodegrees").hide();
}

/* this shows another layer for the speaker positions */
function helloSpeakerSequence() {
    $("#left-inboard-speaker").fadeIn(800, function () {
        $("#left-outboard-speaker").fadeIn(800, function () {
            $("#right-inboard-speaker").fadeIn(800, function () {
                $("#right-outboard-speaker").fadeIn(800, function () {
                    $("#legend-speaker").delay(750).fadeIn(400, function () {
                        $("#left-summed-image").delay(1200).fadeIn(400, function () {
                            $("#right-summed-image").delay(500).fadeIn(400);
                        });
                    });
                });
            });
        });
    });
}

/* this hides the speaker positions */
function goodbyeSpeakerSequence() {
    $("#left-summed-image").hide();
    $("#right-summed-image").hide();
    $("#left-inboard-speaker").hide();
    $("#left-outboard-speaker").hide();
    $("#right-inboard-speaker").hide();
    $("#right-outboard-speaker").hide();
    $("#legend-speaker").hide();
}

/* this shows another layer for the mic positions */
function helloMicSequence() {
    $("#left-inboard-mic").fadeIn(800, function () {
        $("#left-outboard-mic").fadeIn(800, function () {
            $("#right-inboard-mic").fadeIn(800, function () {
                $("#right-outboard-mic").fadeIn(800, function () {
                    $("#legend-microphone").delay(750).fadeIn(400, function () {
                        $("#left-X-Y-mic-array").delay(1200).fadeIn(400, function () {
                            $("#right-X-Y-mic-array").delay(500).fadeIn(400);
                        });
                    });
                });
            });
        });
    });
}

/* this hides the mic positions */
function goodbyeMicSequence() {
    $("#left-X-Y-mic-array").hide();
    $("#right-X-Y-mic-array").hide();
    $("#left-inboard-mic").hide();
    $("#left-outboard-mic").hide();
    $("#right-inboard-mic").hide();
    $("#right-outboard-mic").hide();
    $("#legend-microphone").hide();
}

/* as soon as we can we clear everything from view */
goodbyeSegments();
goodbyeSpeakerSequence();
goodbyeMicSequence();


/* sequence the text in the playout and capture buttons */
/* this wasn’t used in the end */
var captureTextSequence = ['record', 'mic', 'input', 'create', 'detect', 'capture'];
var playoutTextSequence = ['listen', 'speaker', 'output', 'consume', 'emanate', 'playout'];
var captureButton = "capture-button";
var playoutButton = "playout-button";

function buttonTextSequencer(textSequence, whichButton) {
    var i = 0;
    setInterval(function () { // setInterval — a continuous periodic activity
        document
            .getElementById(whichButton)
            .innerHTML = textSequence[i++] + " positions"; // get the item and increment i to move to the next
        if (i == textSequence.length) i = 0; // reset to first element if you've reached the end
    }, 4000);
}


/* do the actual stuff, for real, once the page exists */
$(document).ready(function () {

    //  buttonTextSequencer(captureTextSequence, captureButton);
    //  buttonTextSequencer(playoutTextSequence, playoutButton);

    /* define a pair of click handlers for the buttons */

    $("#playout-button").click(function () {
        $("#legend-segments").hide();
        goodbyeMicSequence();
        goodbyeSpeakerSequence();
        helloSpeakerSequence();
        /* hide the capture-button until the playout overlay is fully built */
        $("#capture-button").animate({
            opacity: '0'
        }, function () {
            $("#capture-button").delay(7000).animate({
                opacity: '1'
            });
        });
    });

    $("#capture-button").click(function () {
        $("#legend-segments").hide();
        goodbyeSpeakerSequence();
        goodbyeMicSequence();
        helloMicSequence();
        /* hide the playout-button until the capture overlay is fully built */
        $("#playout-button").animate({
            opacity: '0'
        }, function () {
            $("#playout-button").delay(7000).animate({
                opacity: '1'
            });
        });
    });



    /* draw the base layer segments */
    helloSegments();

    /* build a TOC menu, which will be in the aside element */
    $("h2").each(function (i) {
        /* this code is derived from http://www.jankoatwarpspeed.com/automatically-generate-table-of-contents-using-jquery/ */
        /* but I want to add a class=selected to the first one */
        if (i > 0) {
            pick = "";
        } else {
            pick = "selected";
        }
        var current = $(this);
        current.attr("id" + i);
        $("#tocmenu").append("<li class='" + pick + "'><a id='selection" + i + "' href='#section" + i + "'>" + current.html() + "</a></li>");
    });

    /* show the appropriate main section layer when that TOC entry is clicked */
    /* this is from here - http://www.mkyong.com/jquery/how-to-use-css-and-jquery-to-hide-and-show-tab-content/ */
    $('#tocmenu > li > a').click(function (event) {
        event.preventDefault(); //stop browser to take action for clicked anchor                      

        //get displaying tab content jQuery selector
        var active_tab_selector = $('#tocmenu > li.selected > a').attr('href');

        //find actived navigation and remove 'active' css
        var actived_nav = $('#tocmenu > li.selected');
        actived_nav.removeClass('selected');

        //add 'active' css into clicked navigation
        $(this).parents('li').addClass('selected');

        //hide displaying tab content
        $(active_tab_selector).removeClass('apparent');
        $(active_tab_selector).addClass('obscured');

        //show target tab content
        var target_tab_selector = $(this).attr('href');
        $(target_tab_selector).removeClass('obscured');
        $(target_tab_selector).addClass('apparent');
    });

});