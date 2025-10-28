import { MdLocationPin } from "react-icons/md";
import {HiCalendar, HiSearch} from "react-icons/hi";

function Header() {
    return(
        <div className="header">
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationPin className="headerIcon locationIcon" />
                    <input type="text" placeholder="Where to go?" className="headerSearchInput" name="destination" id="destination" />
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className="headerIcon dateIcon"/>
                    <div className="dateDropDown">2023/06/23</div>
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropdown">
                        1 adult &bull; 2 children &bull; 1 room
                    </div>
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn">
                        <HiSearch className="headerIcon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;
