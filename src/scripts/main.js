import UIkit from 'uikit';
import { app, form } from './_core';
import sectionServicesScript from './_s3';

const { ready, $, $$ } = UIkit.util;

ready(function () {
    app.init();
    form.init('form');

    let isDesktop;
    let slider;

    app.matchMediaListener(
        app.lg,
        () => {
            isDesktop = false;
            sliderHandler(false);
        },
        () => {
            isDesktop = true;
            sliderHandler(true);
        },
    );

    sectionServicesScript();

    function sliderHandler(isDesktop) {
        if (isDesktop) {
            slider?.$destroy();
        } else {
            slider = UIkit.slider('.s4__slider', { finite: true });
        }
    }
});
