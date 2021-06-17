import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../Constants/Config';
import { ROUTES_PATH } from '../../Constants/Routes';

const ListViewItemCard = (props) => {
    const imgPath = APP_CONFIG.IMAGE_PATH;
    const product = props.item;
    console.log("props", props);

    const getImageStyles = (product) => {
        let styles = {};
        if(product.images && product.images.length) {
            styles = {
                backgroundImage: `url(${product.images[0]}`
            }
        }
        return styles;

    }

    return (
        <div className="m_item">
            <Link to={ROUTES_PATH.ITEM_DETAILS} onClick={() => props.getItemDetails(product.id)} style={getImageStyles(product)} className={"itempicture w-inline-block" + ((!product.images || !product.images.length) ? ' placeholder-nopicture' : '')} >
                <div className="text-block-148">{product && product.price}€</div>
            </Link>
            <div className="div-block-7">
                <div className="text-block-131">{product && product.name}</div>
                <div className="div-block-8">
                    <div className="div-block-745" onClick={() => props.updateCart(product, product.Id, 'remove')}>
                        <img src={`${imgPath}/minusAsset-2.svg`}  loading="lazy" width="19" alt="" />
                    </div>
                    <div className="text-block-147">{props.cartDetails && props.cartDetails.count ? props.cartDetails.count : 0}</div>
                    <div className="div-block-745" onClick={() => props.updateCart(product, product.Id, 'add')}>
                        <img src={`${imgPath}/plusAsset-1.svg`}  loading="lazy" width="19" alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListViewItemCard;