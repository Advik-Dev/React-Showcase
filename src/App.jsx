import Header from "./Header";
import Hero from "./Hero";
import Cards from "./Cards";
import Divider from "./Divider";
import DividerAlt from "./DividerAlt";
import Footer from "./Footer";
import { ColorProvider } from "./Components/ColorContext/ColorProvider";
import { useColor } from "./Components/ColorContext/ColorContext";
import BgGrid from "./BgGrid";
import SmoothScroll from "./Components/Animations/SmoothScroll";

function App() {
  return (
    <ColorProvider>
      <MainLayout />
    </ColorProvider>
  );
}

function MainLayout() {
  const { palette } = useColor();
  return (
    <SmoothScroll>
      <div
        className="relative transition-colors scroll-smooth"
        style={{ backgroundColor: palette.bgshade0, color: palette.shade0 }}
      >
        <BgGrid className="z-10 opacity-15" />
        <div className="relative z-20">
          <Header />
          <Hero />
          <Divider text={"Components"} />
          <Cards />
          <DividerAlt
            text={"And that's all for now"}
            subtext={"P.S. Work in Progress, Much More Coming Soon... ;)"}
          />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}

export default App;
