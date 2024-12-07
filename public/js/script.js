console.clear();

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // Scroll to the top of the page
  window.scrollTo(0, 0);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        markers: false // Set markers to false to remove them
      }
    })
    .to("img", {
      scale: 2,
      z: 350,
      transformOrigin: "center center",
      ease: "power1.inOut"
    })
    .to(
      ".section.hero",
      {
        scale: 1.1,
        transformOrigin: "center center",
        ease: "power1.inOut"
      },
      "<"
    );

  ScrollTrigger.create({
    trigger: ".image-container",
    start: "top center",
    onEnter: () => gsap.to(".image-container", { display: "block" }),
    onLeave: () => document.querySelector(".image-container").remove(),
    markers: false // Set markers to false to remove them
  });
});