import { getLatestAdverts } from "../api/service";
import { useEffect, useState } from "react";
import type { Advert } from "../api/types";
import Layout from "../components/layout";

interface AdvertsPageProps {
  // active: boolean;
  isLogged: boolean;
  onLogout: () => void;
}

function AdvertPage({ ...rest }: AdvertsPageProps) {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    async function getAdverts() {
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
    }
    getAdverts();
  }, []);

  return (
    <Layout title="What are you thinking?!" {...rest}>
      <div>
        <h1>Anuncios disponibles</h1>
        <ul>
          {adverts.map((ad) => (
            <li key={ad.id}>
              <strong>{ad.name}</strong> - {ad.price}€
              <span>
                {ad.sale ? "En venta" : "Se compra"} | Tags:{" "}
                {ad.tags.join(", ")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default AdvertPage;
