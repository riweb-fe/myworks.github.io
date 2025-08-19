'use strict';

// スライド
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger)

    const sections = gsap.utils.toArray(".slide");
    const outerWrappers = gsap.utils.toArray(".slide__outer");
    const innerWrappers = gsap.utils.toArray(".slide__inner");
    const images = gsap.utils.toArray(".slide__image img");
    const count = document.querySelector(".count");
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating;
    let currentIndex = 0;

    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
    gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });

    function gotoSection(index, direction) {
      animating = true;
      index = wrap(index);
      // wrapによる最小値未満の場合は末尾に戻る特性を活かしてObserverから取得したindexのマイナスを補正

      let tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        onComplete: () => {
          animating = false;
        }
      });

      let currentSection = sections[currentIndex];
      let container = currentSection.querySelector(".slide__container");
      let nextSection = sections[index];
      let nextContainer = nextSection.querySelector(".slide__container");

      gsap.set([sections], { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndex]], { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index]], { zIndex: 2, autoAlpha: 1 });

      tl
        .set(count, { text: index + 1 }, 0.32)
        .fromTo(
          outerWrappers[index],
        {
          xPercent: 100 * direction
        },
        { xPercent: 0 },
        0 // repeat count
      )
      .fromTo(
        innerWrappers[index],
        {
          xPercent: -100 * direction
        },
        { xPercent: 0 },
        0
      )
      .to(
        container,
        {
          "--width": 800,
          xPercent: 30 * direction
        },
        0
      )
      .fromTo(
        nextContainer,
        {
          "--width": 800,
          xPercent: -30 * direction
        },
        {
          "--width": 200,
          xPercent: 0
        },
        0
      )
      .fromTo(
        images[index],
        {
          scale: 2
        },
        { scale: 1 },
        0
      )
      .timeScale(0.8);

      currentIndex = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        if (animating) return;
        gotoSection(currentIndex + 1, +1);
      },
      onDown: () => {
        if (animating) return;
        gotoSection(currentIndex - 1, -1);
      },
      tolerance: 10
    });

    document.addEventListener("keydown", logKey);

    function logKey(event) {
      event.preventDefault();
      if ((event.code === "ArrowUp" || event.code === "ArrowLeft") && !animating) {
        gotoSection(currentIndex - 1, -1);
      }
      if (
        (event.code === "ArrowDown" ||
        event.code === "ArrowRight" ||
        event.code === "Space" ||
        event.code === "Enter") &&
        !animating
      ) {
        gotoSection(currentIndex + 1, 1);
      }
    }
  });
})();