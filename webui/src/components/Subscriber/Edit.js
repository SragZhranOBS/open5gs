import { Component } from 'react';
import PropTypes from 'prop-types';

import withWidth, { SMALL } from 'helpers/with-width';
import { Form } from 'components';

const schema = {
  "title": "Subscriber Configuration",
  "type": "object",
  "properties": {
    "imsi": {
      "type": "string", 
      "title": "IMSI*",
      "required": true,
      "pattern": "^\\d+$",
      "maxLength": 15,
      "messages": {
        "pattern": "Only digits are allowed"
      }
    },
    "security": {
      "title": "",
      "type": "object",
      "properties": {
        "k": {
          "type": "string",
          "title": "Subscriber Key (K)*",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        },
        "op": {
          "type": "string",
          "title": "Operator Key (OP)*",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        },
        "amf": {
          "type": "string",
          "title": "Authentication Management Field (AMF)*",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        }
      }
    },
    "ambr": {
      "type": "object",
      "title": "",
      "properties": {
        "downlink": {
          "type": "number",
          "title": "UE-AMBR Downlink (Kbps)*",
          "required": true
        },
        "uplink": {
          "type": "number",
          "title": "UE-AMBR Uplink (Kbps)*",
          "required": true
        }
      }
    },
    "pdn": {
      "type": "array",
      "title": "APN Configurations",
      "minItems": 1,
      "maxItems": 4,
      "messages": {
        "minItems": "At least 1 APN is required",
        "maxItems": "4 APNs are supported"
      },
      "items": {
        "type": "object",
        "properties": {
          "apn": {
            "type": "string",
            "title": "Access Point Name (APN)*",
            "required": true
          },
          "qos": {
            "type": "object",
            "title": "",
            "properties": {
              "qci": {
                "type": "number",
                "title": "QoS Class Identifier (QCI)*",
                "enum": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 65, 66, 69, 70 ],
                "default": 9,
              },
              "arp" : {
                "type": "object",
                "title": "",
                "properties": {
                  "priority_level": {
                    "type": "number",
                    "title": "ARP Priority Level (1-15)*",
                    "default": 8,
                    "minimum": 1,
                    "maximum": 15,
                    "required": true
                  },
                  "pre_emption_capability": {
                    "type": "number",
                    "title": "Capability*",
                    "enum": [1, 0],
                    "enumNames": ["Disabled", "Enabled"],
                    "default": 1,
                  },
                  "pre_emption_vulnerability": {
                    "type": "number",
                    "title": "Vulnerability*",
                    "enum": [1, 0],
                    "enumNames": ["Disabled", "Enabled"],
                    "default": 1,
                  },
                }
              }
            }
          },
          "ambr": {
            "type": "object",
            "title": "",
            "properties": {
              "downlink": {
                "type": "number",
                "title": "APN-AMBR Downlink (Kbps)",
              },
              "uplink": {
                "type": "number",
                "title": "APN-AMBR Uplink (Kbps)",
              },
            }
          },
          "pcc_rule": {
            "type": "array",
            "title": "PCC Rules",
            "maxItems": 8,
            "messages": {
              "maxItems": "8 PCC Rules are supported"
            },
            "items": {
              "type": "object",
              "properties": {
                "flow": {
                  "type": "array",
                  "title": "",
                  "minItems": 1,
                  "maxItems": 8,
                  "messages": {
                    "minItems": "At least 1 Flow is required",
                    "maxItems": "8 Flows are supported"
                  },
                  "items": {
                    "type": "object",
                    "properties": {
                      "direction": {
                        "type": "number",
                        "title": "Flow Direction*",
                        "enum": [1, 2],
                        "enumNames": ["Downlink", "Uplink"],
                        "default": 1,
                      },
                      "description": {
                        "type": "string",
                        "title": "Description*",
                        "default": "permit out ip from any to any",
                        "required": true,
                        "pattern": "^permit\\s+out",
                        "messages": {
                          "pattern": "Begin with reserved keyword 'permit out'."
                        }
                      }
                    }
                  }
                },
                "qos": {
                  "type": "object",
                  "title": "",
                  "properties": {
                    "qci": {
                      "type": "number",
                      "title": "QoS Class Identifier (QCI)*",
                      "enum": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 65, 66, 69, 70 ],
                      "default": 9,
                    },
                    "arp" : {
                      "type": "object",
                      "title": "",
                      "properties": {
                        "priority_level": {
                          "type": "number",
                          "title": "ARP Priority Level (1-15)*",
                          "default": 8,
                          "minimum": 1,
                          "maximum": 15,
                          "required": true
                        },
                        "pre_emption_capability": {
                          "type": "number",
                          "title": "Capability*",
                          "enum": [1, 0],
                          "enumNames": ["Disabled", "Enabled"],
                          "default": 1,
                        },
                        "pre_emption_vulnerability": {
                          "type": "number",
                          "title": "Vulnerability*",
                          "default": 1,
                          "minimum": 0,
                          "maximum": 1,
                          "enum": [1, 0],
                          "enumNames": ["Disabled", "Enabled"],
                          "default": 1,
                        },
                      }
                    },
                    "mbr": {
                      "type": "object",
                      "title": "",
                      "properties": {
                        "downlink": {
                          "type": "number",
                          "title": "MBR Downlink (Kbps)",
                        },
                        "uplink": {
                          "type": "number",
                          "title": "MBR Uplink (Kbps)",
                        },
                      }
                    },
                    "gbr": {
                      "type": "object",
                      "title": "",
                      "properties": {
                        "downlink": {
                          "type": "number",
                          "title": "GBR Downlink (Kbps)",
                        },
                        "uplink": {
                          "type": "number",
                          "title": "GBR Uplink (Kbps)",
                        },
                      }
                    },
                  },
                },
              }
            }
          }
        }
      }
    }
  }
};

