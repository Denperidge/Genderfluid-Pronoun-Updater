function FacebookIntegration(gendercode) {
    // These are the selectors to be used to find the controls on Facebook
    var editGenderButtonSelector = "div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(2) > div";

    var editGenderSelectboxSelector= "div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(4) > div:nth-child(2) > div";

    // For selector syntax with startswith/endswith https://stackoverflow.com/a/8714421
    var mOptionSelector = "div[id^=jsc][id$='1']";
    var fOptionSelector = "div[id^=jsc][id$='0']";
    var nOptionSelector = "div[id^=jsc][id$='2']";
    
    var saveButtonSelector = "div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div:nth-child(2)";


    setTimeout(()=>{
        console.log("Clicking edit...")
        document.querySelector(editGenderButtonSelector).click();
        console.log(editGenderButtonSelector);


        setTimeout(()=> {
            console.log("Clicking select...")
            document.querySelector(editGenderSelectboxSelector).click();
            console.log(editGenderSelectboxSelector);

            setTimeout(() => {
                var optionSelector;
                if (gendercode == "m") optionSelector = mOptionSelector;
                else if (gendercode == "f") optionSelector = fOptionSelector;
                else option = nOptionSelector;
        
                console.log("Clicking option...");
                console.log(optionSelector);
                document.querySelector(optionSelector).click();

                setTimeout(() => {
                    console.log("Clicking save...");
                    console.log(saveButtonSelector);
                    document.querySelector(saveButtonSelector).click();
                }, 500)
            }); 
        }, 500)
    }, 500)
}