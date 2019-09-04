import React from 'react';

// AKTUALIZACJA PAGINACJI PO ZMIANIE LICZBY STRON
// + RESET
// - given: pages = 15, page = 7
//   when: pages = 25
//   then: page = 1
// - given: pages = 15, page = 7
//   when: click >>
//   then: clicked once with 15
//   when: pages = 25
//         click >>
//   then: clicked once with 25 (clicked twice in total)

import { shallow, mount } from 'enzyme'
import { Pagination } from './Pagination'

const getBtnByLabel = (wrapper, label) => wrapper.find('.page')
          .filterWhere(node => node.text().trim() === label)

describe('Pagination', () => {

  const getBtnByLabel = (wrapper, label) => wrapper.find('.page')
  .filterWhere(node => node.text().trim() === label)

  const getButtonLabels = wrapper => wrapper
    .find('.page').map(w => w.text())

  describe('Proper pages displayed', () => {

    [{
      displayArrows: false,
      currentPage: 1, pageCount: 1, expectedDisplayed: ['1']
    }, {
      displayArrows: false,
      currentPage: 2, pageCount: 3, expectedDisplayed: ['1', '2', '3']
    }, {
      displayArrows: false,
      currentPage: 1, pageCount: 15, expectedDisplayed: ['1', '2', '3']
    }, {
      displayArrows: false,
      currentPage: 2, pageCount: 15, expectedDisplayed: ['1', '2', '3', '4']
    }, {
      displayArrows: false,
      currentPage: 3, pageCount: 15, expectedDisplayed: ['1', '2', '3', '4', '5']
    }, {
      displayArrows: false,
      currentPage: 15, pageCount: 15, expectedDisplayed: ['13', '14', '15']
    }, {
      displayArrows: false,
      currentPage: 14, pageCount: 15, expectedDisplayed: ['12', '13', '14', '15']
    }, {
      displayArrows: false,
      currentPage: 13, pageCount: 15, expectedDisplayed: ['11', '12', '13', '14', '15']
    }].forEach(({ currentPage, pageCount, expectedDisplayed, displayArrows }) => {
      it(`
      given: current = ${currentPage}, pages = ${pageCount}
      then: should display ${expectedDisplayed}`, () => {
        const wrapper = shallow(<Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          displayArrows={displayArrows} />)
  
        expect(getButtonLabels(wrapper)).toEqual(expectedDisplayed)
      })
    })

  })

  describe('Current page', () => {
    it(`
    given: current = 1, pages = 15
    then: page 1 has class selected`, () => {
      const wrapper = shallow(<Pagination
        currentPage={1}
        pageCount={15} />)
      
      expect(wrapper.find('.page').at(0).hasClass('selected')).toBeTruthy()
      expect(wrapper.find('.selected').text()).toContain('1')
      expect(wrapper.find('.selected')).toHaveLength(1)
    })
  })

  // DSL: Domain-Specific Language
  describe('Disabled Buttons', () => {
    // current page always disabled
    [{
      id: 'D.1',
      currentPage: 1, pageCount: 1,
      enabled: [],
      disabled: ['<<', '<', '>', '>>'],
    }, {
      id: 'D.2',
      currentPage: 1, pageCount: 15,
      enabled: ['>>', '>'],
      disabled: ['<', '<<'],
    }, {
      id: 'D.3',
      currentPage: 2, pageCount: 15,
      enabled: ['<<', '<', '>', '>>'],
      disabled: [],
    }, {
      id: 'D.4',
      currentPage: 14, pageCount: 15,
      enabled: ['<<', '<', '>', '>>'],
      disabled: [],
    }, {
      id: 'D.5',
      currentPage: 15, pageCount: 15,
      enabled: ['<<', '<'],
      disabled: ['>', '>>'],
    }].forEach(({ id, currentPage, pageCount, enabled, disabled }) => {
      it(`
      TEST ${ id }:
      given: current = ${ currentPage }, pages = ${ pageCount }
      then: ${ enabled } should be enabled, ${ disabled } should be disabled`, () => {
        const wrapper = shallow(<Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          displayArrows={true} />)

        
  
        enabled.forEach(label => {
          const btn = getBtnByLabel(wrapper, label)
          expect(btn).toHaveLength(1)
          expect(btn.prop('disabled')).not.toBeTruthy()
        })
  
        disabled.forEach(label => {
          const btn = getBtnByLabel(wrapper, label)
          expect(btn).toHaveLength(1)
          expect(btn.prop('disabled')).toBeTruthy()
        })
      })
    })
  })

  const toString = (obj) => JSON.stringify(obj)

  describe('Callback gets invoked', () => {
    [{
      id: "CB.1",
      given: { currentPage: 7, pageCount: 15, displayArrows:false },
      actions: [{
        when: { click: 6 },
        then: [{ calledTimes: 1 }, { lastCalledWith: 6 }]
      }]
    }, {
      id: "CB.2",
      given: { currentPage: 7, pageCount: 15, displayArrows:false },
      actions: [{
        when: { click: 7 },
        then: [{ calledTimes: 0 }]
      }]
    }, {
      id: "CB.3",
      given: { currentPage: 1, pageCount: 15,displayArrows:true },
      actions: [{
        when: { click: '<' },
        then: [{ calledTimes: 0 }]
      }, {
        when: { click: '<<' },
        then: [{ calledTimes: 0 }]
      }, {
        when: { click: '>' },
        then: [{ calledTimes: 1 }, { lastCalledWith: 2 }]
      }, {
        when: { click: '>>' },
        then: [{ calledTimes: 2 }, { lastCalledWith: 15 }]
      }]
    }, {
      id: "CB.4",
      given: { currentPage: 15, pageCount: 15, displayArrows:true },
      actions: [{
        when: { click: '>' },
        then: [{ calledTimes: 0 }]
      }, {
        when: { click: '>>' },
        then: [{ calledTimes: 0 }]
      }, {
        when: { click: '<' },
        then: [{ calledTimes: 1 }, { lastCalledWith: 14 }]
      }, {
        when: { click: '<<' },
        then: [{ calledTimes: 2 }, { lastCalledWith: 1 }]
      }]
    }].forEach(({ id, given, actions }) => { 
      it(
      `TEST ${id}:
      given: current = ${given.currentPage}, pages = ${given.pageCount}
      ${actions.map(({ when, then }) => `
      when: ${ toString(when) }
      then: ${ toString(then) }`
      ).join('\n') + '\n'}`, () => {
        const spy = jest.fn()
        const wrapper = mount(<Pagination {...given} onChange={spy} />)
        
        actions.forEach(({when, then}) => {
          const btn = getBtnByLabel(wrapper, `${when.click}`)
          btn.simulate('click')

          then.forEach(expectations => {
            if ('calledTimes' in expectations){
              expect(spy).toHaveBeenCalledTimes(expectations.calledTimes)
            }
            if('lastCalledWith' in expectations){
              expect(spy).toHaveBeenLastCalledWith(expectations.lastCalledWith)
            }
          })
        })

      });
    });
  })
})