import Footer from "../components/footer";
import Header from "../components/header";

function Pagenotfound() {
  return (
    <>
      <Header />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
              <div className="container">
                <div className="row">
                  <div className="wpwheels-errorpage">
                    <h1>404 Page Not Found!!!</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pagenotfound;
