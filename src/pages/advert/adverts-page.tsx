import "./adverts-page.css";
import { getLatestAdverts } from "../../api/service";
import { useEffect, useState } from "react";
import type { Advert } from "../../api/types";
import Button from "../../components/ui/button";
import AdvertItem from "./advert-item";
import Page from "../../components/layout/page";
import { Link } from "react-router";

const EmptyList = () => (
  <div className="adverts-page-empty">
    <p>Be the first one!</p>
    <Button $variant="primary">Create advert</Button>
  </div>
);

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    async function getAdverts() {
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
    }
    getAdverts();
  }, []);

  return (
    <Page title="Heeeey! I'm Layout">
      <div className="adverts-page">
        {adverts.length ? (
          <ul>
            {adverts.map((advert) => (
              <li key={advert.id}>
                <Link to={`/adverts/${advert.id}`}>
                  <AdvertItem advert={advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
