import React from 'react';

import { shallow } from 'enzyme';

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

    console.log(wrapper.debug())
    expect(wrapper.text()).toContainAll(sizes)
  });

  it('should invoke callback function when clicked', () => {
    const spy = jest.fn()
    const sizes = [10, 25, 50]
    const wrapper = shallow(<PageSize
        availableSizes={sizes}
        onChange={spy} />)

    const btn = wrapper.find('span')
      .filterWhere(node => node.text().includes('25'));
    btn.simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(25)
  })
});