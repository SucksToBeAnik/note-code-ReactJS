import { useSelector } from "react-redux";
import Navbar from "./components/ui/navbar";
import { RootState } from "./store";
import Hero from "./components/ui/hero";
import ProtectedContent from "./components/main/protected-content";
import Toast from "./components/ui/toast";

const App = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  const toast = useSelector((state:RootState)=>state.toastReducer.toast)

  return (
    <div className="font-primary scroll-smooth">
      <Navbar />
      <div className="container max-w-screen-xl mx-auto">{isLoggedIn ? <ProtectedContent /> : <Hero />}</div>


      {toast && <Toast msg={toast.msg} toastType={toast.type} />}
    </div>
  );
};

export default App;
