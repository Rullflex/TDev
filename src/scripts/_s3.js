import { app } from './_core';

export default function sectionServicesScript() {
    const sectionNode = document.querySelector('#section-services');
    const starNode = sectionNode.querySelector('.s3__preview-star');
    const imagesSet = sectionNode.querySelectorAll('.s3__preview-image');

    const mouseMove = (event) => {
        let y = event.offsetY;
        starNode.style.cssText = `transform: rotate(${y}deg)`;
    };

    document.querySelectorAll('.s3__breadcrumb a').forEach((el, index, set) => {
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
}
