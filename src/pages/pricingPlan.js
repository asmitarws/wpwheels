import { useEffect, useState } from "react";
import Header from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ThemePrice from "../components/themePrice";
import PluginPrice from "../components/pluginPrice";
import AllPricing from "../components/allPricing";
import Footer from "../components/footer";
import { API_URL_Custom } from "../config/config";
import axios from "axios";

const PricingPlan = () => {
  const baseURL = API_URL_Custom;
  const [plans, setPlans] = useState();

  useEffect(() => {
    const requestPlanUrl = `${baseURL}/pricing`;
    axios.get(requestPlanUrl).then((response) => {
      if (response.data) {
        const allPlans = response.data;
        setPlans(allPlans);
      } else {
        return;
      }
    });
  }, []);

  return (
    <>
      <Header />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            {plans &&
              plans.map((plan) => {
                return (
                  <div id="main" className="site-main">
                    <Tabs>
                      <TabList>
                        <Tab>Themes</Tab>
                        <Tab>Plugins</Tab>
                        <Tab>All</Tab>
                      </TabList>
                      <TabPanel>
                        <ThemePrice pricingPlan={plans} />
                      </TabPanel>
                      <TabPanel>
                        <PluginPrice pricingPlan={plans} />
                      </TabPanel>
                      <TabPanel>
                        <AllPricing pricingPlan={plans} />
                      </TabPanel>
                    </Tabs>

                    <div className="wpwheels-pricing">
                      <span className="secure-payment">
                        <figure>
                          <img
                            src={plan.securePaymentImage.url}
                            className="frame"
                            alt="frame"
                          />
                        </figure>
                      </span>
                      <span className="entry-title wpwheels-payment">
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: plan.paymentTitle,
                          }}
                          className="payment-header"
                        ></h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: plan.paymentDescription,
                          }}
                        ></p>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPlan;
