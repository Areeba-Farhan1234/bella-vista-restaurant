import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import BgImg from "../img/About-img.jpg";

const useIsMobile = () => {
  return useMemo(() => window.innerWidth < 640, []);
};

const FloatingSphere = ({
  size = 1,
  color = "#e11d48",
  speed = 0.4,
  offset = 0,
  x = 0,
  y = 0,
  z = 0,
}) => {
  const ref = useRef();
  const t = useRef(offset);
  useFrame((_, delta) => {
    t.current += delta * speed;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.position.x = x + Math.sin(t.current) * 0.8;
      ref.current.position.y = y + Math.cos(t.current * 0.7) * 0.6;
    }
  });
  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.25}
        emissive={color}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
};

const RotatingPlate = ({ x = 0, y = 0, z = 0 }) => {
  const g = useRef();
  useFrame((_, delta) => {
    if (g.current) g.current.rotation.y += delta * 0.35;
  });
  return (
    <group ref={g} position={[x, y, z]} rotation={[Math.PI / 8, 0, 0]}>
      <mesh position={[0.45, 0.12, 0]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial
          color={"#f97316"}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[-0.45, 0.06, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color={"#ef4444"}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};

const About3D = () => {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 md:py-28 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden"
    >
      {/* Soft background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-950/20 via-black/30 to-gray-900/60 pointer-events-none"></div>

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-45 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-5, -3, -5]} intensity={0.6} />

            {/* Responsive spheres */}
            <FloatingSphere
              size={isMobile ? 1.0 : 1.4}
              color="#e11d48"
              speed={0.5}
              offset={0}
              x={isMobile ? -1.2 : -2.2}
              y={isMobile ? 0.8 : 1.2}
              z={-2}
            />
            <FloatingSphere
              size={isMobile ? 0.8 : 1.0}
              color="#f43f5e"
              speed={0.8}
              offset={1}
              x={isMobile ? 1.2 : 2}
              y={isMobile ? -0.8 : -1}
              z={-2.5}
            />
            <FloatingSphere
              size={isMobile ? 0.5 : 0.6}
              color="#fb7185"
              speed={0.9}
              offset={2}
              x={isMobile ? -0.6 : -1}
              y={isMobile ? -1.5 : -2}
              z={-3}
            />
            <FloatingSphere
              size={isMobile ? 0.4 : 0.5}
              color="#be123c"
              speed={1.3}
              offset={3}
              x={isMobile ? 2 : 3}
              y={isMobile ? 1 : 1.5}
              z={-2}
            />

            <RotatingPlate x={-0.6} y={-0.1} z={-1.2} />
            <OrbitControls enableZoom={false} enableRotate={false} />
          </Canvas>
        </Suspense>
      </div>

      {/* Background image */}
      <div className="absolute inset-0 opacity-20 bg-cover bg-center animate-slow-pan"></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text (right on desktop, top on mobile) */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <Reveal>
              <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-400 title-serif">
                About Bella Vista
              </motion.h2>

              <motion.p className="mt-4 sm:mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
                At{" "}
                <span className="text-pink-400 font-semibold">Bella Vista</span>
                , every plate tells a story of passion and precision. Our chefs
                blend the finest ingredients with modern artistry to deliver
                dishes that are as visually stunning as they are flavorful.
              </motion.p>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden mt-4 text-gray-300 text-base sm:text-lg leading-relaxed hidden"
                id="moreText"
              >
                From handcrafted sauces to locally sourced produce, every detail
                reflects our dedication to excellence. Whether it’s a romantic
                dinner or a casual gathering, Bella Vista promises an
                unforgettable dining experience.
              </motion.div>

              {/* Buttons */}
              <div className="mt-8 flex flex-row flex-wrap justify-center md:justify-start gap-4 sm:gap-6 w-full">
                <button
                  onClick={() => {
                    const text = document.getElementById("moreText");
                    text.classList.toggle("hidden");
                  }}
                  className="w-1/2 sm:w-auto bg-gradient-to-r from-red-600 to-pink-500 px-6 sm:px-8 py-3 rounded-xl text-white font-semibold hover:scale-105 shadow-lg hover:shadow-[0_0_25px_#f43f5e] transition text-sm sm:text-base text-center"
                >
                  Learn More
                </button>

                <a
                  href="#menu"
                  className="w-1/2 sm:w-auto bg-white/10 border border-white/20 px-6 sm:px-8 py-3 rounded-xl text-white font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition text-sm sm:text-base text-center"
                >
                  Our Menu
                </a>
              </div>
            </Reveal>
          </div>

          {/* Image (left on desktop, bottom on mobile) */}
          <div className="order-2 md:order-1 mt-10 md:mt-0">
            <Reveal delay={0.1}>
              <div className="relative group w-full h-64 sm:h-80 md:h-96">
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-red-500 via-pink-500 to-yellow-300 opacity-50 blur-2xl group-hover:opacity-80 transition duration-700"></div>

                <div className="relative w-full h-full rounded-[2rem] bg-white/5 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-transparent to-red-600/10"></div>
                  <img
                    src={BgImg}
                    alt="Restaurant interior"
                    className="w-full h-full object-cover rounded-[2rem] hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 border border-white/10 rounded-[2rem]"></div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-10 bg-black/40 blur-3xl rounded-full opacity-50"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About3D;
