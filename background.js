
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        "oldPronouns": "",
        "integrations": {
            "facebook": false,
            "discordStatus": false
        }
    });
});
