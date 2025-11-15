import NavbarHome from "../components/componentsHome/NavbarHome/NavbarHome";
import HeroHome from "../components/componentsHome/HeroHome/HeroHome";
import BeneficiosHome from "../components/componentsHome/BeneficiosHome/BeneficiosHome";
import BentosHome from "../components/componentsHome/BentosHome/BentosHome";
import FooterHome from "../components/componentsHome/FooterHome/FooterHome";
import Footer from "../components/Footer/Footer";

const Inicio = () => {
  return (
    <div>
      <NavbarHome />
      <HeroHome />
      <BeneficiosHome />
      <BentosHome />
      <FooterHome />
      <Footer />
    </div>
  );
};

export default Inicio;
