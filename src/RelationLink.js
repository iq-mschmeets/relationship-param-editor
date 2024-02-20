import React from "react";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class RelationLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cname = "list-group-item";
        if (this.props.active) {
            cname += " active";
        }
        let style = {
            display: "flex",
            "justify-content": "space-between",
        };
        let href = `../request/class?cid=${this.props.classID}`;
        return (
            <li
                className={cname}
                style={style}
                data-relation-id={this.props.relationID}
                onClick={this.props.update}
            >
                {this.props.name}
                <a href={href} title="Details">
                <span className="material-icons">
                    open_in_new
                </span>
                </a>
            </li>
        );
    }
}

export default RelationLink;
