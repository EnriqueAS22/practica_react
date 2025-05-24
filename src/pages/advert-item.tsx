import "./advert-item.css";
import Photo from "../components/ui/photo";
import type { Advert } from "../api/types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name } = advert;
  return (
    <article className="advert-item">
      <div>
        <Photo className="advert-item-photo" />
      </div>
      <div className="right">
        <div className="advert-item-header">
          <span className="advert-item-name">{"Desconocido"}</span>
          <span className="advert-item-separator"></span>
        </div>
        <div>
          {name}
          <div className="advert-item-actions"></div>
        </div>
      </div>
    </article>
  );
};

export default AdvertItem;
