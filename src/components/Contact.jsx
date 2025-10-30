import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Footer from "./Footer";

const FloatingSphere = ({
  size = 1,
  color = "#e11d48",
  speed = 0.4,
  offset = 0,
  x = 0,
  y = 0,
  z = 0,
}) => {
  const meshRef = useRef();
  const t = useRef(offset);
  useFrame((_, delta) => {
    t.current += delta * speed;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.x = x + Math.sin(t.current) * 0.8;
      meshRef.current.position.y = y + Math.cos(t.current * 0.7) * 0.6;
    }
  });
  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.25}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

const Contact = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section
        id="contact"
        className="relative py-20 sm:py-24 md:py-28 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden"
      >
        {/* --- Animated 3D Background --- */}
        <div className="absolute inset-0 opacity-40 sm:opacity-50 pointer-events-none">
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 6], fov: 50 }}
              shadows={false}
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />

              {/* Responsive Floating Spheres */}
              <FloatingSphere
                size={isMobile ? 0.8 : 1.4}
                color="#e11d48"
                speed={0.5}
                offset={0}
                x={isMobile ? -1 : -2}
                y={isMobile ? 0.5 : 1}
                z={isMobile ? -1.5 : -2}
              />
              <FloatingSphere
                size={isMobile ? 0.6 : 1.2}
                color="#f43f5e"
                speed={0.8}
                offset={1}
                x={isMobile ? 1 : 2}
                y={isMobile ? -0.5 : -1}
                z={isMobile ? -2 : -2.5}
              />
              <FloatingSphere
                size={isMobile ? 0.4 : 0.6}
                color="#fb7185"
                speed={0.9}
                offset={2}
                x={isMobile ? -0.6 : -1}
                y={isMobile ? -1 : -2}
                z={isMobile ? -2.5 : -3}
              />

              <OrbitControls enableZoom={false} enableRotate={false} />
            </Canvas>
          </Suspense>
        </div>

        {/* --- Background Overlay --- */}
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" />

        {/* --- Contact Content --- */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-400 title-serif">
              Book a Table
            </motion.h2>
            <p className="mt-3 text-gray-300 text-sm sm:text-base md:text-lg">
              Reserve your table and enjoy an unforgettable dining experience.
            </p>
          </Reveal>

          {/* --- Contact Form --- */}
          <Reveal delay={0.2}>
            <motion.form
              className="mt-10 sm:mt-12 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 space-y-4 sm:space-y-6 shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-500"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 sm:p-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-pink-400 text-sm sm:text-base text-gray-200 placeholder-gray-400 transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 sm:p-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-pink-400 text-sm sm:text-base text-gray-200 placeholder-gray-400 transition"
                />
              </div>

              <div>
                <input
                  type="datetime-local"
                  placeholder="Date & Time"
                  className="w-full p-3 sm:p-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-pink-400 text-sm sm:text-base text-gray-200"
                />
              </div>

              <div>
                <textarea
                  placeholder="Special Requests"
                  className="w-full p-3 sm:p-4 bg-transparent border-b border-gray-600 focus:outline-none focus:border-pink-400 text-sm sm:text-base text-gray-200 h-24 sm:h-28 resize-none"
                ></textarea>
              </div>

              <button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:scale-105 hover:shadow-[0_0_15px_#fb7185] transition-all">
                Reserve Now
              </button>
            </motion.form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
