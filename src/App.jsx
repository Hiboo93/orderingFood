import { useState } from "react";
import Food from "./components/food/Food.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Easy from "./components/easy/Easy.jsx";
import Download from "./components/download/Download.jsx";
import Footer from "./components/footer/Footer.jsx";

export default function App() {
  const [isCartVisible, setCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setCartVisible(prev => !prev);
  }

  return (
    <>
      <div className="px-3 sm:px-6 md:px-10">
        <Navbar toggleCartVisibility={toggleCartVisibility} />
        <Hero />
        <Food isCartVisible={isCartVisible}/>
        <Easy />
        <Download />
        <Footer />
      </div>
    </>
  )
}