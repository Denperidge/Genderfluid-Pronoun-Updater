function FacebookIntegration(gendercode) {


    // These are the selectors to be used to find the controls on Facebook
    var editGenderButton = {
        selector: "div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(2) > div",
        domObject: null,
    }

    var editGenderSelectbox = {
        selector: "div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(4) > div:nth-child(2) > div",
        domObject: null
    }

    // https://stackoverflow.com/a/8714421

    var mOption = {
        selector: "div[id^=jsc][id$='1']",
        domObject: null
    }

    var fOption = {
        selector: "div[id^=jsc][id$='0']",
        domObject: null
    }

    var nOption = {
        selector: "div[id^=jsc][id$='2']",
        domObject: null
    }

    var saveButtonSelector = "div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div > div:nth-child(2)";

    console.log(gendercode)

    console.log("Clicking edit...")

    console.log(editGenderButton.selector)

    setTimeout(()=>{

        //editGenderButton.domObject = document.querySelector(editGenderButton.selector);
        //editGenderButton.domObject.click();
        document.querySelector(editGenderButton.selector).click();

        setTimeout(()=> {

            console.log("Clicking select...")

            //editGenderSelectbox.domObject = document.querySelector(editGenderSelectbox.selector);
            console.log("Clicking edit...")
            //editGenderSelectbox.domObject.click();
            document.querySelector(editGenderSelectbox.selector).click();

            console.log("Clicking option...")

            setTimeout(() => {

                var option;
                if (gendercode == "m") option = mOption;
                else if (gendercode == "f") option = fOption;
                else option = nOption;
        
                //option.domObject = document.querySelector(option.selector);
                //option.domObject.click();
                console.log(option.selector)
                document.querySelector(option.selector).click();

                setTimeout(() => {
                    document.querySelector(saveButtonSelector).click();
                }, 500)
            });
            
        }, 500)

    }, 500)



}