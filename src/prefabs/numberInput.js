(() => ({
  name: 'NumberInput',
  icon: 'NumberInputIcon',
  category: 'FORM',
  structure: [
    {
      name: 'TextField',
      options: [
        {
          value: '',
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
        },
        {
          value: ['Number'],
          label: 'Label',
          key: 'label',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'property',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: [],
          label: 'Label',
          key: 'propertyLabelOverride',
          type: 'VARIABLE',
          configuration: {
            placeholder: 'Label of property',
            condition: {
              type: 'HIDE',
              option: 'property',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          value: [],
          label: 'Value',
          key: 'defaultValue',
          type: 'VARIABLE',
        },
        {
          value: '',
          label: 'Input',
          key: 'actionInputId',
          type: 'ACTION_INPUT',
        },
        {
          value: false,
          label: 'Required',
          key: 'required',
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Error',
          key: 'error',
          type: 'TOGGLE',
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
        },
        {
          value: [],
          label: 'Placeholder',
          key: 'placeholder',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Helper text',
          key: 'helperText',
          type: 'VARIABLE',
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'outlined',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Standard', value: 'standard' },
              { name: 'Outlined', value: 'outlined' },
              { name: 'Filled', value: 'filled' },
            ],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Full width',
          key: 'fullWidth',
          value: true,
        },
        {
          label: 'Size',
          key: 'size',
          value: 'medium',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Medium', value: 'medium' },
              { name: 'Small', value: 'small' },
            ],
          },
        },
        {
          label: 'Margin',
          key: 'margin',
          value: 'normal',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Dense', value: 'dense' },
              { name: 'Normal', value: 'normal' },
            ],
          },
        },
        {
          label: 'Adornment',
          key: 'adornment',
          value: '',
          type: 'TEXT',
        },
        {
          type: 'CUSTOM',
          label: 'Position',
          key: 'adornmentPosition',
          value: 'start',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'adornment',
              comparator: 'EQ',
              value: '',
            },
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Start', value: 'start' },
              { name: 'End', value: 'end' },
            ],
          },
        },
        {
          label: 'Type',
          key: 'type',
          value: 'number',
          type: 'TEXT',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'adornment',
              comparator: 'EQ',
              value: 0,
            },
          },
        },
        {
          value: false,
          label: 'Styles',
          key: 'styles',
          type: 'TOGGLE',
        },
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'White',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Border color',
          key: 'borderColor',
          value: 'Accent1',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Border color (hover)',
          key: 'borderHoverColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Border color (focus)',
          key: 'borderFocusColor',
          value: 'Primary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: false,
          label: 'Hide label',
          key: 'hideLabel',
          type: 'TOGGLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Label color',
          key: 'labelColor',
          value: 'Accent3',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Text color',
          key: 'textColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Placeholder color',
          key: 'placeholderColor',
          value: 'Light',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Helper color',
          key: 'helperColor',
          value: 'Accent2',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Error color',
          key: 'errorColor',
          value: 'Danger',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
