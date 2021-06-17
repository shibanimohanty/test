import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { APP_CONFIG } from '../../Constants/Config';
import { ROUTES_PATH } from '../../Constants/Routes';
import OutSideCloseHelper from '../SharedComponent/OutSideCloseHelper';
import { Link } from 'react-router-dom';
import './searchComponent.css';
import { TAG_ICONS } from 'src/Constants/data';

const SearchComponent = (props) => {
    const location = useLocation();
    const modalRef = useRef(null);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [searchCode, setSearchCode] = useState('');
    const imgPath = APP_CONFIG.IMAGE_PATH;
    const [showSearchFilter, setShowSearchFilter] = useState(false);

    const iconItems = TAG_ICONS;
    const [iconList, setIconList] = useState(iconItems);

    const handleIconFilterSelection = (value) => {
        let tempSelectedFilter = [...selectedFilter];
        if (tempSelectedFilter.includes(value)) {
            if (tempSelectedFilter.length == 1) {
                tempSelectedFilter = [];
            } else {
                let index = tempSelectedFilter.indexOf(value);
                tempSelectedFilter.splice(index, 1);
            }
        } else {
            tempSelectedFilter.push(value);
        }
        setSelectedFilter([...tempSelectedFilter]);
        if (props.globalSearch) {
            props.updateSearch(searchCode, tempSelectedFilter);

        } else {
            props.handleSearch(searchCode, tempSelectedFilter);
            props.updateSearchIcons(tempSelectedFilter);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        props.updateSearch(searchCode, selectedFilter);
    }

    const handleReset = (e) => {
        // e.preventDefault();
        if (props.globalSearch) {
            props.cancelSearchText(true);
        } else {
            setSearchCode('');
            setSelectedFilter([]);
            props.handleSearch('', []);
        }


    }

    const handleSearchCodeChange = (e) => {
        setSearchCode(e.target.value)
    }

    // useEffect(() => {
    //     console.log("coming in useEffect", props.searchIcons && props.searchIcons.length > 0 && !props.globalSearch)
    //     if(props.searchIcons && props.searchIcons.length > 0 && !props.globalSearch){
    //         props.handleSearch('', props.searchIcons);
    //         }
    // }, [props.searchIcons])

    useEffect(() => {
        setSearchCode(props.searchInputValue);
        let tempIcons = props.searchIcons && props.searchIcons.length > 0 ? props.searchIcons : []
        setSelectedFilter([...tempIcons]);
    }, [props.searchInputValue, props.searchIcons])

    OutSideCloseHelper(modalRef, () => setShowSearchFilter(false));
    if (props.globalSearch && !location.pathname.includes(ROUTES_PATH.ITEM_LIST)) {
        return <Redirect to={ROUTES_PATH.ITEM_LIST} />
    }
    return (

        <div data-hover="" data-delay="0" className="dropdown w-dropdown" ref={modalRef}>
            <div className={"dropdown-toggle w-dropdown-toggle " + (showSearchFilter ? 'w--open' : '')} onClick={() => setShowSearchFilter(!showSearchFilter)}>
                {/* <img src={`${imgPath}/search_dAsset-3.svg`} loading="lazy" width="17" height="17" alt="" className="image-119" /> */}
                <div className="text-block-295">Search &amp; Filter</div>
            </div>
            {showSearchFilter ?
                <nav className="dropdown-list">
                    <div className="w-layout-grid grid-4 layoutGrid">

                        {iconList && iconList.map((icon, index) => {
                            return (
                                <React.Fragment key={index}>
                                   {/*  <div className={`div-block-32 ${selectedFilter.includes("pork") ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('pork')}>
                                        <img src={`${imgPath}/pig_dAsset-1.svg`} loading="lazy" width="22" height="22" alt="" />
                                        <div className="text-block-297" >Pork</div>
                                    </div> */}
                                    <div className={`div-block-32 ${selectedFilter.includes(icon.name) ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection(icon.name)}>
                                        <img src={imgPath +'/'+ icon.image} loading="lazy" width="33" height="33" />
                                        <div className="text-block-297">{icon.name}</div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        {/* <div className={`div-block-32 ${selectedFilter.includes("pork") ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('pork')}>
                            <img src={`${imgPath}/pig_dAsset-1.svg`} loading="lazy" width="22" height="22" alt="" />
                            <div className="text-block-297" >Pork</div>
                        </div>
                        <div className={`div-block-32 ${selectedFilter.includes("vegan") ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('vegan')}>
                            <img src={`${imgPath}/leaf_dAsset-7.svg`} loading="lazy" width="22" height="22" alt="" />
                            <div className=" text-block-297" >Vegan</div>
                        </div>
                        <div className={`div-block-32 ${selectedFilter.includes("vegetarian") ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('vegetarian')}>
                            <img src={`${imgPath}/saladAsset-1.svg`} loading="lazy" width="22" height="22" alt="" />
                            <div className="text-block-297">Vegetarian</div>
                        </div>
                        <div className={`div-block-32 ${selectedFilter.includes("homemade") ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('homemade')}>
                            <img src={`${imgPath}/home_s_dAsset-6.svg`} loading="lazy" width="22" height="22" alt="" />
                            <div className="text-block-297">Homemade</div>
                        </div>
                        <div className={`div-block-32 ${selectedFilter.includes('alcohol') ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('alcohol')}>
                            <img src={`${imgPath}/alcoholAsset-1.svg`} loading="lazy" width="22" height="22" alt="" />
                            <div className="text-block-297">Alcohol</div>
                        </div>
                        */}
                        {/* <div className={`div-block-32 ${selectedFilter.includes("lactofree") ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('lactofree')}>
                            <img src={`${imgPath}/lactoAsset-1.svg`} loading="lazy" width="22" height="22" alt="" />
                            <div className="text-block-297">LactoFree</div>
                        </div> */}
                        {/* <div className={`div-block-32 ${selectedFilter.includes("fish") ? 'selectedFilter' : ''}`} onClick={() => handleIconFilterSelection('fish')}>
                            <img src={`${imgPath}/fishAsset-1.svg`} loading="lazy" width="22" height="22" alt="" />
                            <div className="text-block-297">Fish</div>
                        </div> */}
                    </div>
                    <div className="form-block w-form">
                        <form id="email-form" name="email-form" data-name="Email Form" className="form">
                            <Link className="submit-button resetfilter w-button" onClick={e => handleReset(e)} to={ROUTES_PATH.CATEGORY_LIST}>
                                reset
                        </Link>
                            {/* <input type="submit" value="reset" onClick={e => handleReset(e)} data-wait="Please wait..." class="submit-button resetfilter w-button"/> */}
                            <input type="text" value={searchCode} onChange={e => handleSearchCodeChange(e)} className="text-field w-input" maxLength="256"
                                name="email-2" data-name="Email 2" placeholder="search" id="email-2" />
                            <input type="submit" value="apply" onClick={(e) => handleSearch(e)} data-wait="Please wait..." className="submit-button w-button" />
                        </form>
                        <div className="w-form-done">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail">
                            <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                    </div>
                </nav> : ''}
        </div>
    )
}

export default SearchComponent;