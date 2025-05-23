import LoginPage from "./auth/login-page";
import Layout from "./components/layout";
import AdvertPage from "./pages/adverts-page";
import { Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/adverts" element={<Layout />}>
        <Route index element={<AdvertPage />} />
        {/* <Route path=":advertId" element={<AdvertPage />} /> */}
        {/*<Route path="new" element={<NewAdvertPage />} />*/}
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
