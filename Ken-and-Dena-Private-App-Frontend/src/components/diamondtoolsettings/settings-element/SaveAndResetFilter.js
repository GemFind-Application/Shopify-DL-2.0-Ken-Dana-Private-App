import { elementAcceptingRef } from "@mui/utils";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveAndResetFilter = (props) => {
  // console.log('props');
  // console.log(props);
  const location = useLocation();
  var productUrl = location.pathname;
  var url = productUrl.substring(productUrl.lastIndexOf("/") + 1);

  if (url === "") {
    var getpart = productUrl.substring(productUrl.lastIndexOf("diamondtype"));
    var getpartUrl = getpart.split("/");
    var part = getpartUrl[1];
 
  } else {
    var part = url;

  }

  const [openResetModal, setOpenResetModal] = React.useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const [loaded, setLoaded] = useState(false);
  const [getTab, setTab] = useState("");
  const navigate = useNavigate();
  const [getcomparecookies, setcomparecookies] = useCookies([
    "_wpsavedcompareproductcookie",
  ]);
  const [getCPDiamondTypecookie, setCPDiamondTypecookie] = useCookies([
    "compareProductDiamondTypeCookie",
  ]);

  const [skeletoncomparedata, setskeletoncomparedata] = useState(false);
  const [loadcomparedata, setloadcomparedata] = useState(false);
  const [getfinalcomparedata, setfinalcomparedata] = useState([]);
  const [getlabsetting, setlabsetting] = useState(props.getLabNavigation);
  const [getminedsetting, setminedsetting] = useState(props.getMinedNavigation);
  const [getfcsetting, setfcsetting] = useState(props.getFancyNavigation);
  const [getcomparesetting, setcomparesetting] = useState(
    props.getCompareNavigation
  );


  const onChange = (e) => {
    e.preventDefault();
    props.callBack(false);
    //console.log(getTab);
    // console.log(props);
    if (getTab === "mined" || getTab === "") {
      setCookie("_wpsavediamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
    if (getTab === "labgrown") {
      setCookie("_wpsavedlabgowndiamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
    if (getTab === "fancycolor") {
      setCookie("_wpsavedfancydiamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
  };

  const setOpenConfirm = (e) => {
    e.preventDefault();
    props.callBack(false);
    setLoaded(true);

    //console.log(getTab);
    removeCookie("shopify_diamondbackvalue", { path: "/" });
    removeCookie("_wpsaveringfiltercookie", { path: "/" });
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_shopify_diamondsetting", { path: "/" });
    removeCookie("shopify_ringbackvalue", { path: "/" });
    removeCookie("_shopify_ringsetting", { path: "/" });
    //if (getTab === "mined") {
    //console.log("mined selected");
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    //}
    // if (getTab === "labgrown") {
    removeCookie("_wpsavedlabgowndiamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    //}
    //if (getTab === "fancycolor") {
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_wpsavedfancydiamondfiltercookie", { path: "/" });
    removeCookie("compareproductcookie", { path: "/" });
    removeCookie("compareProductDiamondTypeCookie", { path: "/" });
    removeCookie("finalcompareproductcookie", { path: "/" });

    //}

    setTimeout(() => {
      navigate(`${process.env.PUBLIC_URL}`);
      window.location.reload();
    }, 3000);
  };

  const handleresetpopup = (e) => {
    e.preventDefault();
    setLoaded(false);
    setOpenResetModal(true);
  };

  //console.log(props);
  const handletab = (e) => {
    console.log("coming inside handletab");
    //e.preventDefault();
    if (window.compareproduct.length < 2 && e.target.id === "compare") {
      toast.error("Please select minimum 2 diamonds to compare.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // console.log(e.target.id);

      setCookie("compareproductcookie", JSON.stringify(window.compareproduct), {
        path: "/",
        maxAge: 604800,
      });

      setCookie(
        "compareProductDiamondTypeCookie",
        JSON.stringify(window.compareProductDiamondType),
        {
          path: "/",
          maxAge: 604800,
        }
      );

      if (e.target.id === "compare") {
        setTab(e.target.id);
        // console.log("loaded");
        // console.log(loaded);
        setLoaded(true);
        // console.log(JSON.stringify(window.compareproduct));
        if (window.compareproduct !== "") {
          setCookie(
            "_wpsavedcompareproductcookie",
            JSON.stringify(window.compareproduct),
            { path: "/", maxAge: 604800 }
          );
        }

        if (window.compareproduct) {
          var finalCompareData = [];
          var compareProductdata = "";
          var compareProductdata1 = "";
          var compareProductdata2 = "";

          var cookielength = window.compareproduct.length;
          const subFetch = async (element) => {
            // console.log(element + "   element");
            // console.log(window.compareProductDiamondType);
            const diamondTypeInfo = window.compareProductDiamondType.find(
              (item) => item.diamondId === element
            );
            // console.log(diamondTypeInfo);

            if (diamondTypeInfo && diamondTypeInfo.diamondType) {
              var diamondType = diamondTypeInfo.diamondType;
            }

            const res = await fetch(
              `https://kenanddana-dl.gfindex.com/api/getDiamondDetailsApi/` +
                element +
                "/" +
                diamondType +
                "/" +
                window.initData.data[0].shop +
                "/" +
                false
            );

            const compareProductdata = await res.json();         

            return compareProductdata;
          };
         
          var i = 0;
          window.compareproduct.forEach((element) => {
            subFetch(element).then((compareProductdata) => {
              finalCompareData.push({
                shape: compareProductdata.shape,
                diamondId: compareProductdata.diamondId,
                caratWeight: compareProductdata.caratWeight,
                table: compareProductdata.table,
                color: compareProductdata.color,
                polish: compareProductdata.polish,
                symmetry: compareProductdata.symmetry,
                clarity: compareProductdata.clarity,
                fluorescence: compareProductdata.fluorescence,
                measurement: compareProductdata.measurement,
                certificate: compareProductdata.certificate,
                cut: compareProductdata.cut,
                mainHeader: compareProductdata.mainHeader,
                defaultDiamondImage: compareProductdata.defaultDiamondImage,
                fltPrice: compareProductdata.fltPrice,
                isLabCreated: compareProductdata.isLabCreated,
                isfancy: compareProductdata.fancyColorIntensity,
              });
              i++;
              if (i === window.compareproduct.length) {
                setTimeout(() => {
                  setLoaded(false);
                  navigate(`${process.env.PUBLIC_URL}/compare`);
                  window.location.reload();
                }, 6000);
              }
            });
          });

          setfinalcomparedata(finalCompareData);
          // console.log(finalCompareData.length);
        }
        setTimeout(() => {
          setCookie("finalcompareproductcookie", finalCompareData, {
            path: "/",
            maxAge: 604800,
          });
        }, 5000);

    
      }

      if (e.target.id === "mined") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}`);
        //window.location.reload();
      }
      if (e.target.id === "labgrown") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}/navlabgrown`);
        //window.location.reload();
      }
      if (e.target.id === "fancycolor") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}/navfancycolored`);
        //window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (loaded === false) {
      // console.log(part);

      if (part === "navlabgrown") {
        setTab("labgrown");
        setLoaded(true);
      }
      if (part === "navfancycolored") {
        setTab("fancycolor");
        setLoaded(true);
      }
      if (part === "compare") {
        setTab("compare");
        //setLoaded(true);
      }
      if (window.compareproduct.length < 1 && part === "compare") {
        window.location.href = "diamondtools";
        navigate(`diamontools`);
        navigate(`${process.env.PUBLIC_URL}`);
        window.location.reload();
      }


    }
   
  }, [getTab, getminedsetting, getlabsetting, getfcsetting, getcomparesetting]);

  return (
    <>
      <div className="gf-save-reset-filter mobile_gf_filter">
        <ul className="gf-navigation_right ">
          <li>
            <a href="javascript:;" onClick={onChange} className="gf-save-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.75 13.9393L15.9697 10.7197L17.0303 11.7803L12 16.8107L6.96967 11.7803L8.03033 10.7197L11.25 13.9393L11.25 4.5L12.75 4.5L12.75 13.9393Z"
                  fill="#080341"
                />
                <path d="M18 18L18 19.5L6 19.5L6 18L18 18Z" fill="#080341" />
              </svg>
              Save Search
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              onClick={handleresetpopup}
              className="gf-reset-icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width="18"
                height="18"
                viewBox="0 0 512 512"
                data-name="Layer 1"
                id="Layer_1"
              >
                <path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z" />
              </svg>
              Reset
            </a>

            <Modal
              open={openResetModal}
              onClose={() => setOpenResetModal(false)}
              center
              classNames={{
                overlay: "popup_Overlay",
                modal: "popup__reset",
              }}
            >
              <LoadingOverlay className="_gfloading_overlay_wrapper">
                <Loader fullPage loading={loaded} />
              </LoadingOverlay>
              <p>Are you sure you want to reset data?</p>
              <div className="reset_popup-btn">
                <button
                  className="button gf-btn btn_left"
                  onClick={setOpenConfirm}
                >
                  OK
                </button>
                <button
                  className="button gf-btn"
                  onClick={() => setOpenResetModal(false)}
                >
                  CANCEL
                </button>
              </div>
            </Modal>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SaveAndResetFilter;
