import Header from "./Header";
import Hero from "./Hero";
import Cards from "./Cards";
import Divider from "./Divider";
import DividerAlt from "./DividerAlt";
import Footer from "./Footer";
import { ColorProvider } from "./Components/ColorContext/ColorProvider";
// import { useColor } from "./Components/ColorContext/ColorContext";

function App() {
  return (
    <ColorProvider>
      <MainLayout />
    </ColorProvider>
  );
}

function MainLayout() {
  // const { primaryColor } = useColor();
  return (
    <div className="relative min-h-screen flex bg-orange-200 justify-center -z-20">
      <div className="absolute transition-colors bg-orange-500 -z-10">
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
  );
}

export default App;
