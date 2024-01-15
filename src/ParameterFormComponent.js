import React from "react";

import ReadOnlyInputFormGroup from "./common/ReadOnlyInputFormGroup.js";
import ReadWriteInputFormGroup from "./common/ReadWriteInputFormGroup.js";
import FilterSelectionInput from "./FilterSearchComponents/FilterSelectionInput.js";
import XformSelectionInput from "./XformSearchComponents/XformSelectionInput.js";
import SelectInputGroup from "./common/SelectInputGroup.js";
import StampPropertyEditor from "./StampPropertyEditor.js";
import OkCancelButtonGroup from "./common/OkCancelButtonGroup.js";
import {
    ParameterObject,
    defaultParameterSetFactory,
    getNullParameter,
    defaultProperty,
    isNotNull,
} from "./ParameterObject.js";

const CONTROLLER_OPTIONS = [
    { text: "None", value: "None" },
    { text: "One To Many", value: "One To Many" },
    { text: "Many To Many", value: "Many To Many" },
    { text: "One To One", value: "One To One" },
    { text: "", value: "" },
];

const DISPLAY_OPTIONS = [
    { text: "Not initially expanded", value: false },
    { text: "Always expanded", value: true },
];

const RENDER_OPTIONS = [
    { text: "Default", value: "" },
    { text: "Stamp", value: "stamp" },
    { text: "Matrix", value: "MATRIX" },
    { text: "XSLT (legacy only)", value: "xslt" },
];

const EDIT_LINK_OPTIONS = [
    { text: "False", value: "false" },
    { text: "True", value: "true" },
];

const READ_WRITE_PARAMS = {
    RELATIONSHIP_HELP_RESOURCE: {
        label: "Help resource",
        help: "User markup name lookup for user help, or explanation (optional)",
    },
    RELATIONSHIP_LINK_BUTTON_LABEL: {
        label: "Label for 'Link' button",
        help: 'Customize the label of the "Link" button (optional)',
    },
    RELATIONSHIP_UNLINK_BUTTON_LABEL: {
        label: "Label for the 'Un-Link' button",
        help: "Customize the lable of the 'Un-Link' button (optional)",
    },
    RELATIONSHIP_SOURCE_FILTERS: {
        label: "Source Filter List",
        help: "You may add multiple filters for the user's selection (optional). Enter as a JSON array.",
    },
    RELATIONSHIP_TARGET: {
        label: "Target",
        help: "The target class attrubte for this relationship (optional)",
    },
    // 'RELATIONSHIP_DISPLAY_SELECTOR':{'label' : "Selector", help: 'To place this relationship in a specific place in the page, enter an HTML selector.'},
};

function oneHopRelationRelations(relMeta) {
    console.log("ENTERING: oneHopRelationRelations %o", relMeta);
    if (isNotNull(relMeta) && isNotNull(relMeta.oneHopRelation)) {
        return relMeta.oneHopRelation.reduce(function(acc, oneHop, indx) {
            if (
                oneHop.fkClassID == relMeta.fkClassID //&&
                //     oneHop.relationID != relMeta.relationID &&
                // oneHop.pkClassID != relMeta.pkClassID /*&&
                //     oneHop.fkClassID != oneHop.pkClassID*/
            ) {
                acc.push(oneHop);
            }
            if (relMeta.oneHopRelation.length > 2) {
                // console.log(
                //     "oFK: %s, rFK: %s, oPK: %s, rPK: %s, oRI: %s, rRI: %s",
                //     oneHop.fkClassID,
                //    relMeta.fkClassID,
                //     oneHop.pkClassID,
                //     relMeta.pkClassID,
                //     oneHop.relationID,
                //     relMeta.relationID
                // );
                console.log("oneHopRelationRelations acc: %o",acc);
            }

            return acc;
        }, []);
    }
    return [];
}

function getRelationshipTarget(relationModel, parameter) {
    console.log("getRelationshipTarget %o", relationModel.oneHopRelation);
    const oneHops = oneHopRelationRelations(relationModel);

    let opts = oneHops.map((oh) => {
        return {
            id: oh.pkClassID,
            text: `${oh.pkClassName}.${oh.fkAttributeName}`,
            value: oh.pkClassID,
            attributeName: oh.fkAttributeName,
            attributeId: oh.fkAttrId,
            fkColumn: oh.fkColumn
        };
    });
    return opts;
}

