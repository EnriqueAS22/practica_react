import "./new-advert-page.css";
import { createAdvert } from "./service";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useState } from "react";

export default function NewAdvertPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: "",
    tags: [] as string[],
    photo: null as File | null,
  });

  const isFromDisabled =
    formData.name ||
    formData.price ||
    formData.sale ||
    formData.tags.length >= 0;

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("sale", formData.sale.toString());
      data.append("price", formData.price.toString());
      formData.tags.forEach((tag) => data.append("tags", tag));
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const createdAdvert = await createAdvert(data);
      navigate(`/aderts/${createdAdvert.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          navigate("/login", { replace: true });
        } else {
          console.error("No se pudo crear...", error);
        }
      }
    }
  };

  return (
    <Page title="Create Advert">
      <div className="new-advert-page">
        <form onSubmit={handleSubmit} className="new-advert-page-form">
          <div className="form-label">
            <label className="form-field-label">
              <span>Foto (opcional)</span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="form-field-input"
              />
            </label>
          </div>

          {formData.photo && (
            <div className="photo-preview">
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Preview"
                style={{ maxWidth: "200px", marginTop: "1rem" }}
              />
            </div>
          )}

          <div className="new-advert-page-textarea">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, name: event.target.value }))
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
                checked={formData.sale === "true"}
                onChange={() =>
                  setFormData((prev) => ({
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
                checked={formData.sale === "false"}
                onChange={() =>
                  setFormData((prev) => ({
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
              value={formData.price}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, price: event.target.value }))
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
                    checked={formData.tags.includes(tag)}
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
