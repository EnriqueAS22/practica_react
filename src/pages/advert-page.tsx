import { useParams } from "react-router";
import Page from "../components/layout/page";

function AdvertPage() {
  const params = useParams();
  return <Page title="Advert Detail">Advert Detail {params.advertId}</Page>;
}

export default AdvertPage;
