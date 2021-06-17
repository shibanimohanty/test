import React, { useEffect, useRef, useState } from 'react';
import { APP_CONFIG } from '../../Constants/Config';
import { Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import { ROUTES_PATH } from '../../Constants/Routes';
import { itemDetailsImage, itemTypeIconImages, TAG_ICONS } from '../../Constants/data';
import FooterMenuContainer from '../../Containers/FooterMenuContainer';
import LanguageDropdown from '../SharedComponent/LanguageDropdown';
import OutSideCloseHelper from '../SharedComponent/OutSideCloseHelper';

const ItemDetails = (props) => {
    const modalRef = useRef(null);
    const imgPath = APP_CONFIG.IMAGE_PATH;
    const taggedIcons = TAG_ICONS;
    const [displayMore, setDisplayMore] = useState(false);
    const [itemDetails, setItemDetails] = useState({});

    useEffect(() => {
        setItemDetails(props.itemDetails);
    }, [])

    const getCarouselImages = (product) => {
        let productImages = product.images;
        if(!productImages || !productImages.length)
             return <img className="empty-img" src={`${imgPath}/picture_dAsset-1.svg`} />

        return productImages.map((imagePath, index) => {
            return <img src={imagePath} key={index} />
        });

    }

    const renderCarousel = (product) => {
        return <Carousel className="mask w-slider-mask">
            {getCarouselImages(product)}
        </Carousel>

    }

    const mapIcons = (icons) => {
        let tagsHtml = [];
        if(icons && icons.length) {
            taggedIcons.forEach( (tags, index) => {
                icons.forEach( (icon, indexInner) => {                    
                    if(tags.name.toLowerCase() === icon.id.toLowerCase()){
                        tagsHtml.push(<img key={indexInner} src={imgPath + '/' + tags.image} loading="lazy" width="22" className="image-20" />)
                    }
                })
            } )
        }
        return tagsHtml;
    } 



    OutSideCloseHelper(modalRef, () => setDisplayMore(false));
    return (
        <div className="itembody">
            <div className="mobile_itemview">
                {/* Slider */}
                <div className="item_slider">
                    <div className="slider w-slider">
                        {renderCarousel(itemDetails)}
                        {/* <div className="slide-nav w-slider-nav w-slider-nav-invert w-round"></div> */}
                    </div>
                </div>
                {/* Slider Exit */}
                {/* Item details */}
                <div className="itemtxtlayer">
                    <div className="iteminfo1">{itemDetails && itemDetails.name}</div>
                    <div className="icons">
                        { mapIcons(itemDetails.icons) }
                    </div>
                    <div className="iteminfo2">{itemDetails.information}</div>
                    {itemDetails?.extraInformation && <div className="moretxt" onClick={() => setDisplayMore(!displayMore)} >mehr</div>}
                    <div className="text-block-303">{itemDetails && itemDetails.price}€</div>
                    {displayMore ? <div className="moretxtpop" style={{ "display": "flex" }} ref={modalRef} >
                        <div className="text-block-334">{itemDetails.extraInformation}</div>
                        <img src={`${imgPath}/close_rAsset-5.svg`} onClick={() => setDisplayMore(false)} loading="lazy" width="22" height="22" data-w-id="f66f71b6-44c1-a558-956c-b7b052965c98" alt="" className="image-123" />
                    </div> : ''}
                </div>
                <Link to={ROUTES_PATH.ITEM_LIST}>
                    <img src={`${imgPath}/back_arrowAsset-2.svg`} loading="lazy" width="17" height="17" alt="" className="image-111" />
                </Link>
                <FooterMenuContainer buyMenu={true} itemDetails={itemDetails} />
                <LanguageDropdown />
            </div>
        </div>
    )
}

export default ItemDetails;