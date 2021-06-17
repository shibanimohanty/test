/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { APP_CONFIG } from '../../Constants/Config';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '../../Constants/Routes';

const CheckoutItemCard = (props) => {
    const [displayCancel, setDisplayCancel] = useState(true);
    const product = props.itemDetails;

    const imgPath = APP_CONFIG.IMAGE_PATH;

    const redirectToItemPage = (event, props) => {
        props.getItemDetailsFromTotalList(product)
    }

    const getImageStyles = (product) => {
        let styles = {};
        if(product.images && product.images.length) {
            styles = {
                backgroundImage: `url(${product.images[0]}`
            }
        } else {
            styles = {
                backgroundImage: `url(${imgPath}/picture_dAsset-1.svg`,
                backgroundPosition: '25px',
                backgroundSize: '40% 50%'
            }
        }
        return styles;

    }


    return (
        <div className="buyitem">

            {displayCancel ?
                <>
                    <div className="div-block-25"  >
                        <Link className="div-block-26-copy" style={getImageStyles(product)} to={ROUTES_PATH.ITEM_DETAILS} onClick={(event) => redirectToItemPage(event, props)}></Link>
                        <div className="div-block-27">
                            <div className="text-block-151">{product && product.name}</div>
                            <div className="text-block-152">{(product && product.price * product.count)} €</div>
                            <div className="div-block-746">
                               {(product && product.count > 1) ?  (<div data-w-id="99326b83-5e62-53a1-bee8-9e7464ebc8c4" className="minusbuy" onClick={(e) => {
                                    e.stopPropagation();
                                    return props.updateCart(product, product.Id, 'remove')
                                }} >
                                    <img src={`${imgPath}/minus_dark.svg`} loading="lazy" width="17" height="17" />
                                </div>) : <div className="empty-flex" ></div> }
                                <div data-w-id="16bca975-36dc-8e09-20bc-26cf20931378" className="text-block-344">{product && product.count > 0 ? product.count : 'Buy'}</div>
                                <div className="plusbuy" onClick={(e) => {
                                    e.stopPropagation();
                                    return props.updateCart(product, product.Id, 'add')
                                }} >
                                    <img src={`${imgPath}/plus_dark.svg`} loading="lazy" width="17" height="17" />
                                </div>
                            </div>
                        </div>
                        <img src={`${imgPath}/close_rAsset-5.svg`} onClick={() => setDisplayCancel(!displayCancel)} loading="lazy" width="22" height="22" data-w-id="cad0e7e3-25b1-3ffd-9b0c-f60171b9bab0" alt="" className="image-112" />
                    </div>
                </> :
                <>
                    <div data-w-id="f001c6a2-b487-da37-0456-149bda990797" onClick={() => setDisplayCancel(true)} className="text-block-314 cancelButton">cancel</div>

                    <div className="deleteitem deletButton" onClick={() => props.deleteItemFromCart(product.id)}>delete</div>
                </>
            }

        </div>
    )
}

export default CheckoutItemCard;