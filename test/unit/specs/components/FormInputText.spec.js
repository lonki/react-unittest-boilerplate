import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { is, fromJS } from 'immutable';

import FormInputText from 'src/components/FormInputText/FormInputText';

describe('<FormInputText />', () => {
  let comp = null;
  let inst = null;
  let input = null;
  let props = {};

  beforeEach(() => {
    props = {
      onChange: jasmine.createSpy('onChange').and.callThrough(),
      onFocus: jasmine.createSpy('onFocus').and.callThrough(),
      onBlur: jasmine.createSpy('onBlur').and.callThrough(),
    };

    comp = mount(
      <FormInputText {...props} />
    );

    inst = comp.instance();

    input = comp.find('input');
  });


  it('測試prop是否有被正確塞入', () => {
    comp.setProps({
      disabled: true,
      readonly: true,
      placeholder: 'test placeholder',
      defaultInputText: 'test defaultInputText',
      tooltipText: 'test tooltipText',
    });

    expect(comp.prop('disabled')).toBe(true);
    expect(comp.prop('readonly')).toBe(true);
    expect(comp.prop('placeholder')).toBe('test placeholder');
    expect(comp.prop('defaultInputText')).toBe('test defaultInputText');
    expect(comp.prop('tooltipText')).toBe('test tooltipText');
  });

  it('測試onChange, onFocus, onBlur是否有被呼叫到', () => {
    input.simulate('change', { target: { value: 'newValue' }});
    expect(props.onChange).toHaveBeenCalledTimes(1);

    input.simulate('focus');
    expect(props.onFocus).toHaveBeenCalledTimes(1);

    input.simulate('blur');
    expect(props.onBlur).toHaveBeenCalledTimes(1);
  });

  it('onChange時，如果input Text不是空值，會出現tooltip', () => {
    comp.setProps({
      tooltipText: 'show tooltip',
    });

    input.simulate('change', { target: { value: 'not empty' }});
    expect(comp.state().isShowTooltip).toBe(true);
    expect(comp.find('input').props().value).toBe('not empty');
    expect(comp.find('span').text()).toBe('show tooltip');
    
    input.simulate('change', { target: { value: '' }});
    expect(comp.state().isShowTooltip).toBe(false);
    expect(comp.find('input').props().value).toBe('');
  });
});