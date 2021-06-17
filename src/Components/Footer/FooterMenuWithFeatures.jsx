import React from 'react';
import FooterMenu from './FooterMenu';
import SearchComponent from '../SearchComponents/SearchComponent';
import FooterBuyMenu from './FooterBuyMenu';
import FooterCheckoutMenu from './FooterCheckOutMenu';

const FooterMenuWithFeatures = (props) => {
    console.log("props=======================", props)
    return (
        <div className={`${props.checkoutMenu ? "div-block-39" : "div-block-38"}`}>
            <div className={`${props.checkoutMenu ? 'checkoutnav' : 'mobile_nav'}`}>
                {props.search ?
                    <>
                        <SearchComponent searchInputValue={props.searchText} searchIcons={props.searchIcon} handleSearch={props.handleSearch} 
                            updateSearch={props.updateSearchText} cancelSearchText={props.cancelSearchText} globalSearch={props.globalSearch}
                            updateSearchIcons={props.updateIconsInSearch}
                        />
                    </> : ''}
                {props.buyMenu ?
                    <FooterBuyMenu itemDetails={props.itemDetails} cartList={props.cartList} updateCart={props.updateCart} />
                    : ''}
                {props.checkoutMenu ?
                    <FooterCheckoutMenu userCreateOrder={props.userCreateOrder} cartList={props.cartList} wish={props.wish} />
                    : ''}
                <FooterMenu cartList={props.cartList} waiterCalling={props.waiterCalling} cancelSearchText={props.cancelSearchText}
                changeWaiterCalling={props.callingWaiter} undoCallingWaiter={props.undoCallingWaiter}/>
            </div>
        </div>
    )
}

export default FooterMenuWithFeatures;