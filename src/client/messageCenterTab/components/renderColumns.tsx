import * as React from "react";
// import "./Table.css";

export default function renderColumns(
  item: any,
  column: any,
  isPopUpOpen: any,
  setIsPopUpOpen: any,
  setSelectedItem: any
) {
  const fieldContent = item[column.fieldName];
  const handlePopUpClick = (e: any, item: any): void => {
    setSelectedItem(item);
    setIsPopUpOpen(!isPopUpOpen);
  };
  switch (column.name) {
    case "Tag":
      return (
        <span>
          <span className="category-list-items">{fieldContent}</span>
        </span>
      );
    case "Service":
      return (
        <span>
          {fieldContent.map((serviceName: string) => {
            if (
              serviceName === "Exchange Online" ||
              serviceName === "Exchange Online Protection"
            ) {
              return (
                <>
                  <i
                    data-icon-name="ExchangeLogo"
                    className={"ms-Icon root-32 css-685 iconStyles-856"}
                    aria-label="Exchange Online"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (serviceName === "OneDrive for Business") {
              return (
                <>
                  <i
                    data-icon-name="OneDrive"
                    className={"ms-Icon root-32 css-392 iconStyles-856"}
                    aria-label="OneDrive for Business"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (
              serviceName === "SharePoint Online" ||
              serviceName === "SharePoint Syntex"
            ) {
              return (
                <>
                  <i
                    data-icon-name="SharepointLogo"
                    className={"ms-Icon root-32 css-685 iconStyles-848"}
                    aria-label="SharePoint Online"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (
              serviceName === "Dynamics 365" ||
              serviceName === "Dynamics 365 Business Central"
            ) {
              return (
                <>
                  <i
                    data-icon-name="Dynamics365Logo"
                    className={"ms-Icon root-32 css-683 iconStyles-860"}
                    aria-label="Dynamics 365"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (serviceName === "Microsoft 365 suite") {
              return (
                <>
                  <i
                    data-icon-name="AdminALogo32"
                    className={"ms-Icon root-32 css-681 iconStyles-852"}
                    aria-label="Microsoft 365 suite"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (serviceName === "Yammer Enterprise") {
              return (
                <>
                  <i
                    data-icon-name="YammerLogo"
                    className={"ms-Icon root-32 css-539 iconStyles-862"}
                    aria-label="Yammer"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (serviceName === "Microsoft Teams") {
              return (
                <>
                  <i
                    data-icon-name="TeamsLogo"
                    className={"ms-Icon root-32 css-685 iconStyles-858"}
                    aria-label="Microsoft Teams"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (
              serviceName === "Microsoft Power Automate in Microsoft 365" ||
              serviceName === "Microsoft Power Automate"
            ) {
              return (
                <>
                  <i
                    data-icon-name="MicrosoftFlowLogo"
                    className="ms-Icon root-32 css-681 iconStyles-868"
                    aria-label="Microsoft Power Automate in Microsoft 365"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (serviceName === "Skype for Business") {
              return (
                <>
                  <i
                    data-icon-name="SkypeLogo"
                    className={"ms-Icon root-32 css-678 iconStyles-856"}
                    aria-label="Skype for Business"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (
              serviceName === "Identity Service" ||
              serviceName === "Microsoft Defender for Endpoint"
            ) {
              return (
                <>
                  <i
                    data-icon-name="Product"
                    className={"ms-Icon root-32 css-539 iconStyles-852"}
                    aria-label="Identity Service,Microsoft Defender for Endpoint"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (serviceName === "Planner") {
              return (
                <>
                  <i
                    data-icon-name="PlannerLogo"
                    className={"ms-Icon root-32 css-683 iconStyles-853"}
                    aria-label="Planner"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (serviceName === "Microsoft Forms") {
              return (
                <>
                  <i
                    data-icon-name="OfficeFormsLogo"
                    className="ms-Icon root-32 css-681 iconStyles-859"
                    aria-label="Microsoft Forms"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (
              serviceName === "Office for the web" ||
              serviceName === "Microsoft 365 Apps" ||
              serviceName === "Microsoft Intune" ||
              serviceName === "Finance and Operations Apps"
            ) {
              return (
                <>
                  <i
                    data-icon-name="OfficeLogo"
                    className={"ms-Icon root-32 css-678 iconStyles-854"}
                    aria-label="Office for the web"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else if (
              serviceName === "Power Apps in Microsoft 365" ||
              serviceName === "Power Apps"
            ) {
              return (
                <>
                  <i
                    data-icon-name="PowerAppsLogo"
                    className={"ms-Icon root-32 css-843 iconStyles-869"}
                    aria-label="Power Apps in Microsoft 365"
                  >
                    
                  </i>
                  <span className="icon-label">{serviceName}</span>
                </>
              );
            } else {
              return (
                <span style={{ color: "red", fontWeight: "bolder" }}>
                  {serviceName}
                </span>
              );
            }
          })}
        </span>
      );
    case "Message title":
      return (
        <>
          <span>
            <a
              onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                handlePopUpClick(e, item)
              }
            >
              {fieldContent}
            </a>
          </span>
        </>
      );
    case "Last updated":
      return (
        <>
          <span>{fieldContent}</span>
        </>
      );

    default:
      return <span>{fieldContent}</span>;
  }
}
