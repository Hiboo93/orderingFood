import { useState } from "react";
import Food from "./components/food/Food.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Easy from "./components/easy/Easy.jsx";

export default function App() {
  const [isCartVisible, setCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setCartVisible(prev => !prev);
  }

  return (
    <>
      <Navbar toggleCartVisibility={toggleCartVisibility} />
      <Hero />
      <Food isCartVisible={isCartVisible}/>
      <Easy />
    </>
  )
}