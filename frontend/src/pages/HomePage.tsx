import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar"; // adjust the path to your Navbar
import "../styles/homePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();

  // Refs for the entrance animation sequence
  const boatRef = useRef(null);
  const missionary1 = useRef(null); // front centre
  const missionary2 = useRef(null); // rear left
  const missionary3 = useRef(null); // rear right
  const cannibal1 = useRef(null);
  const cannibal2 = useRef(null);
  const cannibal3 = useRef(null);
  const missionariesGroup = useRef(null);
  const cannibalsGroup = useRef(null);

  // Refs for scroll sections (bounce in)
  const missionarySection = useRef(null);
  const cannibalSection = useRef(null);
  const togetherSection = useRef(null);

  useLayoutEffect(() => {
    // ------ Hero entrance timeline ------
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Boat: already visible, start slow drift immediately
    gsap.to(boatRef.current, {
      x: "+=250", // move right by 250px (adjust to river width)
      duration: 8,
      repeat: -1,
      yoyo: false,
      onRepeat: () => {
        gsap.set(boatRef.current, { x: -50 }); // reset to left before next loop
        gsap.to(boatRef.current, { x: "+=250", duration: 8 });
      },
    });

    // Missionaries pop-in (stagger from bottom)
    tl.from([missionary1.current, missionary2.current, missionary3.current], {
      y: 60,
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.2,
      ease: "back.out(1.7)",
    })
      // Cannibals pop-in (stagger from bottom)
      .from(
        [cannibal1.current, cannibal2.current, cannibal3.current],
        {
          y: 60,
          opacity: 0,
          scale: 0.5,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      ) // start slightly before missionaries finish

      // Swipe animations (missionaries first, then cannibals after a delay)
      .to(missionariesGroup.current, {
        x: 200,
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
      })
      .fromTo(
        missionariesGroup.current,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
        },
      )

      .to(
        cannibalsGroup.current,
        {
          x: -200,
          opacity: 0,
          duration: 0.8,
        },
        "+=0.3",
      )
      .fromTo(
        cannibalsGroup.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
        },
      );

    // ------ Scroll-triggered bounce-ins ------
    [
      missionarySection.current,
      cannibalSection.current,
      togetherSection.current,
    ].forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      });
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Text Section */}
      <section className="heroSection">
        <h1 className="heroTitle">Missionaries and the Cannibals</h1>
        <button className="startButton" onClick={() => navigate("/solver")}>
          Start
        </button>
      </section>

      {/* River Diorama */}
      <section className="riverScene">
        <div className="riverWater"></div>

        {/* Left side: Missionaries */}
        <div className="missionaryWorld">
          <div ref={missionariesGroup} className="charGroup">
            <div
              ref={missionary2}
              className="charIcon missionaryIcon rearLeft"
            ></div>
            <div
              ref={missionary1}
              className="charIcon missionaryIcon frontCenter"
            ></div>
            <div
              ref={missionary3}
              className="charIcon missionaryIcon rearRight"
            ></div>
          </div>
        </div>

        {/* Boat */}
        <div ref={boatRef} className="boatCanoe"></div>

        {/* Right side: Cannibals */}
        <div className="cannibalWorld">
          <div ref={cannibalsGroup} className="charGroup">
            <div
              ref={cannibal2}
              className="charIcon cannibalIcon rearLeft"
            ></div>
            <div
              ref={cannibal1}
              className="charIcon cannibalIcon frontCenter"
            ></div>
            <div
              ref={cannibal3}
              className="charIcon cannibalIcon rearRight"
            ></div>
          </div>
        </div>
      </section>

      {/* Explanation Sections */}
      <section
        ref={missionarySection}
        className="explanationSection missionaryExplain"
      >
        <div className="explainIcon missionaryLargeIcon"></div>
        <div className="explainText">
          <h3>The bookworms</h3>
          <p>
            These peaceful souls carry pens, books, and a gentle faith. But if
            the cannibals outnumber them on either shore… the story gets messy.
            They need a clever plan to cross safely.
          </p>
        </div>
      </section>

      <section
        ref={cannibalSection}
        className="explanationSection cannibalExplain"
      >
        <div className="explainText">
          <h3>The wild ones</h3>
          <p>
            Don’t be fooled by the horns – they’re hungry, not evil. They also
            have every right to cross the river. The puzzle isn’t about
            fighting; it’s about finding a safe way for everyone to reach the
            other side.
          </p>
        </div>
        <div className="explainIcon cannibalLargeIcon"></div>
      </section>

      <section
        ref={togetherSection}
        className="explanationSection togetherExplain"
      >
        <div className="allIcons">
          <div className="miniIcon missionaryMini"></div>
          <div className="miniIcon cannibalMini"></div>
          <div className="miniIcon missionaryMini"></div>
          <div className="miniIcon cannibalMini"></div>
          <div className="miniIcon missionaryMini"></div>
          <div className="miniIcon cannibalMini"></div>
        </div>
        <div className="explainText">
          <h3>The great crossing</h3>
          <p>
            Six travellers, one tiny canoe. The goal? Get every single person to
            the far bank without anyone becoming lunch. It’s a classic test of
            patience, logic, and a little bit of trust.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
