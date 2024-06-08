import { useSelector } from "react-redux";
import Confirm from "./components/routes/confirm";
import Home from "./components/routes/home";

export default function App() {
  const pageName = useSelector(
    (state) => state.pager && state.pager.currentPageName
  );

  return (
    <>
      {pageName === "home" && <Home />}
      {pageName === "confirm" && <Confirm />}
    </>
  );
}
