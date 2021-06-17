import { useEffect } from "react";

const OutSideCloseHelper = (modalRef, callBack) => {
    useEffect(() => {
        /*Alert if clicked on outside of element*/
        const handleClickOutside = (event) => {

            if (modalRef && modalRef.current && !modalRef.current.contains(event.target)) {
                callBack();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, callBack]);
}

export default OutSideCloseHelper;