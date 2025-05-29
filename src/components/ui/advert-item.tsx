import "./advert-item.css";
import type { Advert } from "../../pages/advert/types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, sale, price, tags } = advert;
  return (
    <article className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-md">
      <div className="flex flex-1 flex-col justify-between">
        <header className="mb-2 flex items-start justify-between">
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              sale ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {sale ? "Sale" : "Buy"}
          </span>
        </header>

        <p className="mb-2 text-sm text-gray-700">Precio: {price}€</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default AdvertItem;
