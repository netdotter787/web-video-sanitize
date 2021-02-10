const ADS_OF_COUNT = '.ytp-ad-player-overlay-instream-info';
const ADS_OVERLAY = '.ytp-ad-overlay-container';
const BRANDING_OVERLAY = '.branding-img-container';
const ADS_SKIP_BTN = 'button.ytp-ad-skip-button.ytp-button';

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

function init()
{

    if(document.getElementById('player-container')) {
        cleanUp();
    }
    window.requestAnimationFrame(init);

}

function getSelector(selector)
{
    return document.querySelector(selector);
}

function cleanUp()
{
    let ytPlayer = {
        adsCountSelector: getSelector(ADS_OF_COUNT),
        adsOverlay: getSelector(ADS_OVERLAY),
        brandingOverlay: getSelector(BRANDING_OVERLAY),
        adsSkipBtn: getSelector(ADS_SKIP_BTN)
    };

    if(ytPlayer.adsCountSelector) {
        console.log("Count to be hidden");
        ytPlayer.adsCountSelector.remove();
    }

    if(ytPlayer.adsOverlay) {
        console.log("Cleaning ads");
        ytPlayer.adsOverlay.remove();
    }

    if(ytPlayer.brandingOverlay) {
        console.log("Cleaning Branding");
        ytPlayer.brandingOverlay.remove();
    }

    if(ytPlayer.adsSkipBtn) {
        console.log("To be skipped");
        ytPlayer.adsSkipBtn.click();
    }
}


window.requestAnimationFrame(init);