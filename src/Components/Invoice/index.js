import React, { useEffect, useState } from "react";
import { toCurrency, transformDate } from "src/Helpers/Util";
import { APP_CONFIG } from "../../Constants/Config";
import FooterMenuContainer from "../../Containers/FooterMenuContainer";
// import FooterMenuWithFeatures from "../Footer/FooterMenuWithFeatures";

const Invoice = (props) => {
  console.log(props);
  const { invoice } = props;
  const imgPath = APP_CONFIG.IMAGE_PATH;
  const qrCodeIcon = `${imgPath}/qr4_inv2Asset-4.svg`;
  const [orderDateTime, setOrderDateTime] = useState(new Date());
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    if(invoice.products)
      calculateTotal();
  }, [invoice.products]);

  const calculateTotal = () => {
    let total = invoice.products.reduce((sum, item) => sum + (item.quantity * parseInt(item.price, 10)), 0);
    console.log(total);
    setOrderTotal(total);
  }

 
  console.log(orderDateTime)

  return (
    <div className="receipt_body">
      <div className="mobile_receipt">
        <div className="div-block-743">
          <div className="text-block-341-copy">Thank you for visiting us</div>
          <div className="text-block-341">Zum Goldenen Ritter</div>
          <div className="columns w-row">
            <div className="w-col w-col-9 w-col-medium-9 w-col-small-9 w-col-tiny-9">
              {invoice.products.map( (product, index) => (<div key={index} className="text-block-340">{product.productName} x {product.quantity}</div>) )}
              <div className="text-block-340-copy">total</div>
              {/* <div className="text-block-340-copy">tax</div> */}
              <div className="text-block-340-copy">method</div>
            </div>
            <div className="w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
              {invoice.products.map( (product, index) => (<div key={index} className="text-block-340">{toCurrency(parseInt(product.price, 10) * product.quantity)}</div>) )}
              <div className="text-block-340-copy">{toCurrency(orderTotal)}</div>
              {/* <div className="text-block-340-copy">tax</div> */}
              <div className="text-block-340-copy">{invoice.payMethod}</div>
            </div>
          </div>
          <div className="text-block-341-copy">{transformDate(orderDateTime, 'DD.MM.YYYY hh:mm:a')}</div>
        </div>
        <img
          src={qrCodeIcon}
          loading="lazy"
          width="99"
          height="99"
          alt="qrcode"
        />
        <FooterMenuContainer checkoutMenu={true} />
      </div>
    </div>
  );
};

export default Invoice;
