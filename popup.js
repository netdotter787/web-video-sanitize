function setParams()
{
    chrome.storage.local.get(["settings"], function(items) {
        let options = document.querySelectorAll('.option-value');        
        options.forEach((item) => {
            item.checked = items.settings[item.getAttribute('name')] === 1 ? true : false;            
        });
    });
}

document.addEventListener('click', function (event) {
    if (!event.target.matches('.option-value')) return;
    
    
    
    let items = document.querySelectorAll('.option-value');
    let options = {};
    items.forEach((item) => { 
        options[item.getAttribute('name')] = item.checked ? 1 : 0 
    });

    chrome.storage.local.set({ settings: options}, function(){
        console.log('Saved config');
        console.log(options);
    });
});

setParams();