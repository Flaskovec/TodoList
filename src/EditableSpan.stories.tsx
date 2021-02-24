import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { EditableSpan, EditableSpanPropsType } from './EditableSpan';

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'value of EdtableSpan changed',
    },
    title: {
      defaultValue: ' HTML',
      description: 'start value of EditableSpan',
    },
  },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args: EditableSpanPropsType) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
  onChange: action('value of EdtableSpan changed'),
};
