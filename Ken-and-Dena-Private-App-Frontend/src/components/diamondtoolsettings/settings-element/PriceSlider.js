import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const PriceSlider = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);
  const marks = props.pricerangeData;
  const [startValue, setStartValue] = useState(Number(props.pricemindata));
  const [lastValue, setLastValue] = useState(Number(props.pricemaxdata));
  const [getsettingcookies] = useCookies(["_wpsavediamondfiltercookie"]);
  const [getlabcookies] = useCookies(["_wpsavedlabgowndiamondfiltercookie"]);
  const [getfancycookies] = useCookies(["_wpsavedfancydiamondfiltercookie"]);

  const formatToTwoDecimals = (value) => parseFloat(value).toFixed(2);

  const formatCurrency = (value) => {
    return Number(value).toLocaleString(); // Format with commas
  };

  const rangeSelectorprops = (newValue) => {
    setStartValue(formatToTwoDecimals(newValue[0]));
    setLastValue(formatToTwoDecimals(newValue[1]));

    const sliderSelection = [
      parseFloat(newValue[0]).toFixed(2),
      parseFloat(newValue[1]).toFixed(2),
    ];
    props.callBack(sliderSelection);
  };

  const startValueOnChange = (event) => {
    const rawValue = event.target.value.replace(/,/g, ""); // Remove commas before validating
    const intValue = parseFloat(rawValue).toFixed(2);
    if (intValue >= 0 && intValue <= Number(marks[0].maxPrice)) {
      setStartValue(intValue);
      props.callBack([parseFloat(intValue).toFixed(2), lastValue]);
    } else {
      alert("Please Enter Valid Value");
    }
  };

  const endValueOnChange = (event) => {
    const rawValue = event.target.value.replace(/,/g, ""); // Remove commas before validating
    const intValue = parseFloat(rawValue).toFixed(2);
    if (intValue >= 0 && intValue <= Number(marks[0].maxPrice)) {
      setLastValue(intValue);
      props.callBack([startValue, parseFloat(intValue).toFixed(2)]);
    } else {
      alert("Please Enter Valid Value");
    }
  };

  useEffect(() => {
    setLoaded(true);
    if (
      props.callbacktab === "fancycolor" &&
      getfancycookies._wpsavedfancydiamondfiltercookie
    ) {
      setStartValue(Number(props.pricemindata).toFixed(2));
      setLastValue(Number(props.pricemaxdata).toFixed(2));
    }
    if (props.pricemindata === "" && props.pricemaxdata === "") {
      setStartValue(Number(marks[0].minPrice).toFixed(2));
      setLastValue(Number(marks[0].maxPrice).toFixed(2));
    }
    if (
      props.callbacktab === "mined" &&
      getsettingcookies._wpsavediamondfiltercookie
    ) {
      setStartValue(Number(props.pricemindata).toFixed(2));
      setLastValue(Number(props.pricemaxdata).toFixed(2));
    }
    if (
      props.callbacktab === "labgrown" &&
      getlabcookies._wpsavedlabgowndiamondfiltercookie
    ) {
      setStartValue(Number(props.pricemindata).toFixed(2));
      setLastValue(Number(props.pricemaxdata).toFixed(2));
    }
  }, [props]);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          <h4 className="f_heading">
            Price
            <span className="f_popup" onClick={onOpenModal}>
              <i className="fas fa-info-circle"></i>
            </span>
          </h4>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "popup_Overlay",
              modal: "popup_Modal",
            }}
          >
            <div className="popup_content">
              <p>
                This refer to different type of Price to filter and select the
                appropriate ring as per your requirements. Look for best suit
                price of your chosen ring.
              </p>
            </div>
          </Modal>
          <div className="diamond-ui-slider diamond-small-slider">
            <Nouislider
              connect
              behaviour={"snap"}
              start={[
                props.pricemindata ? props.pricemindata : startValue,
                props.pricemaxdata ? props.pricemaxdata : lastValue,
              ]}
              range={{
                min: Number(marks[0].minPrice),
                max: Number(marks[0].maxPrice),
              }}
              tooltips
              onChange={rangeSelectorprops}
            />
          </div>
        </div>
        <div className="input-value">
          <div className="input-value-left">
            <span
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "icon-right"
                  : "icon-left"
              }
            >
              {window.currencyFrom === "USD"
                ? window.currency
                : window.currencyFrom + " " + window.currency}
            </span>
            <input
              type="text"
              value={props.pricemindata ? formatCurrency(props.pricemindata) : formatCurrency(startValue)}
              onChange={startValueOnChange}
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "input-left"
                  : ""
              }
            />
          </div>
          <div className="input-value-right">
            <span
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "icon-right"
                  : "icon-left"
              }
            >
              {window.currencyFrom === "USD"
                ? window.currency
                : window.currencyFrom + " " + window.currency}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={props.pricemaxdata ? formatCurrency(props.pricemaxdata) : formatCurrency(lastValue)}
              onChange={endValueOnChange}
              placeholder="Enter price"
              className={
                window.initData["data"][0].price_row_format === "0"
                  ? "input-left"
                  : ""
              }
              aria-label="Price input"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default PriceSlider;
