import "./adverts-page.css";
import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect, useState } from "react";
import type { Advert } from "./types";
import { deleteAdvert, getAdvert } from "./service";
import { AxiosError } from "axios";
import Button from "../../components/ui/button";

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

  const handleDelete = async () => {
    const confirmed = window.confirm("ESTAS SEGURO????");

    if (!confirmed || !advert) return;

    try {
      await deleteAdvert(advert.id);
      navigate("/adverts");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          navigate("/login", { replace: true });
        } else {
          console.error("Ups! error...", error.message);
        }
      }
    }
  };

  return (
    <Page title="Advert Detail">
      <div>
        Advert Detail
        {params.advertId}
        <br />
        {advert?.name}
        <br />
        {advert?.sale}
        <br />
        {advert?.price}
        <br />
        {advert?.tags}
        <Button
          $variant="secondary"
          onClick={handleDelete}
          className="delete-button"
        >
          Delete Advert!
        </Button>
      </div>
    </Page>
  );
}

export default AdvertPage;
