import { FSCheckout } from "freemius-checkout-js";
import { Link } from "react-router-dom";

const BuyNow = () => {

//   const checkout = theme.meta_fields.theme_cpt_general_options;

  // instantiate
  const fsCheckout = new FSCheckout({
    plugin_id: 10512,
    public_key: 'pk_8ffa535857862a588c5660dbc0a7f',
  });

  return (
    <Link
      className="box-button purchase-btn"
      onClick={(e) => {
        e.preventDefault();
        fsCheckout.open({
          plan_id: 17769,
          licenses: 1,
          billing_cycle: "annual",
          success: (data) => {
            console.log(data);
          },
        });
      }}
      to=""
    >
      BUY THEMES
    </Link>
  );
};

export default BuyNow;
