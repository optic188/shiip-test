import React, { FC }  from 'react';
import {Table } from 'antd';
// Table config for columns
const columns = [
    {
        title: 'Repo name',
        dataIndex: 'name',
        key: 'repo-name',
        render: (params:[string, string]) => (<a href={params[0]}>{params[1]}</a>),
    },
    {
        title: 'stars',
        dataIndex: 'stars',
        key: 'age',
    },
    {
        title: 'forks',
        dataIndex: 'forks',
        key: 'forks',
    },
];

interface Iforks {
    totalCount: number
}

interface IData {
    node: {
        forks:Iforks,
        name: string,
        url: string,
        stargazers: Iforks
    }
}

interface IdataArg {
    dataArg:[IData]
}
const convertTabledata = (arr:[IData])=> {
    // @ts-ignore
    return arr.map((elem, index)=>{
        return (
            {
                key: index,
                name: [elem.node.url, elem.node.name],
                forks: elem.node.forks.totalCount,
                stars: elem.node.stargazers.totalCount
            }
        )
    })
};

// Table component
const TableComponent:FC<IdataArg> = ({dataArg}:IdataArg)=> {
    return (
        <>
            <Table columns={columns} dataSource={convertTabledata(dataArg)} />
        </>
    )
};

export default TableComponent