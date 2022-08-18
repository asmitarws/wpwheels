import Header from "../components/header";
import group from "../assets/images/group.png";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function Support() {
  return (
    <>
      <Header />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
              <section className="wpwheels-support">
                <form className="support-form">
                  <p className="header-text">
                    Paying customers with an active license key can submit a
                    ticket using the form below. We generally respond to new
                    tickets within 12-24 hours.
                  </p>
                  <div className="form-field">
                    <label className="form-label">
                      Your Name *
                      <input
                        className="form-input"
                        type="text"
                        name="name"
                        required
                        placeholder="Daniel Doe"
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label className="form-label">
                      Email *
                      <input
                        className="form-input"
                        type="text"
                        name="email"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label className="form-label">
                      Website *
                      <input
                        className="form-input"
                        type="text"
                        name="website"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label className="form-label">
                      Subject *
                      <input
                        className="form-input"
                        type="text"
                        name="subject"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label className="form-label">
                      Message *
                      <textarea
                        className="form-input"
                        type="text"
                        name="message"
                        required
                        cols="20"
                        rows="10"
                        wrap="hard"
                        maxlength="100"
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label className="form-label">
                      Upload *
                      <div className="drag-area">
                        <header className="entry-header">Drop files here or</header>
                        <button className="wpwheels-support-button">
                          Select Files
                          <i className="ti ti-arrow-down"></i>
                        </button>
                        <input type="file" hidden />
                      </div>
                    </label>
                  </div>

                  <p style={{ margin: "0" }}>
                    Accepted file types: jpg, gif, png, jpeg, Max. file size:
                    128 MB.
                  </p>
                  <p style={{ margin: "0 0 15px" }}>
                    You can attach screenshots here
                  </p>

                  <div className="wpwheels-button support-btn">
                    <Link to="#" target="_self">
                      Submit
                      <span className="ti ti-arrow-right"></span>
                    </Link>
                  </div>
                </form>
                <div className="wpwheels-support-ticket">
                  <span className="support-ticket">
                    <figure>
                      <img src={group} className="group" alt="group" />
                    </figure>
                  </span>
                  <span className="entry-title wpwheels-support">
                    <h1 className="support-header">We are available 24 X 7</h1>
                    <p>
                      You are fully protected by our 100% No-Risk
                      Double-Guarantee. If WP Wheels Pro Packages doesn't
                      satisfy your requirements, we’ll happily refund 100% of
                      the purchase amount within 14 days of your purchase. No
                      questions asked!
                    </p>
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
