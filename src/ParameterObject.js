export const RELATIONSHIP_PARAMETER_TYPE = 157;

export const RELATION_PARAMETER_LIST = [
    "RELATIONSHIP_ADDITIONAL_LINKS",
    "RELATIONSHIP_DESCRIPTION",
    "RELATIONSHIP_DISPLAY_EXPANDED",
    "RELATIONSHIP_DISPLAY_SELECTOR",
    // "RELATIONSHIP_EDIT_LAYOUT",
    "RELATIONSHIP_EDIT_LINK_ON_CREATE",
    // "RELATIONSHIP_HELP_RESOURCE",
    "RELATIONSHIP_LABEL",
    // "RELATIONSHIP_LINK_BUTTON_LABEL",
    "RELATIONSHIP_QUERY_ID",
    "RELATIONSHIP_QUERY_LOOKUP",
    "RELATIONSHIP_QUERY_RENDERER",
    "RELATIONSHIP_QUERY_XFORM",
    "RELATIONSHIP_SOURCE_FILTERS",
    // "RELATIONSHIP_SOURCE_STAMP",
    "RELATIONSHIP_TARGET_STAMP",
    // "RELATIONSHIP_TARGET_LABEL",
    // "RELATIONSHIP_UNLINK_BUTTON_LABEL",
    "RELATIONSHIP_TARGET_CLASS",
    "RELATIONSHIP_TARGET_ATTRIBUTE_COLUMN",
];

export function isNotNull(value) {
    return !(value == null ? true : typeof value === "undefined");
}

export function defaultValue(candidate, defaultVal) {
    return isNotNull(candidate) ? candidate : defaultVal;
}
export function defaultProperty(obj, key, defaultValue) {
    if (isNotNull(obj)) {
        return obj[key];
    }
    return defaultValue;
}

function getDefaultValue(key) {
    let rval = null;
    switch (key) {
        case "RELATIONSHIP_DISPLAY_EXPANDED": {
            rval = false;
            break;
        }
        case "RELATIONSHIP_QUERY_RENDERER": {
            rval = "";
            break;
        }
        default:
            rval = null;
    }
    return rval;
}

export function getNullParameter(relationID, parameter) {
    return {
        changed: true,
        init: function () {},
        toJSON: function () {
            return {
                id: relationID,
                parameter: parameter,
                value: "",
                typeID: RELATIONSHIP_PARAMETER_TYPE,
                changed: true,
            };
        },
    };
}

export function defaultParameterSetFactory(relationID) {
    const params = {};
    RELATION_PARAMETER_LIST.forEach((key) => {
        const param = new ParameterObject();
        param.init(relationID, key, getDefaultValue(key));
        params[key] = param;
    });
    return params;
}

const NOT_A_VALID_VALUE = "NOT_A_VALID_VALUE";

export default class ParameterObject {
    constructor(props) {}
    init(id, parameter, value) {
        this._id = id;
        this._parameter = parameter;
        if (typeof value != "undefined" || value != null) {
            this._value = value;
        }
    }
    set id(val) {
        this._id = val;
    }
    get id() {
        return this._id;
    }
    set parameter(val) {
        if (val !== this._parameter) {
            this._parameter = val;
            delete this._value;
        }
    }
    get parameter() {
        return this._parameter;
    }
    set defaultValue(val) {
        this._originalValue = val;
        this._value = val;
    }
    set value(val) {
        if (!this.hasValue()) {
            this._originalValue = val;
            this._value = val;
        } else if (val == null || val == "undefined" || val.length == 0) {
            delete this._value;
            if (!this._originalValue) {
                this._originalValue = NOT_A_VALID_VALUE;
            }
        } else if (this._value != val) {
            this._value = val;
        }
    }
    get value() {
        return this.hasValue() ? this._value : "";
        //return this._value;
    }
    get changed() {
        return this._value != this._originalValue;
    }
    hasValue() {
        return typeof this._value != "undefined";
    }
    toJSON() {
        return {
            id: this._id,
            parameter: this._parameter,
            value: this.value,
            typeID: RELATIONSHIP_PARAMETER_TYPE,
            changed: this.changed,
        };
    }
}
