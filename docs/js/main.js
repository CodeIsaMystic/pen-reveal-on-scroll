gsap.registerPlugin(ScrollTrigger);

function getTopPartsHeight() {
    return document.querySelector('.pen-top').clientHeight - 22;
}


function init() {

    /**
     * move part 3 to cover the part 2
     *  
    **/ 
    gsap.set('.part3', { y: () => { return - getTopPartsHeight()},
        scrollTrigger: {
            id: 'pen-body',
            trigger: '.part3',
            start: 'top bottom-=270px',
            // the way to fix the exactly point to stop using the function & template litteral
            end: `+=${getTopPartsHeight()}`,
            //markers: true,
            pin: true,
            pinSpacing: false
        }
    });


    /**
     * Add class to all parts to reveal their text associated
     * 
     */
    const allParts = gsap.utils.toArray('.part');



    allParts.forEach((part, index) => {
        let startPosition = 'top center';

        if (index === 2) {
            startPosition = `top+=${getTopPartsHeight()} center`;
        }

        gsap.set(part, { scrollTrigger: {
                id: `${part.getAttribute('class')}`,
                trigger: part,
                start: startPosition,
                //markers: true,
                toggleClass: 'fade-in'
            }});
    });

    /** 
     * Found -842px for the part6, using transform: translateY in the browser
     *       -722px for the part 5
     *       -547px for the part 4
     * */

    const partTopOffsets = [530, 722, 842];


    /**
     *  Using GSAP Utilities
     *  toArray method to loop and do not repeat the code
     */
    gsap.utils.toArray(['.part4', '.part5', '.part6']).forEach((part, index) => {

        gsap.set(part, { y: -partTopOffsets[index] });

        gsap.to(part, {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '.pen-body',
                start: 'top bottom-=640px',
                end: `+=${partTopOffsets[index]}`,
                //markers: true,
                scrub: true
            }
        });
    });
}

window.addEventListener('load', function () {
    init();
});