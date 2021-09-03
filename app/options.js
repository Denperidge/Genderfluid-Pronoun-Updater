var integrations;
chrome.storage.sync.get(['integrations'], (result) => {
    integrations = result.integrations;
});


$("input[type=checkbox]").change((e) => {
    var target = e.target;
    integrations[target.name] = target.checked;

    chrome.storage.sync.set({
        "integrations": integrations
    });
});