import {useEffect} from "react";

function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    },[ref, callback])
}

export default useOutsideClick;

