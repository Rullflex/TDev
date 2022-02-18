import UIkit from 'uikit';
import { app, form } from './_core';
import sectionServicesScript from './_s3';

const { ready, $, $$, play, pause, mute } = UIkit.util;

ready(function () {
    app.init();
    form.init('form');

    let isDesktop;

    app.matchMediaListener(
        app.lg,
        () => (isDesktop = false),
        () => (isDesktop = true),
    );

    sectionServicesScript();
});
