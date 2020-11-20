export function renderHeader(page) {

    const header = document.getElementsByTagName('header')[0];
    let str = '..';

    if (page === 'home'){
        str = '.';
    }

    // huh, so why couldn't this have been done using the DOM api?
    var headerString = '<div id=\'header-container\' class=\'flex-row space-between\'>' +
        '            <h1 class=\'left-margin header-h1\'>T<sup>4</sup> xoxo</h1>' +
        '            <div class = \'flex-row\'>' +
        '                <div id = \'icon-group\' class = \'flex-row\'>' +
        '                    <div class = \'flex-column justify-center\'>' +
        '                        <a href = \'' + str + '/index.html\' class = \'header-links\'><img class = \'header-icons\' id=\'home\' title=\'Home\' src=\'' + str + '/assets/reset.svg\'></a>' +
        '                        <label class=\'header-label\'>Reset</label>' +
        '                    </div>' +
        '                    <div id = \'play-div\' class = \'flex-column justify-center\'>' +
        '                        <a href = \'' + str + '/game-page/index.html\' class = \'header-links\'><img class = \'header-icons\' id=\'play\' title=\'Play\' src=\'' + str + '/assets/play.svg\'></a>' +
        '                        <label class=\'header-label\'>Play</label>  ' +
        '                    </div>' +
        '                    <div id = \'results-div\' class = \'flex-column justify-center\'>' +
        '                        <a href = \'' + str + '/results/index.html\' class = \'header-links\'><img class = \'header-icons\' id=\'results\' title=\'Results\' src=\'' + str + '/assets/results.svg\'></a>' +
        '                        <label class=\'header-label\'>Results</label>  ' +
        '                    </div>' +
        '                    <div class = \'flex-column justify-center\'>' +
        '                        <a href = \'' + str + '/about/index.html\' class = \'header-links\'><img class = \'header-icons\' id=\'devs\' title=\'Devs\' src=\'' + str + '/assets/devs.svg\'></a>' +
        '                        <label class=\'header-label\'>Devs</label>  ' +
        '                    </div>' +
        '                </div>    ' +
        '            </div>' +
        '        </div>';

    header.innerHTML = headerString;

}