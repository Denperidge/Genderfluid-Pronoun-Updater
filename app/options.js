var integrations;
chrome.storage.sync.get(["integrations", "reminderInterval"], (result) => {
    integrations = result.integrations;

    var integrationKeys = Object.keys(integrations);
    for (var i = 0; i < integrationKeys.length; i++) {
        var key = integrationKeys[i];
        $(`[name=${key}]`).prop("checked", integrations[key])
    }

    $("#reminderInterval").val(result.reminderInterval);
});


$(".integration").change((e) => {
    var target = e.target;
    integrations[target.name] = target.checked;

    chrome.storage.sync.set({
        "integrations": integrations
    });
});

// TODO remove host permissions after the integration gets disabled 

$("#reminderInterval").change((e) => {
    console.log(e);
    chrome.storage.sync.set({
        "reminderInterval": e.target.value
    });
});