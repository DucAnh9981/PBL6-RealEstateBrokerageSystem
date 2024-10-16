
import Introduce from "../../components/introduce/Introduce";
import HeroSection from "../../components/HeroPage/heropage";
import MainPageUser from "./MainPageUser";

const TestView = () => {
  return (
    <>
      {" "}
      <main className="flex-grow">
        <div className="">
          <HeroSection />
          <MainPageUser />
        </div>
      </main>
      <Introduce />{" "}
    </>
  );
};

export default TestView;