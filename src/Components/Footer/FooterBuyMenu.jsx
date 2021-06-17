import React, { useEffect, useState } from 'react';

const FooterBuyMenu = (props) => {
    const [cartDetails, setCartDetails] = useState({});
    useEffect(() => {
        let cartItem = props.cartList.filter(cart => cart.id == props.itemDetails.id);
        setCartDetails(cartItem && cartItem.length > 0 ? { ...cartItem[0] } : {});
    }, [props])

    console.log("cart detaiks", cartDetails)

    return (
        <div className="div-block-40">
            {cartDetails && (cartDetails.count > 0) ? <div data-w-id="99326b83-5e62-53a1-bee8-9e7464ebc8c4" className="minusprice" onClick={() => props.updateCart(props.itemDetails, props.itemDetails.Id, 'remove')} >-</div> : null}
            <div data-w-id="16bca975-36dc-8e09-20bc-26cf20931378" className="text-block-302" onClick={() => (cartDetails && !(cartDetails.count > 0) ? props.updateCart(props.itemDetails, props.itemDetails.Id, 'add') : null)}>{cartDetails && cartDetails.count > 0 ? cartDetails.count : 'Buy'}</div>
            {cartDetails && (cartDetails.count > 0) ? <div className="text-block-302-copy" onClick={() => props.updateCart(props.itemDetails, props.itemDetails.Id, 'add')} >+</div> : ''}
        </div>
    )
}

export default FooterBuyMenu;