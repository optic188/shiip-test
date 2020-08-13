import React from 'react';
import ReactDOM from 'react-dom';
import { act } from '@testing-library/react';
import TableComponent from './TableComponent';

const mockedData = [
        {
            "node": {
                "name": "react",
                "url": "https://github.com/duxianwei520/react",
                "stargazers": {

                    "totalCount": 3808
                },
                "forks": {

                    "totalCount": 1366
                }
            }
        },
        {
            "node": {
                "name": "react",
                "url": "https://github.com/discountry/react",
                "stargazers": {

                    "totalCount": 960
                },
                "forks": {

                    "totalCount": 530
                }
            }
        },
        {
            "node": {
                "name": "react",
                "url": "https://github.com/Cathy0807/react",
                "stargazers": {
                    "totalCount": 664
                },
                "forks": {
                    "totalCount": 370
                }
            }
        }
    ];

let container:any;
describe('table component tests',()=>{
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
        expect(value1).toBe('react530960');
        expect(value2).toBe('react370664');
    });
});
