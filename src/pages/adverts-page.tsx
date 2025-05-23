import styles from "./adverts-page.module.css";
import { getLatestAdverts } from "../api/service";
import { useEffect, useState } from "react";
import type { Advert } from "../api/types";
import Page from "../components/page";
import clsx from "clsx";
import Button from "../assets/button";

/* 
interface AdvertsPageProps {
  active: boolean;
} 
*/

function AdvertPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    async function getAdverts() {
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
    }
    getAdverts();
  }, []);

  return (
    <Page title="What are you thinking?!">
      <div className={clsx(styles["adverts-page"])}>
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
        <Button disabled={true} $variant="secondary">
          hola
        </Button>
      </div>
    </Page>
  );
}

export default AdvertPage;
