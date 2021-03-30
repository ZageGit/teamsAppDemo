import "./Table.css";
import {
  filterFunction,
  generateArrayOfYears,
  getInitialData,
  getMicrosoftServices,
  getNewData,
  columns,
} from "../utils/Helper";
import { useState, useEffect } from "react";
import Popup from "./PopUp";
import renderColumns from "./renderColumns";

import {
  DefaultButton,
  Dropdown,
  IconButton,
  IIconProps,
  PrimaryButton,
  ProgressIndicator,
  SearchBox,
  DetailsList,
  DetailsListLayoutMode,
} from "@fluentui/react";
import { Iitems } from "../utils/interfaces";
import * as React from "react";

export default function Table() {
  const [items, setItems] = useState<Iitems[] | any[]>([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [microsoftServices, setMicrosoftServices] = useState<any>();
  const [filteredItems, setFilteredItems] = useState<Iitems[] | any[]>();
  const [serviceFilterValue, setServiceFilterValue] = useState<any>();
  const [keyWordFilterValue, setKeyWordFilterValue] = useState<any>();
  const [yearFilterValue, setYearFilterValue] = useState<any>();
  const [yearHasChanged, setYearHasChanged] = useState<boolean>(false);
  // const [isNameSortedDescending, setIsNameSortedDescending] = useState(false);
  // const [isDateSortedDescending, setIsDateSortedDescending] = useState(false);

  useEffect(() => {
    getInitialData(setItems);
    getMicrosoftServices(setMicrosoftServices);
  }, []);
  const handlesServiceFilterChange = (text: any) => {
    if (text) {
      setServiceFilterValue(text.key);
    } else {
      setServiceFilterValue(null);
    }
  };
  const handlesYearFilterChange = (text: any) => {
    setYearHasChanged(true);
    setYearFilterValue(text.key);
  };
  const handleSubmit = () => {
    if (yearHasChanged) {
      getNewData(
        setItems,
        yearFilterValue,
        serviceFilterValue,
        keyWordFilterValue,
        setFilteredItems
      );

      setYearHasChanged(false);
    } else {
      filterFunction(
        keyWordFilterValue,
        serviceFilterValue,
        items,
        setFilteredItems
      );
      setYearHasChanged(false);
    }
  };

  // const handleSortTitleColumn = (ev: any, column: any) => {
  //   if (!isNameSortedDescending && items) {
  //     const x = [...items].sort((a: any, b: any) =>
  //       a[column.fieldName].localeCompare(b[column.fieldName])
  //     );
  //     setItems(x);
  //   } else if (isNameSortedDescending && items) {
  //     const x = [...items].sort((a: any, b: any) =>
  //       b[column.fieldName].localeCompare(a[column.fieldName])
  //     );
  //     setItems(x);
  //   }
  //   setIsNameSortedDescending(!isNameSortedDescending);
  // };
  // const handleSortDateColumn = (ev: any, column: any) => {
  //   if (!isDateSortedDescending && items) {
  //     const x = [...items].sort(
  //       (a: any, b: any) =>
  //         +new Date(a[column.fieldName]) - +new Date(b[column.fieldName])
  //     );
  //     setItems(x);
  //   } else if (isDateSortedDescending && items) {
  //     const x = [...items].sort(
  //       (a: any, b: any): any =>
  //         +new Date(b[column.fieldName]) - +new Date(a[column.fieldName])
  //     );

  //     setItems(x);
  //   }
  //   setIsDateSortedDescending(!isDateSortedDescending);
  // };
  const emojiIcon: IIconProps = { iconName: "refresh" };
  return (
    <>
      <div className="header">
        <h1>Message center</h1>
      </div>
      <div className="input-container">
        <div className="keyword-container">
          <p>Keyword</p>
          <SearchBox
            placeholder="Search... "
            onChange={(e, text) => setKeyWordFilterValue(text)}
            className="textfield"
            labelText="Filter by Keyword"
          />
        </div>

        <Dropdown
          options={microsoftServices}
          className="dropdown"
          onChange={(e, text) => handlesServiceFilterChange(text)}
          label="Service"
          placeholder="None"
        />
        <Dropdown
          options={generateArrayOfYears()}
          className="dropdown"
          onChange={(e, text) => handlesYearFilterChange(text)}
          label="Year"
          placeholder="2021"
        />
        <div className="button-container">
          <PrimaryButton text="Search" onClick={handleSubmit} />
          <IconButton
            iconProps={emojiIcon}
            onClick={() => setFilteredItems(undefined)}
          />
        </div>
      </div>
      {items.length > 0 ? (
        <div className="list-container">
          <DetailsList
            items={filteredItems ? filteredItems : items}
            columns={columns}
            getKey={(item) => item.key}
            selectionMode={0}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            onRenderItemColumn={(item, index: any, column) =>
              renderColumns(
                item,
                column,
                isPopUpOpen,
                setIsPopUpOpen,
                setSelectedItem
              )
            }
          />
          <Popup
            isPopUpOpen={isPopUpOpen}
            setIsPopUpOpen={setIsPopUpOpen}
            selectedItem={selectedItem}
          />
        </div>
      ) : (
        <ProgressIndicator />
      )}
    </>
  );
}
