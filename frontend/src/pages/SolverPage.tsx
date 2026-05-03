import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRedoAlt,
  FaCheck,
  FaCloud,
} from "react-icons/fa";
import canoeImg from "../assets/canoe.png";
import missionaryImg from "../assets/miss.png";
import cannibalImg from "../assets/cann.png";
import "../styles/solverPage.css";

const SolverPage = () => {
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState("bfs");
  const [solution, setSolution] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);
  const boatRef = useRef(null);
  const initializedRef = useRef(false);

  // Fetch solution from live API
  const handleSolve = async () => {
    setSolution(null); // ← instantly reset the button to "Solve"
    try {
      const response = await fetch("https://mayosearch.onrender.com/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm }),
      });
      const data = await response.json();
      if (data.solution) {
        setSolution(data.solution);
        setCurrentStep(0);
        setPlaying(false); // do NOT auto‑play
        initializedRef.current = false;
      } else {
        alert("No solution returned");
      }
    } catch (error) {
      alert("API call failed – check console");
      console.error(error);
    }
  };

  // ----- Bounce animation when solution is ready -----
  useEffect(() => {
    if (!solution) return;

    const timer = setTimeout(() => {
      const icons = document.querySelectorAll(".characterIcon");
      gsap.fromTo(
        icons,
        { scale: 1, y: 0 },
        {
          scale: 1.3,
          y: -15,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.05,
          yoyo: true,
          repeat: 1,
        },
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [solution]);

  const advanceStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= solution.length - 1) {
        setPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [solution]);

  // Auto‑play timer
  useEffect(() => {
    if (playing && solution) {
      timerRef.current = setInterval(advanceStep, 1500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, advanceStep, solution]);

  const togglePlay = () => {
    if (!solution) return;
    setPlaying((prev) => !prev);
  };

  const stepForward = () => {
    if (!solution) return;
    if (currentStep < solution.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const stepBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const currentState = solution?.[currentStep] || {
    left_missionaries: 3,
    left_cannibals: 3,
    boat: "left",
  };

  // Boat animation (sailing)
  useLayoutEffect(() => {
    if (!solution || !boatRef.current) return;
    const targetLeft = currentState.boat === "left" ? "5%" : "85%";
    if (!initializedRef.current) {
      gsap.set(boatRef.current, { left: targetLeft });
      initializedRef.current = true;
    } else {
      gsap.to(boatRef.current, {
        left: targetLeft,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [solution, currentStep]);

  // Idle bobbing
  useLayoutEffect(() => {
    if (!boatRef.current) return;
    gsap.to(boatRef.current, {
      y: -4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const renderBank = (side) => {
    const totalM =
      side === "left"
        ? currentState.left_missionaries
        : 3 - currentState.left_missionaries;
    const totalC =
      side === "left"
        ? currentState.left_cannibals
        : 3 - currentState.left_cannibals;

    const characters = [];
    for (let i = 0; i < totalM; i++) {
      characters.push(
        <img
          key={`m-${side}-${i}`}
          src={missionaryImg}
          className="characterIcon"
          alt="M"
        />,
      );
    }
    for (let i = 0; i < totalC; i++) {
      characters.push(
        <img
          key={`c-${side}-${i}`}
          src={cannibalImg}
          className="characterIcon"
          alt="C"
        />,
      );
    }
    if (characters.length === 0) return null;

    return (
      <div
        className={`bank ${side === "left" ? "leftBank" : "rightBank"}`}
        key={`bank-${side}`}
      >
        {characters}
      </div>
    );
  };

  // Condition for showing "Solved" state (only when finished)
  const isFinished =
    solution && !playing && currentStep === solution.length - 1;

  return (
    <div className="solverPage">
      <Navbar />

      <header className="solverBar">
        <div className="barLeft">
          <h2 className="solverTitle">Missionaries & Cannibals · Solver</h2>
        </div>
        <div className="barCenter">
          {solution && (
            <span className="stepCounter">
              Step {currentStep + 1} / {solution.length}
            </span>
          )}
        </div>
        <div className="barRight">
          <div className="controls">
            {/* Solve / Solved button – resets properly */}
            <button
              className={`iconButton solveButton ${isFinished ? "solved" : ""}`}
              onClick={handleSolve}
            >
              {isFinished ? <FaCheck /> : <FaRedoAlt />}
              {isFinished ? " Solved" : " Solve"}
            </button>

            {/* Redo button – only appears after finishing */}
            {isFinished && (
              <button className="iconButton redoButton" onClick={handleSolve}>
                <FaRedoAlt /> Redo
              </button>
            )}

            <button
              className="iconButton"
              onClick={togglePlay}
              disabled={!solution}
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>

            <button
              className="iconButton"
              onClick={stepBack}
              disabled={!solution}
            >
              <FaStepBackward />
            </button>

            <button
              className="iconButton"
              onClick={stepForward}
              disabled={!solution}
            >
              <FaStepForward />
            </button>
          </div>
        </div>
      </header>

      <main className="solverScene">
        <div className="grassStrip" />
        <div className="riverStrip">
          <img
            ref={boatRef}
            src={canoeImg}
            className="solverBoat"
            alt="canoe"
          />
        </div>
        {renderBank("left")}
        {renderBank("right")}

        {/* ---- Sky decorations ---- */}
        <FaCloud className="cloud cloud1" />
        <FaCloud className="cloud cloud2" />
        <FaCloud className="cloud cloud3" />
        <FaCloud className="cloud cloud4" />
      </main>
    </div>
  );
};

export default SolverPage;
