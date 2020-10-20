renderHeader();

export function renderHeader(){

    const header = document.getElementsByTagName('header')[0];


    var headerString = '<div id=\'header-container\' class=\'flex-row space-between\'>' +
    '            <h1 class=\'left-margin header-h1\'>T<sup>4</sup> XOXO</h1>' +
    '            <div class = \'flex-row\'>' +
    '                <div id = \'icon-group\' class = \'flex-row\'>' +
    '                    <div id = \'home-div\' class = \'flex-column justify-center\'>' +
    '                        <a href = \'../index.html\'><img class = \'header-icons\' id=\'home\' title=\'Home\' src=\'../assets/reset.svg\'></a>' +
    '                        <label class=\'header-label\'>Reset</label>' +
    '                    </div>' +
    '                    <div id = \'play-div\' class = \'flex-column justify-center\'>' +
    '                        <a href = \'../game-page/index.html\'><img class = \'header-icons\' id=\'play\' title=\'Play\' src=\'../assets/play.svg\'></a>' +
    '                        <label class=\'header-label\'>Play</label>  ' +
    '                    </div>' +
    '                    <div id = \'results-div\' class = \'flex-column justify-center\'>' +
    '                        <a href = \'../results/index.html\'><img class = \'header-icons\' id=\'results\' title=\'Results\' src=\'../assets/results.svg\'></a>' +
    '                        <label class=\'header-label\'>Results</label>  ' +
    '                    </div>' +
    '                    <div id = \'devs-div\' class = \'flex-column justify-center\'>' +
    '                        <a href = \'../about/index.html\'><img class = \'header-icons\' id=\'devs\' title=\'Devs\' src=\'../assets/devs.svg\'></a>' +
    '                        <label class=\'header-label\'>Devs</label>  ' +
    '                    </div>' +
    '                </div>    ' +
    '            </div>' +
    '        </div>';
        
    
        
    header.innerHTML = headerString;

}

