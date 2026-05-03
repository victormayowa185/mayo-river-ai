import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import missionaryImg from "../assets/mission.png";
import cannibalImg from "../assets/cannibal.png";
import "../styles/homePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();

  const houseBgRef = useRef(null);
  const treeBgRef = useRef(null);

  const missionarySection = useRef(null);
  const cannibalSection = useRef(null);
  const togetherSection = useRef(null);

  useLayoutEffect(() => {
    // Hero background pop-up
    gsap.set([houseBgRef.current, treeBgRef.current], {
      translateY: 100,
      opacity: 0,
    });

    const heroTl = gsap
      .timeline({ defaults: { ease: "back.out(1.7)" } })
      .to([houseBgRef.current, treeBgRef.current], {
        translateY: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      })
      .add(() => {
        [houseBgRef.current, treeBgRef.current].forEach((bg) => {
          const loop = gsap.timeline({ repeat: -1, repeatDelay: 4 });
          loop
            .to(bg, {
              backgroundPosition: "200px 50%",
              duration: 2,
              ease: "power2.inOut",
            })
            .set(bg, { backgroundPosition: "-200px 50%" })
            .to(bg, {
              backgroundPosition: "0px 50%",
              duration: 2,
              ease: "power2.inOut",
            });
        });
      }, "+=5");

    // ========== SCROLL ANIMATIONS (GSAP ONLY) ==========
    const animateSection = (sectionRef, imageSelector, textSelector) => {
      const section = sectionRef.current;
      if (!section) return;

      const images = section.querySelectorAll(imageSelector);
      const textEl = section.querySelector(textSelector);
      if (!images.length || !textEl) return;

      // Set initial hidden state
      gsap.set(images, { opacity: 0, scale: 0, y: 40 });
      gsap.set(textEl, { opacity: 0, y: 30 });

      // Create the scroll-triggered reveal
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            // markers: true,  // uncomment to debug triggers
          },
        })
        .to(images, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1, // slight stagger if multiple images
        })
        .to(
          textEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4", // overlap so they complete together
        );
    };

    animateSection(missionarySection, ".explainImg", ".explainText");
    animateSection(cannibalSection, ".explainImg", ".explainText");
    // Together section: multiple images
    animateSection(togetherSection, ".togetherImg", ".explainText");

    // Refresh triggers after layout (important for images / dynamic heights)
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = setTimeout(refresh, 300);

    return () => {
      heroTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("load", refresh);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Navbar />

      <section className="heroSection">
        <div className="heroSidePanel">
          <div ref={houseBgRef} className="animatedBg houseBg" />
          <img className="heroCharImg" src={missionaryImg} alt="" />
        </div>
        <div className="heroCenter">
          <h1 className="heroTitle">Missionaries and the Cannibals</h1>
          <button className="startButton" onClick={() => navigate("/solver")}>
            Start
          </button>
        </div>
        <div className="heroSidePanel">
          <div ref={treeBgRef} className="animatedBg treeBg" />
          <img
            className="heroCharImg heroCharImgLarge"
            src={cannibalImg}
            alt=""
          />
        </div>
      </section>

      {/* Missionaries */}
      <section
        ref={missionarySection}
        className="explanationSection missionaryExplain"
      >
        <div className="explainText">
          <h3>The Missionaries</h3>
          <p>
            Three peaceful travellers need to cross the river. But if cannibals
            outnumber them on either bank, they’re in danger. A careful plan is
            the only way to safety.
          </p>
        </div>
        <img className="explainImg" src={missionaryImg} alt="" />
      </section>

      {/* Cannibals */}
      <section
        ref={cannibalSection}
        className="explanationSection cannibalExplain"
      >
        <div className="explainText">
          <h3>The Cannibals</h3>
          <p>
            No less determined to cross, the cannibals are hungry and wild — but
            not mindless. They follow the same rules and share the same goal:
            reach the other side.
          </p>
        </div>
        <img className="explainImg" src={cannibalImg} alt="" />
      </section>

      {/* Together */}
      <section
        ref={togetherSection}
        className="explanationSection togetherExplain"
      >
        <div className="explainText">
          <h3>The Crossing</h3>
          <p>
            One small boat, six passengers. The challenge: move everyone across
            without a single misstep. It’s a classic puzzle of logic, patience,
            and balance.
          </p>
        </div>
        <div className="togetherImages">
          <img className="togetherImg" src={missionaryImg} alt="" />
          <img className="togetherImg" src={cannibalImg} alt="" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
