import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

// Local image imports
import Momos from "../img/Momos.jpg";
import SteakWine from "../img/Steak-wine.jpg";
import PastaDelight from "../img/Pasta-delight.jpg";
import ClassicBurger from "../img/Classic-burger.jpg";
import CaesarSalad from "../img/Caesar-salad.jpg";
import SushiPlatter from "../img/Sushi-platter.jpg";
import Noodles from "../img/noodles.jpg";
import TacosTrio from "../img/Tacos-trio.jpg";
import ChickenAlfredo from "../img/Chicken-alfredo.jpg";
import VeggiePizza from "../img/Veggie-pizza.jpg";
import FrenchFriesDeluxe from "../img/French-fries-deluxe.jpg";
import ChocolateLavaCake from "../img/Chocolate-lava-cake.jpg";

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

// Menu items
const dishes = [
  { name: "Noodles", price: "$25", img: Noodles },
  { name: "Steak & Wine", price: "$40", img: SteakWine },
  { name: "Pasta Delight", price: "$18", img: PastaDelight },
  { name: "Classic Burger", price: "$16", img: ClassicBurger },
  { name: "Caesar Salad", price: "$14", img: CaesarSalad },
  { name: "Sushi Platter", price: "$32", img: SushiPlatter },
  { name: "Momos", price: "$48", img: Momos },
  { name: "Tacos Trio", price: "$12", img: TacosTrio },
  { name: "Chicken Alfredo", price: "$20", img: ChickenAlfredo },
  { name: "Veggie Pizza", price: "$17", img: VeggiePizza },
  { name: "French Fries Deluxe", price: "$10", img: FrenchFriesDeluxe },
  { name: "Chocolate Lava Cake", price: "$11", img: ChocolateLavaCake },
];

const Menu = () => {
  return (
    <section
      id="menu"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden"
    >
      {/* --- Animated 3D Background --- */}
      <div className="absolute inset-0 opacity-40 sm:opacity-50 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
            <FloatingSphere
              size={1.4}
              color="#e11d48"
              speed={0.5}
              offset={0}
              x={-2}
              y={1}
              z={-2}
            />
            <FloatingSphere
              size={1.2}
              color="#f43f5e"
              speed={0.8}
              offset={1}
              x={2}
              y={-1}
              z={-2.5}
            />
            <FloatingSphere
              size={0.6}
              color="#fb7185"
              speed={0.9}
              offset={2}
              x={-1}
              y={-2}
              z={-3}
            />
            <OrbitControls enableZoom={false} enableRotate={false} />
          </Canvas>
        </Suspense>
      </div>

      {/* --- Background Texture --- */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center animate-slow-pan"
        style={{ backgroundImage: "url('/img/menu-bg.png')" }}
      />

      {/* --- Menu Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-400 title-serif">
            Our Signature Menu
          </motion.h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base md:text-lg">
            A delightful selection of dishes made to perfection.
          </p>
        </Reveal>

        {/* --- Dishes Grid card--- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
          {dishes.map((dish, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_0_25px_rgba(251,113,133,0.3)] transition-all"
              >
                <div className="relative group">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-52 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-base sm:text-lg font-semibold transition-all">
                    {dish.name}
                  </div>
                </div>

                <div className="p-5 sm:p-6 text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {dish.name}
                  </h3>
                  <div className="mt-3 sm:mt-4 flex justify-between items-center">
                    <p className="text-pink-400 font-bold text-sm sm:text-base">
                      {dish.price}
                    </p>
                    <a
                      href="#contact"
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-md bg-gradient-to-r from-red-600 to-pink-500 text-white font-medium text-sm sm:text-base hover:scale-105 hover:shadow-[0_0_15px_#fb7185] transition-all"
                    >
                      Order
                    </a>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
