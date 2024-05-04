import { useSelector } from "react-redux";
import Navbar from "./components/ui/navbar";
import { RootState } from "./store";
import Hero from "./components/ui/hero";
import ProtectedContent from "./components/main/protected-content";

const App = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  return (
    <div>
      <Navbar />

      <div className="container max-w-screen-xl mx-auto">{isLoggedIn ? <ProtectedContent /> : <Hero />}</div>
    </div>
  );
};

export default App;
