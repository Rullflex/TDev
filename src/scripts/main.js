import UIkit from 'uikit';
import { app, form } from './_core';
import sectionServicesScript from './_s3';
import { throttle } from 'lodash';

const { ready, $, $$, play, pause, mute } = UIkit.util;

ready(function () {
    app.init();
    form.init('form');

    sectionServicesScript();

    let prevValue = -1;
    const items = document.querySelectorAll('.s6__step-item');
    const itemsDescr = [...items].map((e) => e.querySelector('.s6__step-descr'));

    function getItemsValues() {
        return [...items].map((e) => {
            const topOffset = e.getBoundingClientRect().top + window.scrollY;

            return {
                top: topOffset,
                bottom: topOffset + e.clientHeight,
            };
        });
    }

    function handleWindowScroll(event) {
        if (app.isMobile) {
            const viewPoint = window.scrollY + window.innerHeight / 2;
            const index = getItemsValues().findIndex((e) => e.top < viewPoint && e.bottom > viewPoint);

            if (index !== -1 && prevValue !== index) {
                prevValue = index;
                app.changeActivitySet(items, index);
                itemsDescr.forEach((e) => (e.style.cssText = `height: 0`));
                itemsDescr[index].style.cssText = `height: ${itemsDescr[index].dataset.height}px`;
            }
        }
    }

    window.addEventListener('scroll', throttle(handleWindowScroll, 100));

    document.querySelectorAll('.s6__step-descr').forEach((el) => {
        el.dataset.height = el.offsetHeight;
        el.style.height = '0';
    });

    document.querySelectorAll('.s6__step-item').forEach((el) => {
        if (app.isMobile) {
            return;
        }

        el.addEventListener('mouseenter', (event) => {
            const innerDescr = el.querySelector('.s6__step-descr');
            innerDescr.style.cssText = `height: ${innerDescr.dataset.height}px`;
        });
    });

    document.querySelectorAll('.s6__step-item').forEach((el) => {
        if (app.isMobile) {
            return;
        }

        el.addEventListener('mouseleave', (event) => {
            const innerDescr = el.querySelector('.s6__step-descr');
            innerDescr.style.cssText = `height: 0`;
        });
    });

    // app.letListClickActive(document.querySelector(`ul.list`))
    // app.dynamicVideo()
    // app.videoSpy(`#video .popup__body`, 'fmT2FFVuWDA')
    // app.mapSpy(`#map`, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.681137224115!2d45.91315441602808!3d51.592407112304684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4114c599cd81712b%3A0x2ebcd457d28444b3!2z0YPQuy4g0J_QsNC90YTQuNC70L7QstCwLCA1Mywg0KHQsNGA0LDRgtC-0LIsINCh0LDRgNCw0YLQvtCy0YHQutCw0Y8sIDQxMDAzMw!5e0!3m2!1sru!2sru!4v1618227745566!5m2!1sru!2sru')

    // const quiz = new Quiz()
    // quiz.create()
});
