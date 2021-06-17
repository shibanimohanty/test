import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '../../Constants/Routes';
import FooterMenuContainer from '../../Containers/FooterMenuContainer';
import LanguageDropdown from '../SharedComponent/LanguageDropdown';
import { validateActiveDay, validateActiveTime } from '../../Helpers/Util';

const CategoryDashboard = (props) => {
    const [categoryList, setCategoryList] = useState([]);
    const [displayCategoryList, setDisplayCategoryList] = useState([]);
    const [searchCode, setSearchCode] = useState('');

    const handleCategoryListDisplay = () => {
        return displayCategoryList.map(category => {
            if(category && (!category.products || category.products.length === 0 || category.hide == 'true')) {
                return null;
            }

            // weekdays
            if(category.activeTime && category.activeTime.weekdays && !validateActiveDay(category.activeTime.weekdays)) {
                return null;
            }

            // timeBegin, timeEnd
            if(category.activeTime && !validateActiveTime(category.activeTime.timeBegin, category.activeTime.timeEnd)) {
                return null;
            }

            return <Link key={category.categoryId} className="todaysspecial link-6" onClick={() => props.getItemList(category.categoryId)} to={ROUTES_PATH.ITEM_LIST}>
                {category.categoryName}
            </Link>
        })
    }

    const handleSearch = (search, selectedFilter) => {
        search = search || '';
        search = search.toLowerCase();
        let tempCategoryList = [...categoryList];
        let tempResult = [];
        if (search || selectedFilter.length > 0) {
            let valid = false;
            tempCategoryList.map(category => {
                valid = false;
                if (category.products && category.products.length > 0) {
                    for (let i = 0; i < category.products.length; i++) {
                        if (category.products[i].name.toString().toLowerCase().includes(search)) {
                            console.log("coming here", category.products[i])
                            let tempValid = selectedFilter.length > 0 ? false : true;;
                            selectedFilter.map(filter => {
                                if (tempValid) {
                                    return;
                                }else{
                                    tempValid = category.products[i].icons.map(icon => icon.id).includes(filter);
                                }
                            })
                            if (tempValid) {
                                valid = true;
                                break;
                            }
                        }
                    }
                }
                if (valid) tempResult.push(category);
                return category;
            })
        } else if (search === '') {
            tempResult = [...categoryList]
        }

        setSearchCode(search);
        setDisplayCategoryList([...tempResult]);
    }

    useEffect(() => {
        if(props.searchIcon && props.searchIcon.length > 0 && !props.globalSearch && categoryList.length > 0){
            handleSearch('', props.searchIcon);
        }
    }, [categoryList])

    useEffect(() => {
        let categoryList = props.categoryList ? [...props.categoryList] : []
        setCategoryList(categoryList);
        setDisplayCategoryList(categoryList);
    }, [props.categoryList])

    useEffect(() => {
        props.getAllCategoryList();
    },[])

    console.log("props. in categor", props)
    return (
        <><div>
                <div className="mobile_mainview">
                    <div className="mobile_mainpic">
                        <div className="text-block-293">Molly`s Diner</div>
                        {/* <div className="text-block-310-copy">EN</div> */}
                        <LanguageDropdown />
                    </div>
                    <div className="div-block-3">
                        {/* <div className="div-block-31"></div> */}
                        {handleCategoryListDisplay()}
                    </div>
                    <FooterMenuContainer
                        search={true}
                        searchInputValue={searchCode}
                        handleSearch={handleSearch}
                    />
                </div>
        </div>
        </>
    )
}

export default CategoryDashboard;