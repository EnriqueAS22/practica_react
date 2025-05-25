import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect, useState } from "react";
import type { Advert } from "../../api/types";
import { getAdvert } from "../../api/service";
import { AxiosError } from "axios";

function AdvertPage() {
  const params = useParams();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    getAdvert(params.advertId)
      .then((advert) => setAdvert(advert))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            navigate("/404", { replace: true });
          }
        }
      });
  }, [params.advertId, navigate]);

  return (
    <Page title="Advert Detail">
      Advert Detail {params.advertId}-{advert?.name}
    </Page>
  );
}

export default AdvertPage;
