import Card from "@material-ui/core/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BuyNow from "../BuyNow/buyNow";

const ThemePrice = ({ pricingPlan }) => {
  return (
    <div className="pricing-plans">
      {pricingPlan &&
        pricingPlan.map((plan) =>
          plan.themePlanGroup.map((themePlan) => {
            if (themePlan.planTitle == "Regular") {
              var a = "wpwheels-regular top-card";
              var b = "wpwheels-regular lower-card";
            } else if (themePlan.planTitle == "Developer") {
              var a = "wpwheels-developer top-card";
              var b = "wpwheels-developer lower-card";
            } else if (themePlan.planTitle == "Enterprise") {
              var a = "wpwheels-enterprise top-card";
              var b = "wpwheels-enterprise lower-card";
            }
            return (
              <div className="plans-wrapper">
                <Card className={a}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 18, color: "#1E193F" }}
                      gutterBottom
                    >
                      {themePlan.planTitle}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      <span className="price-without-discount">
                        {themePlan.priceWithNoDiscount}{" "}
                      </span>
                      {themePlan.priceWithDiscount}
                    </Typography>
                    <Typography sx={{ mb: 1.5, color: "#1E193F" }}>
                      {themePlan.discountOffer}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  className={b}
                  sx={{
                    minWidth: 50,
                    backgroundColor: "#EDECFA",
                    color: "#1E193F",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  <CardContent>
                    <ul className="list-group">
                      {themePlan &&
                        themePlan.availableThemePlansGroup.map((listitem) => (
                          <li key={listitem} className="list-group-item">
                            <i className="ti ti-check"></i>
                            {listitem.availablePlans}
                          </li>
                        ))}
                    </ul>
                    <div>
                      <BuyNow />
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })
        )}
    </div>
  );
};
export default ThemePrice;
