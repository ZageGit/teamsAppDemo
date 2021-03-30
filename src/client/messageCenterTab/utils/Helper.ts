import * as React from "react";
import {
  Iitems,
  IMicrosoftServicesWithoutNoneOption,
} from "../utils/interfaces";

// POST (get inital Data)

export async function getInitialData(setState: any) {
  const data = {
    TenantId: "1fbd33dc-2eec-4309-887a-0bc160998d05",
    TeamSiteDomain: "lillich.sharepoint.com",
    UserPrincipalName: "admin@lillich.onmicrosoft.com",
    Year: 2021,
    MessageType: "MessageCenter",
  };
  const response = await fetch(
    "https://teamsnewsapp.azurewebsites.net/api/teamsapp/GetMessagesForTenant",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const rawData = await response.json();

  const prettyData = rawData.messages.map((data: any) => {
    return {
      messageTitle: data.title,
      service: data.affectedWorkloadDisplayNames.split(","),
      lastUpdatedTime: timeFormatConverter(data.lastUpdatedTime),
      id: data.id,
      category: data.category,
      severity: data.severity,
      messages: data.messages,
    };
  });
  prettyData.sort(
    (a: Iitems, b: Iitems) =>
      +new Date(b.lastUpdatedTime) - +new Date(a.lastUpdatedTime)
  );

  setState(prettyData);
}

// Post (getNewData)

export async function getNewData(
  setItems: any,
  year: string,
  serviceFilterValue: string,
  keyWordFilterValue: string,
  setFilteredItems: any
) {
  const data = {
    TenantId: "1fbd33dc-2eec-4309-887a-0bc160998d05",
    TeamSiteDomain: "lillich.sharepoint.com",
    UserPrincipalName: "admin@lillich.onmicrosoft.com",
    Year: year,
    MessageType: "MessageCenter",
  };
  const response = await fetch(
    "https://teamsnewsapp.azurewebsites.net/api/teamsapp/GetMessagesForTenant",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const rawData = await response.json();

  const prettyData = rawData.messages.map((data: any) => {
    return {
      messageTitle: data.title,
      service: data.affectedWorkloadDisplayNames.split(","),
      lastUpdatedTime: timeFormatConverter(data.lastUpdatedTime),
      id: data.id,
      category: data.category,
      severity: data.severity,
      messages: data.messages,
    };
  });

  filterFunction(
    keyWordFilterValue,
    serviceFilterValue,
    prettyData,
    setFilteredItems
  );

  setItems(prettyData);
}

// GET (get all Services)
export async function getMicrosoftServices(setState: any) {
  const response = await fetch(
    `https://teamsnewsapp.azurewebsites.net/api/teamsapp/GetServicesForTenant/1fbd33dc-2eec-4309-887a-0bc160998d05`
  );
  const rawData = await response.json();
  const prettyData = rawData.map((data: any) => {
    return {
      key: data.workloadDisplayName,
      text: data.workloadDisplayName,
    };
  });
  const prettySortedData = [
    ...prettyData,
  ].sort(
    (
      a: IMicrosoftServicesWithoutNoneOption,
      b: IMicrosoftServicesWithoutNoneOption
    ) => a.key.localeCompare(b.key)
  );

  prettySortedData.unshift({ key: null, text: "None" });

  setState(prettySortedData);
}

const timeFormatConverter = (datestring: string) => {
  const date = new Date(datestring);
  const convertedDate = date.toLocaleString("default", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return convertedDate;
};
export const generateArrayOfYears = () => {
  const max = new Date().getFullYear();
  const min = 2020;
  const years: any = [];

  for (let i = max; i >= min; i--) {
    years.push({ key: i, text: i.toString() });
  }
  return years;
};

export const filterFunction = (
  keyWordFilterValue: string,
  serviceFilterValue: string,
  items: any,
  setFilteredItems: any
) => {
  if (keyWordFilterValue && serviceFilterValue) {
    const filteredItems = [...items].filter((item) => {
      return (
        (item.id.toLowerCase().includes(keyWordFilterValue.toLowerCase()) ||
          item.lastUpdatedTime
            .toLowerCase()
            .includes(keyWordFilterValue.toLowerCase()) ||
          item.messageTitle
            .toLowerCase()
            .includes(keyWordFilterValue.toLowerCase()) ||
          item.category
            .toLowerCase()
            .includes(keyWordFilterValue.toLowerCase()) ||
          item.severity
            .toLowerCase()
            .includes(keyWordFilterValue.toLowerCase())) &&
        item.service.some((res: any) =>
          res.toLowerCase().includes(serviceFilterValue.toLowerCase())
        )
      );
    });
    setFilteredItems(filteredItems);
  } else if (keyWordFilterValue && !serviceFilterValue) {
    const filteredItems = [...items].filter((el) => {
      return (
        el.id.toLowerCase().includes(keyWordFilterValue.toLowerCase()) ||
        el.lastUpdatedTime
          .toLowerCase()
          .includes(keyWordFilterValue.toLowerCase()) ||
        el.messageTitle
          .toLowerCase()
          .includes(keyWordFilterValue.toLowerCase()) ||
        el.service.some((res: any) =>
          res.toLowerCase().includes(keyWordFilterValue.toLowerCase())
        ) ||
        el.category.toLowerCase().includes(keyWordFilterValue.toLowerCase()) ||
        el.severity.toLowerCase().includes(keyWordFilterValue.toLowerCase())
      );
    });

    setFilteredItems(filteredItems);
  } else if (!keyWordFilterValue && serviceFilterValue) {
    const filteredItems = [...items].filter((el) => {
      return el.service.some((res: any) =>
        res.toLowerCase().includes(serviceFilterValue.toLowerCase())
      );
    });
    setFilteredItems(filteredItems);
  } else {
    setFilteredItems([...items]);
  }
};

export const columns = [
  {
    key: "Message title",
    name: "Message title",
    fieldName: "messageTitle",
    // isSorted: true,
    // isSortedDescending: isNameSortedDescending,
    sortAscendingAriaLabel: "Sorted A to Z",
    sortDescendingAriaLabel: "Sorted Z to A",
    isRowHeader: true,
    minWidth: 120,
    maxWidth: 500,
    isResizable: true,
    // onColumnClick: (e: any, column: any) => handleSortTitleColumn(e, column),
  },
  {
    key: "Service",
    name: "Service",
    fieldName: "service",
    minWidth: 100,
    maxWidth: 400,
    isResizable: true,
  },
  {
    key: "Last updated",
    name: "Last updated",
    fieldName: "lastUpdatedTime",
    // isSorted: true,
    // isSortedDescending: isDateSortedDescending,
    sortAscendingAriaLabel: "Sorted A to Z",
    sortDescendingAriaLabel: "Sorted Z to A",
    isRowHeader: true,
    minWidth: 200,
    maxWidth: 200,
    isResizable: true,
    // onColumnClick: (e: any, column: any) => handleSortDateColumn(e, column),
  },
  {
    key: "Message ID",
    name: "Message ID",
    fieldName: "id",
    minWidth: 150,
    maxWidth: 150,
    isResizable: true,
  },
  {
    key: "Category",
    name: "Category",
    fieldName: "category",
    minWidth: 200,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "Severity",
    name: "Severity",
    fieldName: "severity",
    minWidth: 200,
    maxWidth: 200,
    isResizable: true,
  },
];
