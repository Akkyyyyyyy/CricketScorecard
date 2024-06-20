$(document).ready(function () {
    var currentTeam = 'a';
    $('.scoreboard').hide();
    $('button').click(function(){
    
    });
    
    
    
    $('#setupModal').show();

    var teamAName,teamBName;
    $('#setupForm').submit(function (event) {
        event.preventDefault();
        teamAName = $('#teamAName').val();
        teamBName = $('#teamBName').val();
        const totalOvers = $('input[name="totalOvers"]:checked').val();

        $('#team-a .team-name').text(teamAName);
        $('#team-b .team-name').text(teamBName);

        window.totalOvers = totalOvers;
        $('.title .match').text(teamAName +" VS "+ teamBName+ "("+ window.totalOvers +" Overs)")
        $('#setupModal').hide();
        $('.scoreboard').show();
    });
    var ballsRemaining;
    var noBall = false;
    function addBall(overs, balls) {

        if(currentTeam=='a'){
            var runs = $('#team-a .runs');
            var overs = $('#team-a .overs');
            var balls = $('#team-a .balls');
        }else{
            var runs = $('#team-b .runs');
            var overs = $('#team-b .overs');
            var balls = $('#team-b .balls');
        }
        var rrRuns = parseInt(runs.text()) || 0;
    var rrBalls = parseInt(balls.text()) || 0;
    var rrOvers = parseInt(overs.text()) || 0;
    var rrTotalBalls = rrOvers*6 + rrBalls +1
    var rr = rrRuns/rrTotalBalls * 6 || 0;
    // console.log("runs :"+ rrRuns);
    // console.log("balls :"+ rrTotalBalls);
    $('.rr').text("Current Runrate: " + rr);

        var totalOvers = window.totalOvers;
        var currentBalls = parseInt(balls.text()) || 0;
        var currentOvers = parseInt(overs.text()) || 0;
        var flag=false;
        

        if (noBall == true ){
            if(currentTeam=='a'){
                noBall = false;
            }
        }
        else{
            if (currentBalls + 1 === 6) {
                overs.text(currentOvers + 1);
                balls.text(0);
            }
            else {
                balls.text(currentBalls + 1);

            }
        }
        var runs = $('#team-a .runs');
        var target = parseInt(runs.text()) + 1 || 0;
        //if ((currentOvers === totalOvers - 1 && currentBalls === 5)  ) {
        // console.log(overs.text()+'overs');
        // console.log(balls.text()+'balls');
        // console.log("("+overs.text() +" === "+ totalOvers +" && "+ balls.text()+" === "+ 0 +")");
            if ((overs.text() == totalOvers && balls.text() == 0)  ) {
            if (currentTeam === 'b') {
                ballsRemaining = 1;
            } else {
                currentTeam = 'b';
                currentOvers = 0;
                currentBalls = 0;
                ballsRemaining = totalOvers * 6 + 1
                $('.target').text("Target: " + target);
            }
        }
        
        wickets = $('#team-a .wickets');
        wicket = $('#team-b .wickets');
        var currentWicket = parseInt(wicket.text()) || 0;
        var currentWickets = parseInt(wickets.text()) || 0;
        if (currentWickets === 10 && currentTeam === 'a') {
            currentTeam = 'b';
            currentOvers = 0;
            currentBalls = 0;
            ballsRemaining = totalOvers * 6 + 1
        }
        
        
        if (currentTeam === 'b') {
            const teamBRuns = $('#team-b .runs');
            const runChase = parseInt(teamBRuns.text()) || 0;
            const remainingRuns = target - runChase;
            if (noBall === false) {
                ballsRemaining = ballsRemaining - 1;
            } else {
                noBall = false
            }

            console.log("runs :"+ runChase);
    console.log("balls :"+ ballsRemaining);
            const rrr = remainingRuns/ballsRemaining * 6
            $('.rrr').text("Required Runrate: " + rrr);
            // console.log("currentOvers" + currentOvers + ",ballsRemaining" + ballsRemaining);
            $('.need').text(remainingRuns + ' runs from ' + ballsRemaining + ' balls');
            if (remainingRuns <= 0 && ballsRemaining >= 0) {
                wickets = $('#team-b .wickets');
                var currentWickets = 10 - parseInt(wickets.text()) || 0;
                $('.need').text(teamBName+' won by ' + currentWickets + ' wickets');
                $('.controls, .rr, .rrr').css('display', 'none');
                
                
            }
            else if (remainingRuns === 1 && ballsRemaining === 0) {
                $('.need').text('Draw!!!');
                $('.controls, .rr, .rrr').css('display', 'none');
            }
            else if (ballsRemaining < 1 && remainingRuns >= 2) {
                var Run = remainingRuns - 1;
                $('.need').text(teamAName+' won by ' + Run + ' runs');
                $('.controls, .rr, .rrr').css('display', 'none');
            }
            else if (currentWicket === 10) {
                var Run = remainingRuns - 1;
                $('.need').text(teamAName+' won by ' + Run + ' runs');
                $('.controls, .rr, .rrr').css('display', 'none');
            }
        }

    }
    

    $('.zero-btn').click(function () {
        if (currentTeam === 'a') {
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }

        addBall(overs, balls)
    });
    $('.wide-btn').click(function () {
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
        } else {
            runs = $('#team-b .runs');
        }
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 1);
        
    });
    $('.wicket-btn').click(function () {
        if (currentTeam === 'a') {
            wickets = $('#team-a .wickets');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            wickets = $('#team-b .wickets');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
        var currentWickets = parseInt(wickets.text()) || 0;
        wickets.text(currentWickets + 1);

        addBall(overs, balls)
    });

    $('.no-btn').click(function () {
        
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            runs = $('#team-b .runs');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 1);
        noBall = true;
        // addBall(overs, balls)

    });
    $('.one-btn').click(function () {
        
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            runs = $('#team-b .runs');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 1);
        addBall(overs, balls)
    });
    $('.two-btn').click(function () {
        
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            runs = $('#team-b .runs');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 2);
        addBall(overs, balls)
    });
    $('.three-btn').click(function () {
        
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            runs = $('#team-b .runs');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 3);
        addBall(overs, balls)
    });
    $('.four-btn').click(function () {
        
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            runs = $('#team-b .runs');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 4);

        addBall(overs, balls)
    });
    $('.five-btn').click(function () {
        
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            runs = $('#team-b .runs');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 5);
        addBall(overs, balls)
    });
    $('.six-btn').click(function () {
        
        
        if (currentTeam === 'a') {
            runs = $('#team-a .runs');
            overs = $('#team-a .overs');
            balls = $('#team-a .balls');
        } else {
            runs = $('#team-b .runs');
            overs = $('#team-b .overs');
            balls = $('#team-b .balls');
        }
            
        var currentRuns = parseInt(runs.text()) || 0;
        runs.text(currentRuns + 6);
        
        addBall(overs, balls)

    });

});