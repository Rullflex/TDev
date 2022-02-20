import UIkit from 'uikit';
import { app, form } from './_core';

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

    const callbackModal = $('#callback');
    const callbackModalContextInput = callbackModal.querySelector('input[name="context"]');

    callbackModal.addEventListener('hidden', () => (callbackModalContextInput.value = ''));

    $$('[data-uk-toggle="#callback"]').forEach((el) => {
        el.addEventListener('click', () => (callbackModalContextInput.value = el.dataset.context ?? ''));
    });

    function sliderHandler(isDesktop) {
        if (isDesktop) {
            slider?.$destroy();
        } else {
            slider = UIkit.slider('.s4__slider', { finite: true });
        }
    }

    // Section 3
    (function () {
        if (!document.querySelector(`.s3`)) {
            return;
        }

        const sectionNode = document.querySelector('#section-services');
        const starNode = sectionNode.querySelector('.s3__preview-star');
        const imagesSet = sectionNode.querySelectorAll('.s3__preview-image');

        const mouseMove = (event) => {
            let y = event.offsetY;
            starNode.style.cssText = `transform: rotate(${y}deg)`;
        };

        document.querySelectorAll('.s3__breadcrumb-link').forEach((el, index, set) => {
            const updateActiveIndex = (index = -1) => {
                app.changeActivitySet(set, index);
                app.changeActivitySet(imagesSet, index);
            };

            el.addEventListener('mouseenter', () => updateActiveIndex(index));
            el.addEventListener('mouseleave', updateActiveIndex);
        });

        app.matchMediaListener(
            app.lg,
            () => {
                sectionNode?.removeEventListener('mousemove', mouseMove);
            },
            () => {
                sectionNode?.addEventListener('mousemove', mouseMove);
            },
        );
    })();
});
