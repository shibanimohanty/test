import React, { useRef, useState } from 'react';
import OutSideCloseHelper from './OutSideCloseHelper';

const LanguageDropdown = () => {
    const modalRef = useRef(null);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    OutSideCloseHelper(modalRef, () => setDisplayDropdown(false));
    return (
        <div className="dropdown-3 w-dropdown " ref={modalRef} style={{ "zIndex": 901 }}>
            <div className="dropdown-toggle-3 w-dropdown-toggle w--open">
                <div className="text-block-318" onClick={() => setDisplayDropdown(!displayDropdown)}>En</div>
            </div>
            {displayDropdown ? <nav className="dropdown-list-3 w-dropdown-list w--open languageDropdown">
                <div className="text-block-319">Deutsch</div>
            </nav> : null}
        </div>
    )
}

export default LanguageDropdown;