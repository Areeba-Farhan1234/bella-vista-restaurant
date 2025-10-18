import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

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
      ref.current.rotation.y += delta * 0.25;
      ref.current.position.x = x + Math.sin(t.current) * 1.1;
      ref.current.position.y = y + Math.cos(t.current * 0.8) * 0.7;
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
        emissiveIntensity={0.45}
      />
    </mesh>
  );
};

const Hero3D = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
    >
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1.4} />

            {/* Responsive Floating Spheres */}
            <FloatingSphere
              size={isMobile ? 0.9 : 1.6}
              color="#e11d48"
              speed={0.5}
              offset={0}
              x={isMobile ? -1.5 : -3}
              y={isMobile ? 0.6 : 1.2}
              z={isMobile ? -1.5 : -2}
            />
            <FloatingSphere
              size={isMobile ? 0.7 : 1.2}
              color="#f43f5e"
              speed={0.9}
              offset={1}
              x={isMobile ? 1.3 : 2.8}
              y={isMobile ? -1 : -1.5}
              z={isMobile ? -2 : -2.5}
            />
            <FloatingSphere
              size={isMobile ? 0.5 : 0.9}
              color="#fb7185"
              speed={1.1}
              offset={2}
              x={isMobile ? -0.6 : -1}
              y={isMobile ? -1.3 : -2.2}
              z={isMobile ? -2.5 : -3}
            />
            <FloatingSphere
              size={isMobile ? 0.6 : 0.9}
              color="#be123c"
              speed={1.3}
              offset={3}
              x={isMobile ? 1.8 : 3}
              y={isMobile ? 0.8 : 1.5}
              z={isMobile ? -1.8 : -2}
            />

            <OrbitControls
              enableZoom={false}
              enableRotate={false}
              enablePan={false}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black opacity-90" />

      {/* Hero Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold title-serif leading-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-pink-600 animate-gradient"
        >
          Fine Dining Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2"
        >
          Welcome to{" "}
          <span className="text-pink-300 font-semibold">Bella Vista</span> —
          where culinary artistry meets ambiance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#menu"
            className="bg-gradient-to-r from-red-600 to-pink-500 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-[0_0_15px_#fb7185] transition duration-300"
          >
            Explore Menu
          </a>
          <a
            href="#contact"
            className="border border-white/20 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-500 text-white hover:scale-105 hover:shadow-[0_0_15px_#fb7185] transition duration-300"
          >
            Book a Table
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
