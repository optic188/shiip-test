import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, act} from '@testing-library/react';
import SearchBar from './SearchBar';
import TableComponent from "./TableComponent";
import {mockedData} from './data';

describe('Search bar component tests',()=>{
    test('search component renders correct '
        , () => {
        const mockCallback = jest.fn();
        const { getByTestId } = render(
            <SearchBar searcher={mockCallback} />
        );
        expect(getByTestId("search-input")).toBeTruthy();
        expect(getByTestId("search-button")).toBeTruthy();
    });
    test('on click handler working correct', ()=>{
        const mockCallback = jest.fn();
        const { getByTestId } = render(
            <SearchBar searcher={mockCallback} />
        );
        fireEvent.click(getByTestId('search-button'));
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    test('input onchange setting correct value', ()=>{
        const mockCallback = jest.fn();
        const { getByTestId } = render(
            <SearchBar searcher={mockCallback} />
        );
        fireEvent.change(getByTestId("search-input"), { target: { value: 'asd' } });
        expect(getByTestId("search-input").value).toBe('asd');
    })
});

describe('Table component tests',()=>{
    let container:any;
    beforeAll(()=>{
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    test('tables is showing correct data ', () => {
        act(()=>{
            // @ts-ignore
            ReactDOM.render(<TableComponent dataArg={mockedData} />, container)
        });
        const value1 =  container.querySelectorAll('table tbody tr')[1].textContent;
        const value2 =  container.querySelectorAll('table tbody tr')[2].textContent;
        expect(value1).toBe('react960530');
        expect(value2).toBe('react664370');
    });
    test('table renders correct number of rows', ()=> {
        act(()=>{
            // @ts-ignore
            ReactDOM.render(<TableComponent dataArg={mockedData} />, container)
        });
        const tr =  container.querySelectorAll('table tbody tr');
        expect(tr.length).toBe(3);
    })
});
