import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAP = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".comparisonSection");

    sections.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      tl.fromTo(
        section.querySelector(".afterImage svg"),
        3,
        { scale: 80 },
        { scale: 1 },
        "+=1",
      ).fromTo(
        section.querySelector(".beforeImage "),
        { yPercent: -70, y: 0 },
        {
          yPercent: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 100%",
            end: `+=${window.innerHeight}`,
            scrub: true, // Duration of the "scrubbing" (smoothness)
            markers: true,
          },
        },
        "+=0",
      );
    });
    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div className="gsap-container"></div>;
};

export default GSAP;
