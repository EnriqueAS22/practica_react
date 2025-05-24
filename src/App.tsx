import LoginPage from "./auth/login-page";
import Layout from "./components/layout/layout";
import AdvertsPage from "./pages/adverts-page";
import { Navigate, Route, Routes } from "react-router";
import NewAdvertPage from "./pages/new-advert-page";
import RequiredAuth from "./auth/required-auth";
import AdvertPage from "./pages/advert-page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/adverts" element={<Layout />}>
        <Route index element={<AdvertsPage />} />
        <Route path=":advertId" element={<AdvertPage />} />
        <Route
          path="new"
          element={
            <RequiredAuth>
              <NewAdvertPage />
            </RequiredAuth>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
