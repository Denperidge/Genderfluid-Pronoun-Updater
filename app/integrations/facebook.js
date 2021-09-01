//function FacebookIntegration(gendercode) {


    // These are the selectors to be used to find the controls on Facebook
    var editGenderButton = {
        selector: ".oajrlxb2.bp9cbjyn.tdjehn4e.mtkw9kbi.tlpljxtp.qensuy8j.ppp5ayq2.goun2846.ccm00jje.s44p3ltw.mk2mc5f4.rt8b4zig.n8ej3o3l.agehan2d.sk4xxmp2.rq0escxv.nhd2j8a9.j83agx80.mg4g778l.btwxx1t3.pfnyh3mw.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.tgvbjcpo.hpfvmrgz.jktsbyx5.d1544ag0.osnr6wyh.tw6a2znq.l9j0dhe7.hzawbc8m.esuyzwwr.f1sip0of.du4w35lb.lzcic4wl.abiwlrkh.p8dawk7l.dwo3fsh8.ow4ym5g4.auili1gw.beltcj47.p86d2i9g.aot14ch1.kzx2olss.i1fnvgqd",
        index: 3,
        domObject: null,
    }

    var editGenderSelectbox = {
        selector: ".oajrlxb2.bp9cbjyn.tdjehn4e.mtkw9kbi.tlpljxtp.qensuy8j.ppp5ayq2.goun2846.ccm00jje.s44p3ltw.mk2mc5f4.rt8b4zig.n8ej3o3l.agehan2d.sk4xxmp2.rq0escxv.nhd2j8a9.j83agx80.mg4g778l.btwxx1t3.pfnyh3mw.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.tgvbjcpo.hpfvmrgz.jktsbyx5.d1544ag0.osnr6wyh.tw6a2znq.l9j0dhe7.hzawbc8m.esuyzwwr.f1sip0of.du4w35lb.lzcic4wl.abiwlrkh.p8dawk7l.dwo3fsh8.ow4ym5g4.auili1gw.beltcj47.p86d2i9g.aot14ch1.kzx2olss.i1fnvgqd",
        index: 1,
        domObject: null
    }

    var mOption = {
        selector: "#jsc_c_1k__1",
        domObject: null
    }

    var fOption = {
        selector: "#jsc_c_1k__0",
        domObject: null
    }

    var nOption = {
        selector: "#jsc_c_1k__2",
        domObject: null
    }

    editGenderButton.domObject = document.querySelectorAll(editGenderButtonSelector)[editGenderButton.index];
    editGenderButton.domObject.click();

    editGenderSelectbox = document.querySelectorAll(editGenderSelectbox.selector)[editGenderSelectbox.index];
    editGenderSelectbox.domObject.click();


    var option;
    if (gendercode == "m") option = mOption;
    else if (gendercode == "f") option = fOption;
    else option = nOption;

    option.domObject = document.querySelector(option.selector);
    option.domObject.click();

//}