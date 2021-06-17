import React, { useEffect, useState } from 'react';
import { APP_CONFIG } from '../../Constants/Config';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES_PATH } from '../../Constants/Routes';
import ListViewItemCard from './ListViewItemCard';
import FooterMenuContainer from '../../Containers/FooterMenuContainer';
import LanguageDropdown from '../SharedComponent/LanguageDropdown';
import { validateActiveDay, validateActiveTime } from '../../Helpers/Util';

const ItemListView = (props) => {
    const imgPath = APP_CONFIG.IMAGE_PATH;
    const [itemList, setItemList] = useState([]);
    const [displayItemList, setDisplayItemList] = useState([]);
    const [globalSearch, setGlobalSearch] = useState(false);
    const [searchCode, setSearchCode] = useState('');

    const handleItemListRendering = () => {
        return displayItemList.map(item => {
            let cartItem = props.cartList && props.cartList.filter(cart => cart.id == item.id);

            if(item && item.hide == true) {
                return null;
            }

            // weekdays
            if(item.activeTime && item.activeTime.weekdays && !validateActiveDay(item.activeTime.weekdays)) {
                return null;
            }

            // timeBegin, timeEnd
            if(item.activeTime && !validateActiveTime(item.activeTime.timeBegin, item.activeTime.timeEnd)) {
                return null;
            }

            return <ListViewItemCard key={item.id} item={item} updateCart={props.updateCart}
                cartDetails={cartItem && cartItem.length > 0 ? cartItem[0] : {}} getItemDetails={props.getItemDetails} />
        })
    }

    const uniqueKeepLastData = (data, key) => {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }

    const handleSearch = (search, selectedFilter) => {
        console.log("seleced fileter", selectedFilter)
        search = search.toLowerCase();
        let tempItemList = [...itemList];
        let tempResult = [];
        if (search) {
            tempItemList.map(item => {
                if (item.name && item.name.toString().toLowerCase().includes(search.toLowerCase())) {
                    tempResult.push(item);
                }
                return item;
            })

        } else if (search == '') {
            tempResult = [...tempItemList];
        }
        console.log("search", search, selectedFilter, tempResult)
        let finalResult = []
        if (selectedFilter && selectedFilter.length > 0) {
            tempResult.map(item => {
                let valid = selectedFilter.length > 0 ? false : true;;
                selectedFilter.map(filter => {
                    if (valid) {
                        return;
                    }else{
                        valid = item.icons.map(icon => icon.id).includes(filter);
                    }
                })
                if (valid) {
                    finalResult.push(item);
                }
            })

        } else {
            finalResult = [...tempResult];
        }
        // let tempFinalResult = uniqueKeepLastData(finalResult, it => it.id)
        console.log("data fount", finalResult, finalResult)
        setSearchCode(search);
        setDisplayItemList([...finalResult]);
    }

    useEffect(() => {
         if(props.searchIcon && props.searchIcon.length > 0 && !props.globalSearch && itemList.length > 0){
            handleSearch('', props.searchIcon);
        }
    }, [itemList])

    console.log("pops om itemlist", props)
    useEffect(() => {
        if(!props.globalSearch){
        setItemList([...props.itemList]);
        setDisplayItemList([...props.itemList]);
        }
    }, [props.itemList])

    useEffect(() => {
        if(props.searchResult && props.globalSearch){
            setItemList([...props.searchResult]);
            setDisplayItemList([...props.searchResult]);
        }
    },[props.searchResult])


    useEffect(() => {
        if(globalSearch)
        setGlobalSearch(props.globalSearch ? true : 'reset');
        else if(props.globalSearch){
            setGlobalSearch(true)
        }
    }, [props.globalSearch])

    if(globalSearch == 'reset'){
        // setGlobalSearch(false);
        return  <Redirect to={ROUTES_PATH.CATEGORY_LIST} />
    }

    return (
        <div className="overviewbody">
            <div className="mobile_mainview">
                <div className="div-block-24">
                    <div className="text-block-150">{props.globalSearch ? `${props.searchText }` : (props.categoryName ? props.categoryName : "Todays Specials" )}</div>
                    <Link to={ROUTES_PATH.CATEGORY_LIST} onClick={() => props.cancelSearchText()}>
                        <img src={`${imgPath}/back_arrowAsset-2.svg`} loading="lazy" width="17" height="17" alt="" className="image-118" />
                    </Link>
                    <LanguageDropdown />
                </div>
                {/* Item list */}
                <div className="mobile_view">
                    <div className="w-layout-grid grid itemList">
                        {handleItemListRendering()}
                    </div>
                </div>
                <FooterMenuContainer search={true}
                    searchInputValue={searchCode}
                    handleSearch={handleSearch} />
            </div>
        </div>
    )
}

export default ItemListView;