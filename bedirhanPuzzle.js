$("#finish").hide(); 
$(".hint").toggle(); // we have hint divs on html so we need to hide them first

$(document).ready(function () { // when document ready 
    //mouse on the button i couldn't sure that you want hover or mouseover so wrote mouseover
    $(":button").mouseover(function(){
        $(this).css({ "border-radius": "50px", "color": "darkred" ,"cursor": "grabbing" })
    })  
    $(":button").mouseout(function(){
        $(this).css({ "border-radius": "29px", "color": "black"  })
    })  
   
    var i = 0, top, left;
    // puzzle parts divided divs
    for (var r = 1; r < 4; r++) {
        for (var c = 1; c < 4; c++) {
            i += 1;
            top = (r - 1) * 100;
            right = (3 - c) * 100;
            $('#p' + i).css({ 'top': top + 'px' }).css({ 'right': right + 'px' })
        }
    }
    // Putting pieces in random positions
    i = 0;
    for (var r = 1; r < 4; r++) {
        for (var c = 1; c < 4; c++) {
            i += 1;
            top = Math.floor((Math.random() * 201));

            right = Math.floor((Math.random() * 201));
            $('#' + i).css({ 'top': top + 'px' }).css({ 'right': right + 'px' });

        }
    }
    // creating send to clone selected div to append puzzle part
    var $send;
    $("#main").on("click", function (chose) {


      
        if ($('#' + chose.target.id).hasClass("piece")) {
            $(".selected").removeClass("selected").css("border", "1px lightgray solid");
            $('#' + chose.target.id).addClass("selected").css("border", "yellow 2px solid");
            $send = $(".selected").clone().css({ "top": "0px", "right": "0px" }).removeClass("selected").css("border", "0").addClass(chose.target.id);
            $send.children().first().addClass("hintRemover").removeClass("hint");
        }

        $("#main").on("click", function (put) {
            // if later selection user click on puzzle part, append selected div to there
            if ($('#' + put.target.id).hasClass("puzz")) {
                if ($('#' + chose.target.id).hasClass("selected")) {
                    $send.addClass("put");
                    $('#' + put.target.id).append($send);
                    $('#' + put.target.id).addClass("piece");
                    $(".selected").removeClass("selected").css("border", "2px lightgray solid").removeClass("piece").fadeOut(500);
                    $(".put").fadeIn();
                    finish(); // call it to calculate score to show display
                }
            }
        })

        $("#main").on("click", function (geri) {
            // if user click an putted div send it to original position
            if ($('.' + geri.target.id).hasClass("put")) {
                $('#' + geri.target.id).addClass("piece").fadeIn(1000);
                if ($(".selected").length > 0) {
                    $('.' + geri.target.id).parent().append($send).addClass("piece");
                    $send.addClass("put");
                     finish();
                }
                $(".selected").removeClass("selected").css("border", "2px lightgray solid").removeClass("piece").fadeOut(500);
                $('.' + geri.target.id).parent().removeClass("piece");
                $('.' + geri.target.id).remove();
                }
            })
        })
        
        //hint show and hide
        $("button").on("click", function (btn) {
            $(".hint").toggle();
        })

        //calculate are all pieces in the correct positions
        function finish(){
        var finishIt=0;
        $("#puzzle").children().each(function(index){
            if($(this).children().hasClass(index+1)){
                finishIt++;
            }
        })
    
        // finishing interval 
        if(finishIt==9){    
            $("#finish").fadeIn(1000);
            setInterval(function(){
                $("#finish").fadeOut(1500)
            },3500)
        }
        console.log(finishIt)
        finishIt=0; // because finish function is called when a div append so we need to check all the puzzle pieces from begening
    }
})

