import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from '../../Constants/Config';
import { useHistory, useLocation } from "react-router-dom";
import { ROUTES_PATH } from '../../Constants/Routes';
import { Validation } from 'src/Constants/constants';

const CheckIn = (props) => {
    console.log("Checkin", props);
    const imgPath = APP_CONFIG.IMAGE_PATH;
    let history = useHistory();
    const [checkInForm, setCheckInForm] = useState({
        name: '',
        phone: '',
        address: ''
    })
    const search = useLocation().search;
    useEffect(() => {
        const tableName = new URLSearchParams(search).get('tableName'),
        userId = new URLSearchParams(search).get('userId');
        console.log("props", tableName, userId, props)
        if(tableName && userId){
            props.getUserDetails({
                tableName,
                userId
              })
        }else if(props.tableName && props.userId){
            history.push(ROUTES_PATH.CATEGORY_LIST);
        }
        
      },[])
 
    const handleInputChange = (e, type) => {
        let tempCheckInForm = { ...checkInForm };
        let value = e.target.value;
        tempCheckInForm = {
            ...checkInForm,
            [type]: value,
            [`${type}Error`]: ''
        }
        if (!value && type != 'address') {
            tempCheckInForm[`${type}Error`] = `${type.charAt(0).toUpperCase() + type.slice(1)} is required`;
        }
        setCheckInForm({ ...tempCheckInForm });
    }

    const handleSubmit = () => {
        let tempCheckInForm = { ...checkInForm };
        let valid = true;
        if (checkInForm.name == '') {
            tempCheckInForm.nameError = 'Name is required';
            valid = false;
        } if (checkInForm.phone == '') {
            tempCheckInForm.phoneError = 'Phone is required';
            valid = false;
        }

        if (!valid) {
            setCheckInForm({ ...tempCheckInForm });
        } else {
            props.userCheckin({
                name: checkInForm.name,
                phone: checkInForm.phone,
                address: checkInForm.address
            }).then(success => {
                if(success == Validation.success){
                    history.push(ROUTES_PATH.CATEGORY_LIST)
                }else{

                }
            })
        }
    }

    return (
        <div >
            <div className="mobile_mainview">
                <div className="cookie_popup" style={{display: 'flex'}}>
                    <div className="welvometxt">Zum Goldenen Ritter</div>
                    <div className="text-block-316">Please check in and agree to our cookie-policy first.</div>
                    <div className="form-block-4 w-form">
                        <form id="email-form-2" name="email-form-2" data-name="Email Form 2">
                            <input type="text" className="text-field-3 w-input" onChange={(e) => handleInputChange(e, 'name')} maxLength="256" name="name" data-name="Name" placeholder="Name" id="name" />
                            {checkInForm.nameError && <p className='errorMessage'>{checkInForm.nameError}</p>}
                            <input type="text" className="text-field-3 w-input" onChange={(e) => handleInputChange(e, 'phone')} maxLength="256" name="name-2" data-name="Name 2" placeholder="Phone" id="name-2" />
                            {checkInForm.phoneError && <p className='errorMessage'>{checkInForm.phoneError}</p>}
                            <input type="text" className="text-field-3 w-input" onChange={(e) => handleInputChange(e, 'address')} maxLength="256" name="name-2" data-name="Name 2" placeholder="Address" id="name-2" />
                            {checkInForm.addressError && <p className='errorMessage'>{checkInForm.addressError}</p>}
                        </form>
                        <div className="w-form-done">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail">
                            <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                    </div>
                    <div className="policytxt">By clicking on &quot;check-in&quot; you agree to our cookie-policy, GDPR and
                        End-to-End-Conditions provided by service vendor.</div>
                    <button data-w-id="b80d95ca-35b5-7b6f-7b63-1bb323196a5a" className="div-block-47" onClick={handleSubmit}>
                        <span className="text-block-317" >check-in</span>
                        <img src={`${imgPath}/check_redAsset-2.svg`} loading="lazy" width="22" height="22" alt="" className="image-120" />
                    </button>
                    <NavLink className="booktoggle w-inline-block" to={ROUTES_PATH.BOOK}>
                        <div className="text-block-317">book</div>
                        <img src={`${imgPath}/plusAsset-1.svg`} loading="lazy" width="22" height="22" alt="" className="image-120" />
                    </NavLink>
                    <div className="policytxt">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                      dolor sit amet.</div>
                    <div className="policytxt">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet.</div>
                    <div className="policytxt">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accus</div>
                </div>
            </div>

        </div>
    )
}


export default CheckIn;