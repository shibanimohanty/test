import React, { useState } from 'react';
import { APP_CONFIG } from '../../Constants/Config';
import { ROUTES_PATH } from '../../Constants/Routes';
import LanguageDropdown from '../SharedComponent/LanguageDropdown';
import Moment from 'moment';
import Pluralize from 'react-pluralize'
import Carousel, { consts } from 'react-elastic-carousel';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import enGb from 'date-fns/locale/en-GB';
import { generateTimeSeries } from '../../Helpers/Util';
/* import de from "date-fns/locale/es";

registerLocale("de", { ...de, options: { ...de.options, weekStartsOn: 1 } }); */
// registerLocale("de", { ...de, options: { ...de.options, weekStartsOn: 1 } });
registerLocale('en-gb', enGb);

const Booking = (props) => {

    const imgPath = APP_CONFIG.IMAGE_PATH;
    let carousel = null;
    const TIME_SERIES = generateTimeSeries(8);

    const [submitted, setSubmit] = useState(false);
    const [hasError, setError] = useState(false);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [bookingTime, setBookingTime] = useState('08:00');
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: '',
        people: 1,
        time: bookingTime,
        date: bookingDate,
        policyAccepted: ''
    });

    const handleInputChange = (e, type) => {
        let tempForm = { ...bookingForm };
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        tempForm = {
            ...bookingForm,
            [type]: value,
            [`${type}Error`]: ''
        }

        tempForm[type] = value;
        setBookingForm(tempForm);
    }

    const handleSubmit = (e) => {
        console.log("::onSubmitBooking::");
        e.preventDefault();

        let tempForm = { ...bookingForm };
        let valid = true;
        if (bookingForm.name == '') {
            tempForm.nameError = 'Name is required';
            valid = false;
        } if (bookingForm.phone == '') {
            tempForm.phoneError = 'Phone is required';
            valid = false;
        }
        if (bookingForm.email == '') {
            tempForm.emailError = 'Email is required';
            valid = false;
        }

        if (!valid) {
            setBookingForm({ ...tempForm });
            return;
        }

        setSubmit(true);
        if (bookingForm && bookingForm.policyAccepted) {
            setError(false);
            console.log({ ...bookingForm });
        } else {
            setError(true);
        }

    }

    const onDateChange = (date) => {
        setBookingDate(date);
        let tempForm = { ...bookingForm };
        tempForm['date'] = date;
        setBookingForm(tempForm);
    }

    const DateSelection = () => {
        return (
            <DatePicker
                calendarClassName="appDatePicker"
                selected={bookingDate}
                onChange={date => onDateChange(date)}
                locale="en-gb"
                inline
            />
        );
    };

    const onSelectBookingTime = (time) => {
        let tempForm = { ...bookingForm };
        tempForm['time'] = time;
        setBookingForm(tempForm);
        setBookingTime(time);
    }

    const BookingPreview = () => {
        return (
            <React.Fragment>
                <div className="text-block-342">{bookingForm.name} {Moment(bookingForm.date).format('DD.MM.YYYY')}  - {bookingForm.time} - <Pluralize singular={'Person'} count={bookingForm.people} />
                </div>
            </React.Fragment>
        )
    }

    const BookingTimeslots = () => {
        return (
            <React.Fragment>
                <div className="booktime">
                    <div className="w-layout-grid booktimegrid">
                        {TIME_SERIES && TIME_SERIES.map((time, index) => {
                            return (
                                <div key={index} onClick={() => onSelectBookingTime(time)} className={time === bookingTime ? "choosentime " : "text-block-228"}>{time}</div>
                            )
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }



    const getError = () => {
        let styles = {};
        if (submitted) {
            styles = { display: 'block' }
        } else {
            styles = { display: 'none' }
        }
        return styles;
    }

    const getSuccess = () => {
        let styles = {};
        if (submitted) {
            styles = { display: 'block' }
        } else {
            styles = { display: 'none' }
        }
        return styles;
    }


    const addRemovePeopleCount = (currentItem, pageIndex) => {
        if (currentItem && currentItem.item && currentItem.item.count) {
            let tempForm = { ...bookingForm };
            tempForm['people'] = parseInt(currentItem.item.count);
            setBookingForm(tempForm);
        }

    }


    return (
        <React.Fragment>
            <div className="book_body">
                <div className="mobile_book">
                    <LanguageDropdown />
                    <div className="div-block-736">
                        <div className="text-block-324">Zum Goldenen Ritter</div>
                        <div className="text-block-325">Ferdinandstr. 77<br />75173 Pforzheim<br />Tel.: 0176 700 169 99</div>
                    </div>
                    <div className="div-block-51">
                        <div className="text-block-326">When would you like to visit?</div>
                        <div className="">
                            {DateSelection()}
                        </div>
                        <div className="text-block-326">Time</div>
                        {BookingTimeslots()}


                        <div className="text-block-326">Guests</div>
                        <div className="person_book">
                            <div className="form-block-3 w-form">
                                <form id="email-form" name="email-form" data-name="Email Form"
                                    onSubmit={(event) => handleSubmit(event)} noValidate className="form-3">
                                    <input type="text" className="text-field-2 w-input" maxLength="256" name="name"
                                        onChange={e => handleInputChange(e, 'name')} value={bookingForm.name} data-name="Name" placeholder="Name" id="name" />
                                        {bookingForm.nameError && <p className='errorMessage'>{bookingForm.nameError}</p>}
                                    <input type="text" className="text-field-2 w-input" maxLength="256" name="name-2"
                                        onChange={e => handleInputChange(e, 'email')} value={bookingForm.email} data-name="Name 2" placeholder="eMail" id="name-2" />
                                        {bookingForm.emailError && <p className='errorMessage'>{bookingForm.emailError}</p>}
                                    <input type="text" className="text-field-2 w-input" maxLength="256" name="name-2"
                                        onChange={e => handleInputChange(e, 'phone')} value={bookingForm.phone} data-name="Name 2" placeholder="Phone" id="name-2" />
                                        {bookingForm.phoneError && <p className='errorMessage'>{bookingForm.phoneError}</p>}
                                    {/*  <div className="div-block-739">
                                        <img src={`${imgPath}/minusAsset-2.svg`} loading="lazy" width="22" height="22" />
                                        <input type="text" className="text-field-2-copy w-input" maxLength="256" name="name-2"
                                             data-name="Name 2" placeholder="just me" id="name-2" />
                                        <img src={`${imgPath}/plusAsset-1.svg`} loading="lazy" width="22" height="22" />
                                    </div> */}
                                    <div className="slider-2 w-slider">
                                        <div className="w-slider-mask">
                                            <Carousel ref={ref => (carousel = ref)} itemsToShow={1} showArrows={false} pagination={false}
                                                onChange={(currentItem, pageIndex) => addRemovePeopleCount(currentItem, pageIndex)
                                                }>
                                                <div count="1" className="w-slide" >
                                                    <div className="text-block-335">just me</div>
                                                </div>
                                                <div count="2" className="w-slide">
                                                    <div className="text-block-335">me + 1</div>
                                                </div>
                                                <div count="3" className="w-slide">
                                                    <div className="text-block-335">3 Persons</div>
                                                </div>
                                                <div count="4" className="w-slide">
                                                    <div className="text-block-335">4 Guests</div>
                                                </div>
                                                <div count="5" className="w-slide">
                                                    <div className="text-block-335">Group of 5</div>
                                                </div>
                                            </Carousel>
                                        </div>
                                        <div className="left-arrow-2 w-slider-arrow-left" onClick={() => carousel.slidePrev()}>
                                            <img src={`${imgPath}/minusAsset-2.svg`} loading="lazy" width="22" height="22" className="image-124" />
                                        </div>
                                        <div className="right-arrow-2 w-slider-arrow-right" onClick={() => carousel.slideNext()}>
                                            <img src={`${imgPath}/plusAsset-1.svg`} loading="lazy" width="22" height="22" />
                                        </div>
                                    </div>
                                    <label className="w-checkbox checkbox-field">
                                        <div className={"w-checkbox-input w-checkbox-input--inputType-custom checkbox " + (bookingForm.policyAccepted ? 'w--redirected-checked' : null)}></div>
                                        <input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" style={{ opacity: 0, position: 'absolute', zIndex: '-1' }}
                                            onChange={e => handleInputChange(e, 'policyAccepted')} value={bookingForm.policyAccepted} checked={bookingForm.isInverted} />
                                        <span className="checkbox-label w-form-label">Policy &amp; GDPR</span>
                                    </label>

                                    {BookingPreview()}

                                    <input type="submit" value="Submit" data-wait="Please wait..." className="submit-button-2 w-button" />
                                </form>
                                {submitted && !hasError && <div style={getSuccess()} className="success-message w-form-done">
                                    <div>Thank you! Your submission has been received! Please check your eMail.</div>
                                </div>}
                                {submitted && hasError && <div style={getError()} className="error-message w-form-fail">
                                    {/* <div>Oops! Something went wrong while submitting the form.</div> */}
                                    <div>You need to accept the policy.</div>
                                </div>}
                            </div>
                        </div>
                        <div className="div-block-735"></div>
                        <div className="text-block-327">Praesent vitae lectus eget elit hendrerit ultricies. Nullam<br /><br /> dapibus vulputate nulla, nec efficitur
                        metus dictum ac. Aliquam aliquam ligula felis, vel facilisis est suscipit vel. Vivamus eu hendrerit nisl. Suspendisse sagittis sit amet tellus iaculis euismod.
                        Nam cursus, velit a condimentum sodales, augue est ultrices justo, nec faucibus velit nisl sed elit. Ut a elit laoreet,
                        dapibus purus quis, auctor ex. Phasellus egestas mattis maximus.</div>
                        <div className="div-block-737"></div>
                    </div>
                    <div className="div-block-736-copy"><img src={`${imgPath}/gastro.png`} loading="lazy" height="33" /></div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Booking;