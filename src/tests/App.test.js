import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import Button from '../components/Button';
import Table from '../components/Table';
import mockCompleteData from '../__mocks__/completedataresp.json';
import mockAvailability from '../__mocks__/availabilityresp.json';
import mockCategory from '../__mocks__/categoryresp.json';
import App from '../App';
import fd from '../fetchdata';
beforeEach(() => {
  fetch.resetMocks();
});

describe('Navigation Buttons', () =>{
  test('Button renders', () => {
      render(<Button />);
      expect(screen.queryByRole(/button/i)).toBeInTheDocument();

  });

  test('Renders with prop', () => {
      const btn = render(<Button categ='test'/>);
      expect(screen.getByRole(/button/i)).toHaveTextContent('test');
  });

  test('Sends prop with click', () => {
      let test = jest.fn();
      const btn = render(<Button categ='testprop' setCateg={test.bind(this)} />);
      userEvent.click(btn.getByRole(/button/i));
      expect(test).toHaveBeenCalledWith('testprop');
  });


});

describe('Table', () => {
  test('Table renders without data', () => {
    render(<Table />);
    const tbl = screen.getByRole(/table/i);
    expect(tbl).toBeInTheDocument();
  });

  test('Table renders with data', () => {
    const md = mockCompleteData;
    render(<Table itemData={md['gloves']} />);
    expect(screen.getByRole(/table/i)).toHaveTextContent(/./);
  });
});

describe('Data Fetching', () => {


});
/*
describe('Index', () => {
  test('something', () => {
    fetch.once(mockCategory);
    fetch.once(mockAvailability);

    let testfd = new fd();
    let cd = '123';
    testfd.fetchData().then( resp => {
      cd = resp;
    });

    console.log(cd);
  });
});
*/