/**
 A form component to display and update Relationship parameters
 The initial props object is the Relationship definition from the class
 meta data. This component only manages the Parameters   for the Relationship
 as that object is immutable.
 */
class ParameterFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.initModel(props.model),
        };
        this.oncancel = this.oncancel.bind(this);
        this.onok = this.onok.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.onResetFilterOptions = this.onResetFilterOptions.bind(this);
        console.log("ParameterFormComponent.CTOR: state: %o", this.state);
    }

    initModel(relationModel) {
        console.log("ParameterFormComponent.initModel: %o", relationModel);
        if (relationModel) {
            const params = defaultParameterSetFactory(relationModel.relationID);
            console.log("ParmeterFormComponent.initModel2 %o", params);

            Object.keys(relationModel.displayParams).forEach((key) => {
                const param = params[key];
                console.log("initModel: key: %s, %o", key, param);
                if (param) {
                    param.defaultValue = relationModel.displayParams[key];
                }
                if (key === "RELATIONSHIP_TARGET_CLASS") {
                    // value & options for Parameter.
                    param.options = getRelationshipTarget(relationModel, param);
                }
            });
            return {
                relationID: relationModel.relationID,
                name: relationModel.name,
                parameters: params,
                oneHopRelation: relationModel.oneHopRelation,
                fkClassID: relationModel.fkClassID,
                pkClassID: relationModel.pkClassID,
                pkClassName: relationModel.pkClassName,
            };
        }
        return {};
    }

    componentWillReceiveProps(newProps) {
        console.log(
            "ParameterFormComponent.componentWillRecieveProps: ",
            newProps
        );
        this.setState({ model: this.initModel(newProps.model) });
    }

    onok() {
        console.log("ParameterFormComponent.onOK: %o", this.state);
        if (this.props.onSave) {
            this.props.onSave(this.state.model.parameters);
        }
    }

    isValued(arg) {
        return typeof arg != "undefined";
    }

    /** @argument obj  ParameterObject */
    onChange(obj) {
        // obj is { parameter: '', value:''}, in this case, it will be a parameter
        // name and value.
        const newState = Object.assign({}, this.state);
        // Prefer the query lookup. If the id value is not an integer, switch the parameter type.
        // If we set one parameter for query, then "unset" the other one. The server will delete
        // an unvalueed parameter.
        console.log(
            "ParameterFormComponent.onChange: %s, obj: %o, newState: %o",
            obj.parameter,
            obj,
            newState
        );

        if (
            obj.parameter == "RELATIONSHIP_QUERY_ID" &&
            obj.value !== "" &&
            !Number.isInteger(obj.value)
        ) {
            obj.parameter = "RELATIONSHIP_QUERY_LOOKUP";
            newState.model.parameters["RELATIONSHIP_QUERY_ID"] =
                getNullParameter(
                    this.state.relationID,
                    "RELATIONSHIP_QUERY_ID"
                );
        }

        if (obj.parameter == "RELATIONSHIP_QUERY_ID") {
            newState.model.parameters["RELATIONSHIP_QUERY_ID"] =
                getNullParameter(
                    this.state.relationID,
                    "RELATIONSHIP_QUERY_LOOKUP"
                );
        }

        if(obj.parameter == "RELATIONSHIP_TARGET_CLASS"){
            //TODO: need the whole object to also get they
            //TARGET_ATTRIBUTE_COLUMN because now we're
            //going to save that too.
            newState.model.parameters["RELATIONSHIP_TARGET_CLASS"] = obj.value;
            newState.model.parameters["RELATIONSHIP_TARGET_ATTRIBUTE_COLUMN"] = obj.data.fkColumn;
        }

        newState.model.parameters[obj.parameter].value = obj.value;

        console.log(
            "ParameterFormComponent.onChange: arg:%o, newState:%o, prevState:%o, %s",
            obj,
            newState,
            this.state,
            Number.isInteger(obj.value)
        );

        this.setState(newState);
    }
    render() {
        //console.log("ParameterFormComponent.render: %o, %o",this.props.model, this.state.model);
        //TODO: Use RELATIONSHIP_QUERY_LOOKUP too.
        console.log("ParameterFormComponent.render: %o", this.state);
        if (this.props.model) {
            let xslField = null;
            let renderField = null;
            // Don't show an XSLT selector if we're using the defualt query?
            // Is this correct, or should it always be an option?
            // No, only for optional queries, for now.
            if (
                (this.state.model.parameters["RELATIONSHIP_QUERY_ID"].value ||
                    this.state.model.parameters["RELATIONSHIP_QUERY_LOOKUP"]
                        .value) &&
                this.state.model.parameters["RELATIONSHIP_QUERY_RENDERER"]
                    .value == "xslt"
            ) {
                xslField = (
                    <XformSelectionInput
                        value={
                            this.state.model.parameters[
                                "RELATIONSHIP_QUERY_XFORM"
                            ].value || ""
                        }
                        label="XSLT Xform"
                        parameter="RELATIONSHIP_QUERY_XFORM"
                        onChange={this.onChange}
                        help="This controls the (optional) XSLT used to produce the display from the query."
                    />
                );
            } else if (
                this.state.model.parameters["RELATIONSHIP_QUERY_RENDERER"]
                    .value == "stamp"
            ) {
                //TODO: Need to build the Stamp Editor Panel...
                xslField = (
                    <StampPropertyEditor
                        params={this.state.model.parameters}
                        onChange={this.onChange}
                    />
                );
            }
            const relatedTargets = getRelationshipTarget(this.state.model);
            console.log(
                "ParameterFormComponent.render relatedList %o",
                relatedTargets
            );

            return (
                <div>
                    <h4 className="section-head">Properties</h4>

                    <form onSubmit={this.stopIt} className="rel-props">
                        <ReadOnlyInputFormGroup
                            value={this.state.model.relationID}
                            help=""
                            label="RelationID"
                        />
                        <ReadOnlyInputFormGroup
                            value={this.state.model.name}
                            help=""
                            label="Name"
                        />
                        <ReadWriteInputFormGroup
                            value={
                                this.state.model.parameters[
                                    "RELATIONSHIP_LABEL"
                                ].value || ""
                            }
                            label="Label"
                            parameter="RELATIONSHIP_LABEL"
                            onChange={this.onChange}
                            help="This label is used in the EDR display."
                        />
                        <ReadWriteInputFormGroup
                            value={
                                this.state.model.parameters[
                                    "RELATIONSHIP_DESCRIPTION"
                                ].value || ""
                            }
                            label="Description"
                            parameter="RELATIONSHIP_DESCRIPTION"
                            onChange={this.onChange}
                            help="To provide the user with more information about the relationship."
                            rows="5"
                        />
                        <tab-view>
                            <tab-list role="tablist">
                                <tab-button
                                    class="mr1 sub active"
                                    role="tab"
                                    name="Expansion"
                                    aria-selected="true"
                                    tabindex="0"
                                >
                                    Expansion
                                </tab-button>
                                <tab-button
                                    class="mr1 sub"
                                    role="tab"
                                    name="Data"
                                    aria-selected="false"
                                    tabindex="-1"
                                >
                                    Data
                                </tab-button>
                                <tab-button
                                    class="mr1 sub"
                                    role="tab"
                                    name="Advanced"
                                    aria-selected="false"
                                    tabindex="-1"
                                >
                                    Advanced
                                </tab-button>
                            </tab-list>

                            <tab-panel
                                name="Expansion"
                                class="active"
                                aria-label="Expansion"
                                role="tabpanel"
                            >
                                <SelectInputGroup
                                    value={
                                        this.state.model.parameters[
                                            "RELATIONSHIP_DISPLAY_EXPANDED"
                                        ].value
                                    }
                                    label="Expanded"
                                    parameter="RELATIONSHIP_DISPLAY_EXPANDED"
                                    onChange={this.onChange}
                                    help="This controls the initial display. Should this replationship expand automatically on page load?"
                                    options={DISPLAY_OPTIONS}
                                    defaultValue="false"
                                />

                                <ReadWriteInputFormGroup
                                    value={
                                        this.state.model.parameters[
                                            "RELATIONSHIP_DISPLAY_SELECTOR"
                                        ].value || ""
                                    }
                                    label="HTML Selector"
                                    parameter="RELATIONSHIP_DISPLAY_SELECTOR"
                                    onChange={this.onChange}
                                    help="To place this relationship in a specific place in the page, enter an HTML/CSS selector.."
                                    rows="1"
                                />
                            </tab-panel>
                            <tab-panel
                                name="Data"
                                class=""
                                aria-label="Data"
                                role="tabpanel"
                            >
                                <FilterSelectionInput
                                    value={
                                        this.state.model.parameters[
                                            "RELATIONSHIP_QUERY_LOOKUP"
                                        ].value ||
                                        this.state.model.parameters[
                                            "RELATIONSHIP_QUERY_ID"
                                        ].value ||
                                        "Default"
                                    }
                                    label="Query"
                                    parameter="RELATIONSHIP_QUERY_ID"
                                    onChange={this.onChange}
                                    onReset={this.onResetFilterOptions}
                                    help="This controls the query used to produce the display."
                                />
                                <SelectInputGroup
                                    value={
                                        this.state.model.parameters[
                                            "RELATIONSHIP_QUERY_RENDERER"
                                        ].value
                                    }
                                    label="Renderer"
                                    parameter="RELATIONSHIP_QUERY_RENDERER"
                                    onChange={this.onChange}
                                    help="This determines how the query data is rendered."
                                    options={RENDER_OPTIONS}
                                    defaultValue=""
                                />
                                {xslField}
                            </tab-panel>

                            <tab-panel
                                name="Advanced"
                                class=""
                                aria-label="Advanced"
                                role="tabpanel"
                            >
                                <SelectInputGroup
                                    value={
                                        this.state.model.parameters[
                                            "RELATIONSHIP_EDIT_LINK_ON_CREATE"
                                        ].value
                                    }
                                    label="Require edit on create"
                                    parameter="RELATIONSHIP_EDIT_LINK_ON_CREATE"
                                    onChange={this.onChange}
                                    help="Require the user to fill out the form when they create links. No automatic link creation."
                                    options={EDIT_LINK_OPTIONS}
                                    defaultValue="false"
                                />

                                <SelectInputGroup
                                    value={
                                        this.state.model.parameters[
                                            "RELATIONSHIP_TARGET_CLASS"
                                        ]
                                            ? this.state.model.parameters[
                                                "RELATIONSHIP_TARGET_CLASS"
                                            ].value
                                            : null
                                    }
                                    label="Select the target Class for this relationship"
                                    parameter="RELATIONSHIP_TARGET_CLASS"
                                    onChange={this.onChange}
                                    help="If the link class has multiple Relation attributes, this lets you select one for the Choose function"
                                    // options={EDIT_LINK_OPTIONS}
                                    options={relatedTargets}
                                    defaultValue=""
                                />

                                {Object.keys(READ_WRITE_PARAMS).map((key) => {
                                    const p = this.state.model.parameters[key];
                                    const local = READ_WRITE_PARAMS[key];

                                    return React.createElement(
                                        ReadWriteInputFormGroup,
                                        {
                                            value: defaultProperty(
                                                p,
                                                "value",
                                                ""
                                            ),
                                            label: local.label,
                                            parameter: defaultProperty(
                                                p,
                                                "parameter",
                                                ""
                                            ),
                                            onChange: this.onChange,
                                            help: local.help,
                                            rows: "1",
                                        }
                                    );
                                })}
                            </tab-panel>
                        </tab-view>
                        <OkCancelButtonGroup
                            onsubmit={this.oncancel}
                            onok={this.onok}
                            saving={this.props.saving}
                        />
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Properties</h4>
                </div>
            );
        }
    }

    stopIt(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }
    oncancel() { }
}

export default ParameterFormComponent;
