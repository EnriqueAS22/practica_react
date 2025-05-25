import "./new-advert-page.css";
import { useState, type FormEvent } from "react";
import { createAdvert } from "../../api/service";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import { useLocation, useNavigate } from "react-router";

export default function NewAdvertPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    sale: "",
    tags: [] as string[],
  });

  const isFromDisabled =
    formState.name ||
    formState.price ||
    formState.sale ||
    formState.tags.length >= 0;

  const handleTagToggle = (tag: string) => {
    setFormState((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target as HTMLFormElement);

      const data = new FormData();
      data.append("name", formState.name);
      data.append("sale", formState.sale);
      data.append("price", formState.price);

      formState.tags.forEach((tag) => data.append("tags", tag));

      const file = formData.get("photo") as File;
      if (file && file.size > 0) {
        data.append("photo", file);
      }

      await createAdvert(formData);
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Create Advert">
      <div className="new-advert-page">
        <form onSubmit={handleSubmit} className="new-advert-page-form">
          <div className="new-advert-page-textarea">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formState.name}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </div>

          <div className="new-advert-page-textarea">
            <label>
              <input
                name="sale"
                type="radio"
                required
                value="true"
                checked={formState.sale === "true"}
                onChange={() =>
                  setFormState((prev) => ({
                    ...prev,
                    sale: "true",
                  }))
                }
              />
              Sale
            </label>
            <label>
              <input
                name="sale"
                type="radio"
                required
                value="false"
                checked={formState.sale === "false"}
                onChange={() =>
                  setFormState((prev) => ({
                    ...prev,
                    sale: "false",
                  }))
                }
              />
              Buy
            </label>
          </div>

          <div className="new-advert-page-textarea">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              value={formState.price}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, price: event.target.value }))
              }
            />
          </div>

          <div className="new-advert-page-textarea">
            <label>Tags</label>
            <div>
              {["lifestyle", "motor", "mobile", "work"].map((tag) => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    checked={formState.tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Button
              title="Create!"
              disabled={!isFromDisabled}
              $variant="primary"
            >
              Create!
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}
