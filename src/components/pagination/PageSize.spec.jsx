import React from 'react';

import { shallow, mount } from 'enzyme';

import { PageSize } from './PageSize';

// integracyjne:

// jesli wybrane np. size 10, to liczba elementow wyswietlanych w TableContainer <= 10

// unity:

// - [LOW] czy wszystkie rozmiary wyswietlone
// - defaulty size // sprawdzenie klasy CSS jaki rozmiar obecnie
// - [HIGH] jak klikne dany rozmiar, to czy sie zmieni
// - callback wywolany po kliknieciu w rozmiar inny niz aktualny
// - callback nie wywolany po kliknieciu w aktualny rozmiar

expect.extend({

  toContainAll: (actual, expectedItems) => {

    const pass = expectedItems.every(el => actual.includes(el))
    const message = () => 
    `Miało być inaczej
    Dałeś: ${actual}
    a miało być: ${expectedItems}`
  
    return {
      pass,
      message
    }
  }
})

describe('PageSize', () => {
  it('should display all available sizes', async () => {

    const sizes = [10, 25, 50];
    const wrapper = shallow(<PageSize availableSizes={sizes}/>)
    expect(wrapper.text()).toContainAll(sizes)
  });

  const getBtnByLabel = (wrapper, label) => wrapper.find('span')
  .filterWhere(node => node.text().includes(label));

  it('should invoke callback function when clicked', () => {
    const spy = jest.fn()
    const sizes = [10, 25, 50]
    const wrapper = mount(<PageSize
        availableSizes={sizes}
        onChange={spy} />)


      getBtnByLabel(wrapper, '25').simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenLastCalledWith(25)

    getBtnByLabel(wrapper, '10').simulate('click')

    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenLastCalledWith(10)

    getBtnByLabel(wrapper, '10').simulate('click')

    expect(spy).toHaveBeenCalledTimes(2)
  })

  // it('should invoke callback only if new size is different than old one', () => {
  //   const spy = jest.fn()
  //   const sizes = [10, 25, 50]
  //   const wrapper = shallow(<PageSize
  //       availableSizes={sizes}
  //       onChange={spy} />)
  //       getBtnByLabel(wrapper, '10').simulate('click')

  //       expect(spy).toHaveBeenCalledTimes(2)
  //       expect(spy).toHaveBeenLastCalledWith(10)
  // });
});