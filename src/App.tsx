import {
  VirtualTableColumn,
  VirtualTableRowSelection,
} from "VirtualTable/type";
import { VirtualTable } from "./VirtualTable";
import React from "react";

interface Profile {
  name: string;
  age: number;
  address: string;
}

const data: Profile[] = Array.from({ length: 1000 }, () => ({
  name: "John Brown",
  age: 32,
  address: "New York No. 1 Lake Park",
}));

const extraColumns = Array.from({ length: 20 }, (_, idx) => ({
  title: `test col ${idx + 1}`,
  width: 70,
  renderData: () => idx + 1,
}));

const getColumns = (
  horizontalScroll: boolean = false
): VirtualTableColumn<Profile>[] => {
  return [
    {
      title: "Name",
      width: 100,
      fixed: horizontalScroll ? "left" : undefined,
      renderData: (_) => _.name,
    },
    {
      title: "Address",
      width: 120,
      fixed: horizontalScroll ? "left" : undefined,
      renderData: (_) => _.address,
    },
    ...(horizontalScroll ? extraColumns : []),
    {
      title: "fixed 1",
      width: 120,
      fixed: "right",
      renderData: () => "fixed 1",
    },
    {
      title: "age",
      width: 70,
      fixed: horizontalScroll ? "right" : undefined,
      renderData: (_) => _.age,
    },
    {
      title: "action",
      width: 140,
      align: "right",
      fixed: horizontalScroll ? "right" : undefined,
      renderData: () => <button>Click Me</button>,
    },
    {
      title: "hidden column",
      width: 200,
      fixed: "right",
      display: "hidden",
      renderData: () => "hidden",
    },
  ];
};

const VirtualTableWithData = ({ hasData = false }: { hasData?: boolean }) => {
  return (
    <VirtualTable
      rowKey="index"
      rowHeight={50}
      dataSource={hasData ? data : []}
      scrollY={400}
      scrollX={800}
      columns={getColumns()}
    />
  );
};

const VirtualTableWithRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
    Array.from({ length: data.length }, (_, idx) => idx)
  );
  const rowSelection: VirtualTableRowSelection<Profile> = {
    width: 40,
    onChange: (_) => setSelectedRowKeys(_),
    isDisabled: (data, rowIndex) => rowIndex === 0,
    fixed: true,
    selectedRowKeys,
  };
  return (
    <VirtualTable
      rowKey="index"
      rowHeight={50}
      rowSelection={rowSelection}
      dataSource={data}
      scrollY={400}
      scrollX={800}
      columns={getColumns()}
    />
  );
};

const VirtualTableWithVariousData = () => {
  const [data, setData] = React.useState<Profile[]>([]);
  const singleData = {
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  };

  const addOneData = () => setData([...data, singleData]);
  const addTenData = () =>
    setData([...data, ...Array.from({ length: 10 }, () => singleData)]);
  const deleteLastData = () => setData(data.slice(0, data.length - 1));
  const deleteLastTenData = () => setData(data.slice(0, data.length - 10));

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-around", width: 800 }}
      >
        <button onClick={addOneData}>add 1 data</button>
        <button onClick={addTenData}>add 10 data</button>
        <button onClick={deleteLastData}>delete 1 data</button>
        <button onClick={deleteLastTenData}>delete 10 data</button>
      </div>
      <VirtualTable
        rowKey="index"
        rowHeight={50}
        dataSource={data}
        scrollY={400}
        scrollX={800}
        columns={getColumns()}
      />
    </div>
  );
};

export const App = () => {
  return (
    <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      <div style={{ padding: 20 }}>
        <p>VirtualTable with huge amount of data</p>
        <VirtualTableWithData hasData />
      </div>
      <div style={{ padding: 20 }}>
        <p>VirtualTable With Row Selection</p>
        <VirtualTableWithRowSelection />
      </div>
      <div style={{ padding: 20 }}>
        <p>VirtualTable with huge amount of data</p>
        <VirtualTableWithVariousData />
      </div>
    </div>
  );
};
