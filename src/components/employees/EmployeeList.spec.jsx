import React from 'react';

import { shallow } from 'enzyme';

import { EmployeeList } from './EmployeeList'
import { getEmployees } from '../../data'

describe('EmployeeList', () => {
  it('should render "No items" label if no employees passed', () => {
    const wrapper = shallow(<EmployeeList />)

    expect(wrapper.text()).toContain("No items")
  });

  it('should render 25 list items', () => {
    const employees = getEmployees().slice(0, 25)
    const wrapper = shallow(<EmployeeList employees={employees}/>)

    expect(wrapper.find('li')).toHaveLength(25)

  });

  [{
    nationality: "PL", expectedCount: 32,
  },{
    nationality: "DE", expectedCount: 14,
  },{
    nationality: "US", expectedCount: 21,
  },{
    nationality: "UK", expectedCount: 7,
  }].forEach(({nationality, expectedCount}) => {
    it(`should display ${expectedCount} employees of ${nationality} nationality`, () => {
      const employees = getEmployees().slice(0, 100)
      const givenNationality = nationality
      const wrapper = shallow(<EmployeeList 
        employees={employees}
        filterBy={{ nationality: givenNationality }} />)
  
        expect(wrapper.find('li')).toHaveLength(expectedCount)
    });

  })



  
});