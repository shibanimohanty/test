import React, { useEffect, useState } from 'react';
import { APP_CONFIG } from '../../Constants/Config';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '../../Constants/Routes';
import { Validation } from 'src/Constants/constants';

const FooterMenu = (props) => {
    const imgPath = APP_CONFIG.IMAGE_PATH;
    const [displayBell, setDisplayBell] = useState(true);
    const [bellAnimation, setBellAnimation] = useState(false);

    const callWaiter = () => {
        props.changeWaiterCalling()
        .then(success => {
            if(success == Validation.success){
                setDisplayBell(true); 
                setBellAnimation(true); 
            }
        })
    }

    const undoCallWaiter = () => {
        if(props.waiterCalling){
            props.undoCallingWaiter()
            .then(success => {
                if(success == Validation.success){
                    setDisplayBell(true); 
                    setBellAnimation(true);
                }
            })
        }
    }

    console.log('dsdsd', bellAnimation)
    return (
        <div className="mobile_menu">
            { displayBell ?
                <>
                    <Link aria-current="page" className="mobile_back w-inline-block w--current" to={ROUTES_PATH.CATEGORY_LIST} onClick={() => props.cancelSearchText()}>
                        <img src={`${imgPath}/house_small_lightAsset-1.svg`} width="22" height="22" alt="" className="image-15" />
                        <div className="txticon">Menu</div>
                    </Link>
                    <div data-w-id="7aa821fd-41aa-ddf3-808a-8e61297e750a" className={`mobile_bell ${props.waiterCalling ? 'bellRingBell' : ''}`} onClick={() => setDisplayBell(false)}>
                        <img src={`${imgPath}/bell_small_lAsset-1.svg`} className={`${bellAnimation ? 'animateBell' : ''} image-15-bell`} width="22" height="22" alt="" />
                        <div className="txticon">Waiter</div>
                    </div>
                    <Link className="mobile_cart w-inline-block" to={ROUTES_PATH.CHECKOUT}>
                        <img src={`${imgPath}/cart_lAsset-1.svg`} width="22" height="22" alt="" className="image-15" />
                        <div className="txticon">Cart</div>
                        {props.cartList && props.cartList.length > 0 ?
                            <div className="text-block-311">
                                {props.cartList.length > 0 ? props.cartList.length : null}
                                {/* {props.cartList.reduce((total, cart) => {
                                return total + cart.count
                            }, 0)}</div> : null} */}
                            </div> : null}
                    </Link>
                </>
                :
                <>
                    <div className="div-block-37 footer">
                        <img src={`${imgPath}/bell2_redAsset-1.svg`} loading="lazy" width="22" height="22" alt="" className="image-115" />
                        <div className="text-block-300">call waiter?</div>
                    </div>
                    <div data-w-id="7aa821fd-41aa-ddf3-808a-8e61297e7516" className="text-block-301-copy" onClick={callWaiter}>yes</div>
                    <div data-w-id="7aa821fd-41aa-ddf3-808a-8e61297e7518" className="text-block-301" onClick={undoCallWaiter}>no</div>
                </>}
        </div>
    )
}

export default FooterMenu;