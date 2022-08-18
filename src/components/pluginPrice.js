import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import BuyNow from "../BuyNow/buyNow";

export default function PluginPrice({ pricingPlan }) {
  const state = {
    listitems: [
      "Access to one Selected Theme",
      "Lifetime rights to use your theme",
      "Extensive documentation",
      "One year regular free updates",
      "Online chat support",
      "Video tutorials",
    ],
  };
  return (
    <div className="pricing-plans">
      <div>
        <Card
          className="wpwheels-regular top-card"
          sx={{
            minWidth: 50,
            backgroundColor: "#F5F4FD",
            color: "#1E193F",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 18, color: "#1E193F" }} gutterBottom>
              Regular
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: "rgba(30, 25, 63, 0.4)",
                }}
              >
                $299{" "}
              </span>
              $199/Year
            </Typography>
            <Typography sx={{ mb: 1.5, color: "#1E193F" }}>
              20% Off - Save $100
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="wpwheels-regular lower-card"
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
              {state.listitems.map((listitem) => (
                <li key={listitem} className="list-group-item">
                  <i className="ti ti-check"></i>
                  {listitem}
                </li>
              ))}
            </ul>
            <div>
              <BuyNow />
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card
          className="wpwheels-developer top-card"
          sx={{
            minWidth: 50,
            backgroundColor: "#28244D",
            color: "#fff",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 18, color: "#fff" }} gutterBottom>
              Developer
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: "rgba(255, 255, 255, 0.4)",
                }}
              >
                $599{" "}
              </span>
              399/Year
            </Typography>
            <Typography sx={{ mb: 1.5, color: "#fff" }}>
              20% Off - Save $200
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="wpwheels-developer lower-card"
          sx={{
            minWidth: 50,
            backgroundColor: "#F5F4FD",
            color: "#1E193F",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <CardContent>
            <ul className="list-group">
              {state.listitems.map((listitem) => (
                <li key={listitem} className="list-group-item">
                  <i className="ti ti-check"></i>
                  {listitem}
                </li>
              ))}
            </ul>
            <div>
              <BuyNow />
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card
          className="wpwheels-enterprise top-card"
          sx={{
            minWidth: 50,
            backgroundColor: "#F5F4FD",
            color: "#1E193F",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 18, color: "#1E193F" }} gutterBottom>
              Enterprise
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: "rgba(30, 25, 63, 0.4)",
                }}
              >
                $699{" "}
              </span>
              $599/Year
            </Typography>
            <Typography sx={{ mb: 1.5, color: "#1E193F" }}>
              20% Off - Save $100
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="wpwheels-enterprise lower-card"
          sx={{
            minWidth: 50,
            backgroundColor: "#F5F4FD",
            color: "#1E193F",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <CardContent>
            <ul className="list-group">
              {state.listitems.map((listitem) => (
                <li key={listitem} className="list-group-item">
                  <i className="ti ti-check"></i>
                  {listitem}
                </li>
              ))}
            </ul>
            <div>
              <BuyNow />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
