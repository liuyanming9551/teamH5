import React from "react";
import "./index.less";
class SearchSport extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isToggleOn: true,
            dispaly: 'none',
            defaultWidth: false
        }
    }
    handleClick() {

    }

    render() {
        return (
            <div>
                筛选页面
            </div>
        )
    }
}
export default SearchSport;