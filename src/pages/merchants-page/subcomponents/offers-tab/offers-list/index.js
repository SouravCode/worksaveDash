import React from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";
import { DateTime } from "luxon";
// import updateOffer from "../offers-list/offer-details";
import UpdateOffer from "../offers-list/offer-details";
function OffersList(data) {
  const updateOffer = ({data}) =>{
    return(
      <UpdateOffer data={data} allOffer={totalOffer}/>
    )
  }
  let totalOffer = [];
  const offerDetails = cloneDeep(
    data.data.data.locations.length > 0
      ? data.data.data.locations[0].offers
      : ""
  );
  const merchantId = data.data.data.id;
  const locationId =
    data.data.data.locations.length > 0 && data.data.data.locations[0]
      ? data.data.data.locations[0].id
      : "";
  if (offerDetails && offerDetails.length > 0) {
    for (let i = 0; i < offerDetails.length; i++) {
      totalOffer.push(
        offerDetails.slice(
          offerDetails.length - i - 1,
          offerDetails.length - i
        )[0]
      );
    }
  }

  if (totalOffer) {
    totalOffer.map(e => {
      return (e.merchantId = merchantId), (e.locationId = locationId);
    });
  }


  // const renderGridCell = data => {
  //   return (
  //     <tbody>
  //       <tr>
  //         <td className="left">{data.data.offerType}</td>

  //         {/* <td className="right">{data.data.invoiceNumber}</td> */}

  //         <td className="left">
  //           {DateTime.fromISO(data.data.startDate).toFormat("dd LLL yyyy")}
  //         </td>
  //         <td className="left">
  //           {DateTime.fromISO(data.data.endDate, { zone: "utc" }).toFormat(
  //             "dd LLL yy"
  //           )}
  //         </td>

  //         <td className="right">{data.data.offerValue}</td>
  //         <td className="right">{data.data.woveValue}</td>
  //         <td className="left">{data.data.status}</td>

  //         <td className="left">{data.data.offerCategory}</td>

  //         <td className="cent">{data.data.isPrimary}</td>
  //         <td className="right">{data.data.offerOriginalValue}</td>
  //       </tr>
  //     </tbody>
  //   );
  // };
  // totalOffer.sort((a, b) => {
  //   return new Date(b.modifiedDate) - new Date(a.modifiedDate);
  // });
  return (
    <DataGrid
      className={"dx-card wide-card"}
      showBorders={false}
      visible={true}
      dataSource={totalOffer}
      // rowRender={renderGridCell}
      keyExpr="id"
    >
      <MasterDetail enabled={true} component={updateOffer} />
      <Column dataField={"offerType"} caption={"Offer Type"} />
      <Column
        dataField={"startDate"}
        dataType={"datetime"}
        caption={"StartDate&Time"}
      />
      <Column
        dataField={"endDate"}
        dataType={"datetime"}
        caption={"EndDate&Time"}
      />

      <Column dataField={"offerValue"} caption={"Offer Value"} width={220} />
      <Column dataField={"woveValue"} caption={"Wove Value"} />
      <Column dataField={"status"} caption={"Status"} />
      <Column dataField={"offerCategory"} caption={"Offer Category"} />
      <Column dataField={"isPrimary"} caption={"Primary"} />
      <Column
        dataField={"offerOriginalValue"}
        caption={"Offer Original Value"}
      />
    </DataGrid>
  );
}
OffersList.propTypes = {
  data: PropTypes.object
};

export default OffersList;
