const SETTINGS = {};
const ELEMENT_CONFIG = {
    adsOfCount: '.ytp-ad-player-overlay-instream-info',
    adsOverlay: '.ytp-ad-overlay-container',
    brandingOverlay: '.branding-img-container',
    adsSkipBtn: 'button.ytp-ad-skip-button.ytp-button',
    closingElements: '.ytp-ce-element'
}

function init()
{
    if(document.getElementById('player-container'))
        cleanUp();

    window.requestAnimationFrame(init);

}

function getSelector(selector) { return document.querySelector(selector); }

function getAllFromSelector(selector) { return document.querySelectorAll(selector); }

function cleanUp()
{
    chrome.storage.local.get(["settings"], function(items) {
        if('settings' in items) {
            for(let config in items.settings) {
                SETTINGS[config] = items.settings[config];
            }
        }
    });

    let ytPlayer = {
        adsCountSelector: getSelector(ELEMENT_CONFIG.adsOfCount),
        adsOverlay: getSelector(ELEMENT_CONFIG.adsOverlay),
        brandingOverlay: getSelector(ELEMENT_CONFIG.brandingOverlay),
        adsSkipBtn: getSelector(ELEMENT_CONFIG.adsSkipBtn),
        closingElements: getAllFromSelector(ELEMENT_CONFIG.closingElements)
    };

    if(ytPlayer.adsCountSelector) {
        console.log("Count to be hidden");
        ytPlayer.adsCountSelector.remove();
    }

    if(isEnabled('hide_overlay_ads') && ytPlayer.adsOverlay) {
        console.log("Cleaning ads");
        ytPlayer.adsOverlay.remove();
    }

    if(isEnabled('hide_branding_overlay') && ytPlayer.brandingOverlay) {
        console.log("Cleaning Branding");
        ytPlayer.brandingOverlay.remove();
    }

    if(isEnabled('auto_skip_adds') && ytPlayer.adsSkipBtn) {
        console.log("To be skipped");
        ytPlayer.adsSkipBtn.click();
    }

    if(isEnabled('hide_closing_elements') && ytPlayer.closingElements && ytPlayer.closingElements.length > 0) {
    	console.log("Remove closing element");
    	removeElements(ytPlayer.closingElements);
    }
}

function removeElements(elements)
{
	elements.forEach(function(item, index) { 
		item.remove();
	});
}

function isEnabled(property)
{
    return SETTINGS[property] === 1 ? true : false;
}


window.requestAnimationFrame(init);
