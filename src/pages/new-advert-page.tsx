import "./new-advert-page.css";
import Button from "../components/ui/button";
import Photo from "../components/ui/photo";
import Textarea from "../components/ui/textarea";
import Page from "../components/layout/page";

const MAX_CHARACTERS = 140;

function NewAdvertPage() {
  return (
    <Page title="What are you thinking?">
      <div className="new-advert-page">
        <div>
          <Photo />
        </div>
        <form className="new-advert-page-form">
          <Textarea
            className="new-advert-page-textarea"
            placeholder="Hey! What's up!"
            maxLength={MAX_CHARACTERS}
          />
          <div className="new-advert-page-footer">
            <span className="new-advert-page-characters"></span>
            <Button
              type="submit"
              className="new-advert-page-submit"
              $variant="primary"
            >
              Let's go!
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}

export default NewAdvertPage;
