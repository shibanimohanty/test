/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import { APP_CONFIG } from '../../Constants/Config';
import FooterMenuWithFeatures from '../Footer/FooterMenuWithFeatures';
import CheckoutItemCard from './CheckoutItemCard';
import FooterMenuContainer from '../../Containers/FooterMenuContainer';

const Checkout = (props) => {
    console.log("Checkout", props)
    const imgPath = APP_CONFIG.IMAGE_PATH;
    const [cartList, setCartList] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [wish, setWish] = useState('');

    const textRef = useRef();

    const onChangeHandler = (e) => {
        const target = e.target;
        let height = target.scrollHeight ;
        target.style.height = 'auto';
        target.style.height = `${height}px`;
        setWish(e.target.value);
        console.log("target", e.target.value)
    };

    const handleCartItemRendering = () => {

        if(cartList && !cartList.length) {
            return <React.Fragment>
                <div className="basketempty">
                    <img src={`${imgPath}/saladAsset-1.svg`} loading="lazy" width="33" height="33" className="image-125" />
                    <div className="text-block-343">still not hungry?</div>
                </div>
            </React.Fragment>
        }

        return cartList.map(data => {
            return <CheckoutItemCard key={data.id}
                itemDetails={data} getItemDetailsFromTotalList={props.getItemDetailsFromTotalList}
                updateCart={props.updateCart} deleteItemFromCart={props.deleteItemFromCart} />
        })
    }

    useEffect(() => {
        setCartList(props.cartList);
        let total = 0;
        props.cartList.map(cart => {
            total = total + (cart.count * cart.price);
        })
        setTotalCartPrice(total);
    }, [props.cartList])

    return (
        <div className="checkout_body">
            <div className="mobile_chekout">

                {/* Buy item list */}
                {handleCartItemRendering()}
                {/* Buy Item List end */}
                {cartList && !!cartList.length && <React.Fragment>
                    <div className="text-block-308"> total {totalCartPrice} €</div>
                    <div className="text-block-308-copy"> tax {(totalCartPrice * 19) / 100} €</div>
                    <div className="div-block-33">
                        <img src={`${imgPath}/bell_dAsset-3.svg`} loading="lazy" width="22" height="22" alt="" className="image-113" />
                        <div className="text-block-155">Checkout cashless or call waiter for help.</div>
                        <div className="form-block-2 w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" className="form-2">
                                <textarea placeholder="wish something for this order?" maxLength="5000" id="field" name="field" className="wish textarea w-input"
                                ref={textRef}
                                onChange={onChangeHandler} ></textarea></form>
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>}
                <FooterMenuContainer checkoutMenu={true} wish={wish}/>
            </div>
        </div>
    )
}

export default Checkout;