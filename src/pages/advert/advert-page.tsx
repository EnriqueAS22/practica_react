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
        <div className="advert-image">
          <img
            src={advert?.photo ? `${advert.photo}` : "/placeholder.png"}
            alt={advert?.name}
            style={{
              maxWidth: "300px",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          />
        </div>
        User id: {params.advertId}
        <br />
        <h2>{advert?.name}</h2>
        <br />
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            advert?.sale
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {advert?.sale ? "Sale" : "Buy"}
        </span>
        <br />
        <p className="mb-2 text-sm text-gray-700">Precio: {advert?.price}€</p>
        <br />
        <div className="flex flex-wrap gap-2">
          {advert?.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
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
