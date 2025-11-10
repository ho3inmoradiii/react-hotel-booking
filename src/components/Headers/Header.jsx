import { MdLocationPin } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick.js";
import { forwardRef, useRef } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
    const [searchParams] = useSearchParams();
    const childRef = useRef(undefined);
    const calendarRef = useRef(undefined);
    const [destination, setDestination] = useState(searchParams.get('destination') || '');
    const [showDropDown, setShowDropDown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [options, setOptions] = useState({
        Adult: 1,
        Children: 1,
        Room: 1
    });
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const navigate = useNavigate();

    const handleDestinationChange = (e) => {
        setDestination(e.target.value)
    }

    const handleShowDropDown = () => {
        setShowDropDown(!showDropDown);
    }

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    useOutsideClick(childRef, handleShowDropDown);

    useOutsideClick(calendarRef, handleShowCalendar);

    const handleNavigateToHotels = () => {
        const params = {
            ...options,
            destination,
            startDate: format(range[0].startDate, "yyyy-MM-dd"),
            endDate: format(range[0].endDate, "yyyy-MM-dd"),
        }
        navigate({
            pathname: '/hotels',
            search: `?${createSearchParams(params)}`
        })
    }

    const updateOptions = (key, value) => {
        setOptions((prevOption) => ({
            ...prevOption,
            [key]: value,
        }));
    };

    return(
        <div className="header">
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationPin className="headerIcon locationIcon" />
                    <input type="text"
                           placeholder="Where to go?"
                           className="headerSearchInput"
                           name="destination"
                           id="destination"
                           onChange={handleDestinationChange}
                           value={destination}
                    />
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className="headerIcon dateIcon"/>
                    <div className="dateDropDown" onClick={handleShowCalendar}>
                        {format(range[0].startDate, "yyyy-MM-dd")} to {format(range[0].endDate, "yyyy-MM-dd")}
                    </div>
                    {showCalendar && <div ref={calendarRef} className="date">
                        <DateRange
                            minDate={new Date()}
                            editableDateInputs={true}
                            onChange={(item) => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                        />
                    </div>}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropdown" onClick={handleShowDropDown}>
                        {Object.entries(options).map(([key, value], index) => (
                            <span key={key}>
                                <strong>{key}</strong>: {value}
                                {index < Object.keys(options).length - 1 && <span> &bull; </span>}
                            </span>
                        ))}
                    </div>
                    {showDropDown && <GuestOptions options={options} onUpdateOptions={updateOptions} ref={childRef} />}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn" onClick={handleNavigateToHotels}>
                        <HiSearch className="headerIcon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;

// eslint-disable-next-line react/display-name
const GuestOptions = forwardRef(({ options, onUpdateOptions }, ref) => {
    return (
        <div className="guestOptions" ref={ref}>
            {Object.entries(options).map(([key, value]) => (
                <GuestOptionItem key={key} optionName={key} optionValue={value} onUpdateOptions={onUpdateOptions}/>))}
        </div>
)
    ;
});


function GuestOptionItem({optionName, optionValue, onUpdateOptions}) {
    return (
        <div className="guestOptionItem">
            <span className="optionText">{ optionName }</span>
            <div className="optionCounter">
                <button className="optionCounterBtn" disabled={optionValue < 1}>
                    <HiMinus className="icon" onClick={() => onUpdateOptions(optionName, optionValue - 1)}/>
                </button>
                <span className="optionCounterNumber">{optionValue}</span>
                <button className="optionCounterBtn">
                    <HiPlus className="icon" onClick={() => onUpdateOptions(optionName, optionValue + 1)}/>
                </button>
            </div>
        </div>
    )
}
