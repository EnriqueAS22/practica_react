import { getLatestAdverts } from "../api/service";
import { useEffect, useState } from "react";
import type { Advert } from "../api/types";
import { logout } from "../auth/service";

interface AdvertsPageProps {
  // active: boolean;
  onLogout: () => void;
}

function AdvertPage({ onLogout }: AdvertsPageProps) {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    async function getAdverts() {
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
    }
    getAdverts();
  }, []);

  const handleLogoutClock = async () => {
    await logout();
    onLogout();
  };

  return (
    <div>
      <h1>Anuncios disponibles</h1>
      <ul>
        {adverts.map((ad) => (
          <li key={ad.id}>
            <strong>{ad.name}</strong> - {ad.price}€
            <span>
              {ad.sale ? "En venta" : "Se compra"} | Tags: {ad.tags.join(", ")}
            </span>
          </li>
        ))}
      </ul>
      <button disabled={false} onClick={handleLogoutClock}>
        Logout
      </button>
    </div>
  );
}

export default AdvertPage;
