import React, { useRef, useState } from 'react';
import { Validation } from 'src/Constants/constants';
import { useHistory } from "react-router-dom";
import { APP_CONFIG } from '../../Constants/Config';
import OutSideCloseHelper from '../SharedComponent/OutSideCloseHelper';
import { ROUTES_PATH } from 'src/Constants/Routes';

const FooterCheckoutMenu = (props) => {
    const modalRef = useRef(null);
    const imgPath = APP_CONFIG.IMAGE_PATH;
    const [paymentMenu, setPaymentMenu] = useState(false);
    let history = useHistory();

    const onCreateOrder =  (payMethod) => {
       if(props.cartList && props.cartList.length > 0){
           console.log("wish", props)
         props.userCreateOrder({payMethod, wish: props.wish})
         .then(data => {
             console.log(data)
             if(data === Validation.success){
                history.push(ROUTES_PATH.INVOICE);
             }
         })
       }
    }
    
    OutSideCloseHelper(modalRef, () => setPaymentMenu(false));
    return (
        <div ref={modalRef} data-hover="" data-delay="0" className="dropdown-2 w-dropdown">
            {props.cartList && !!props.cartList.length && <div className="dropdown-toggle-2 w-dropdown-toggle" onClick={() => setPaymentMenu(!paymentMenu)}>
                <div className="text-block-304">checkout</div>
                <img src={`${imgPath}/moneyAsset-2.svg`} loading="lazy" width="17" height="17" alt="" className="image-117" />
            </div>}
            {paymentMenu ?
                <nav className="dropdown-list-2 w-dropdown-list w--open">
                    <div className="w-layout-grid grid-5">
                        <div className="div-block-41" onClick={() => onCreateOrder('paypal')}>
                            <img src={`${imgPath}/paypalAsset-1.svg`} loading="lazy" width="33" height="33" alt="" className="image-116" />
                            <div className="text-block-306">PayPal</div>
                        </div>
                        <div className="div-block-41" onClick={() => onCreateOrder('cash')}>
                            <img src={`${imgPath}/euro_dAsset-2.svg`} loading="lazy" width="33" height="33" alt="" className="image-116" />
                            <div className="text-block-306">Cash</div>
                        </div>
                    </div>
                    <div className="text-block-307">By clicking on &quot;payment method&quot; you agree to our conditions and customer agreements.<br />There is also a commitment to buy as such as a contract of purchase in mind.</div>
                    <div className="linktoagreement">
                        <a href="#" className="link-7">Terms&amp;Comnditions</a>
                    </div>
                </nav> : ''}
        </div>
    )
}

export default FooterCheckoutMenu;