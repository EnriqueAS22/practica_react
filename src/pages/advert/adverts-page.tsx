import "./adverts-page.css";
import { getLatestAdverts, getTags } from "./service";
import { useEffect, useState } from "react";
import type { Advert, Tag } from "./types";
import AdvertItem from "../../components/ui/advert-item";
import Page from "../../components/layout/page";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/button";

const EmptyList = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/adverts/new");
  };

  return (
    <div className="adverts-page-empty">
      <p>Be the first one!</p>
      <Button $variant="primary" onClick={handleClick}>
        Create advert
      </Button>
    </div>
  );
};

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [filterAdverts, setFilterAdverts] = useState<Advert[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [filters, setFilters] = useState({
    name: "",
    priceRange: [0, 25000],
    sale: "all",
    selectedTags: [] as string[],
  });

  /*
  useEffect(() => {
    async function getAdverts() {
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
    }
    getAdverts();
  }, []);
  */

  useEffect(() => {
    getLatestAdverts().then((data) => {
      setAdverts(data);
      setFilterAdverts(data);
    });
    getTags().then(setTags);
  }, []);

  useEffect(() => {
    const result = adverts.filter((ad) => {
      const matchesName = filters.name
        ? ad.name.toLowerCase().startsWith(filters.name.toLowerCase())
        : true;

      const matchesPrice =
        ad.price >= filters.priceRange[0] && ad.price <= filters.priceRange[1];

      const matchesSale =
        filters.sale === "all" ? true : ad.sale === (filters.sale === "true");

      const matchesTags = filters.selectedTags.every((tag) =>
        tagsInclude(ad.tags, tag),
      );

      return matchesName && matchesPrice && matchesSale && matchesTags;
    });

    setFilterAdverts(result);
  }, [filters, adverts]);

  const tagsInclude = (tags: Tag[], tag: string) =>
    tags.some((t) => t.toString() === tag);

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  return (
    <Page title="GET PRODUCTS!">
      <div className="adverts-page">
        {/* Filtros */}

        <div className="dark:bg-dark-background space-y-6 rounded bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="name adverts filter"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <select
              value={filters.sale}
              onChange={(e) => setFilters({ ...filters, sale: e.target.value })}
            >
              <option value="all">Sale and Buy</option>
              <option value="true">Sale</option>
              <option value="false">Buy</option>
            </select>
            <div>
              <label htmlFor="">
                Price Range: {filters.priceRange[0]} - {filters.priceRange[1]}
              </label>
              <div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="50"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange[1]],
                    }))
                  }
                />
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)],
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-lg font-semibold">Tags</legend>
            <div className="mb-4 flex flex-wrap gap-4">
              {tags.map((tag) => (
                <label
                  key={tag}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={filters.selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="accent-blue-500"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/*{adverts.length ? (
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
        )}*/}

        {filterAdverts.length ? (
          <ul className="space-y-4">
            {filterAdverts.map((advert) => (
              <li
                key={advert.id}
                className="border-border dark:border-dark-border dark:bg-dark-background rounded-xl border bg-white p-4 shadow-md"
              >
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