const uiSchema = {
  "imsi" : {
    classNames: "col-xs-12",
  },
  "security" : {
    "k" : {
      classNames: "col-xs-12",
    },
    "op" : {
      classNames: "col-xs-7",
    },
    "amf" : {
      classNames: "col-xs-5",
    },
  },
  "ambr" : {
    "downlink" : {
      classNames: "col-xs-6"
    },
    "uplink" : {
      classNames: "col-xs-6"
    },
  },
  "pdn": {
    "items": {
      "qos": {
        "qci": {
          "ui:widget": "radio",
          "ui:options": {
            "inline": true
          },
        },
        "arp": {
          "priority_level": {
            classNames: "col-xs-6"
          },
          "pre_emption_capability": {
            classNames: "col-xs-3"
          },
          "pre_emption_vulnerability": {
            classNames: "col-xs-3"
          }
        }
      },
      "ambr" : {
        "downlink" : {
          classNames: "col-xs-6"
        },
        "uplink" : {
          classNames: "col-xs-6"
        },
      },
      "pcc_rule": {
        "items": {
          "flow": {
            "items": {
              "direction": {
                classNames: "col-xs-12"
              },
              "description": {
                classNames: "col-xs-12",
                "ui:help": "Hint: Flow-Description(TS29.212), IPFilterRule(RFC 3588)",
              },
            },
          },
          "qos": {
            "qci": {
              "ui:widget": "radio",
              "ui:options": {
                "inline": true
              },
            },
            "arp": {
              "priority_level": {
                classNames: "col-xs-6"
              },
              "pre_emption_capability": {
                classNames: "col-xs-3"
              },
              "pre_emption_vulnerability": {
                classNames: "col-xs-3"
              }
            },
            "mbr": {
              "downlink": {
                classNames: "col-xs-6"
              },
              "uplink": {
                classNames: "col-xs-6"
              }
            },
            "gbr": {
              "downlink": {
                classNames: "col-xs-6"
              },
              "uplink": {
                classNames: "col-xs-6"
              }
            }
          }
        }
      }
    }
  }
}

class Edit extends Component {
  static propTypes = {
    visible: PropTypes.bool, 
    action: PropTypes.string, 
    formData: PropTypes.object,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    disableSubmitButton: PropTypes.bool,
    validate: PropTypes.func, 
    onHide: PropTypes.func, 
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onError: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = this.getStateFromProps(props);
  }

  componentWillMount() {
    this.setState(this.getStateFromProps(this.props));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  getStateFromProps(props) {
    const { 
      action,
      width,
    } = props;

    let state = {
      schema,
      uiSchema
    };
    
    if (action === 'update') {
      state = {
        ...state,
        uiSchema : {
          ...uiSchema,
          "imsi": {
            "ui:disabled": true
          }
        }
      }
    } else if (width !== SMALL) {
      state = {
        ...state,
        uiSchema : {
          ...uiSchema,
          "imsi": {
            "ui:autofocus": true
          }
        }
      }
    }

    return state;
  }

  render() {
    const {
      visible,
      action,
      formData,
      disabled,
      isLoading,
      disableSubmitButton,
      validate,
      onHide,
      onChange,
      onSubmit,
      onError
    } = this.props;

    return (
      <Form 
        visible={visible}
        title={(action === 'update') ? 'Edit Subscriber' : 'Create Subscriber'}
        schema={this.state.schema}
        uiSchema={this.state.uiSchema}
        formData={formData}
        disabled={disabled}
        isLoading={isLoading}
        disableSubmitButton={disableSubmitButton}
        validate={validate}
        onHide={onHide}
        onChange={onChange}
        onSubmit={onSubmit}
        onError={onError}/>
    )
  }
}

export default withWidth()(Edit);
