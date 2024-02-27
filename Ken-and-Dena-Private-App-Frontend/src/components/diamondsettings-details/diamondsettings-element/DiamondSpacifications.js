import React from "react";
import caratImage from "../../../images/carat-Diamond.png";
import cutImage from "../../../images/cut-Diamond.png";
import SwiperColor from "./SwiperColor";
import SwiperClarity from "./SwiperClarity";
import SwiperCarat from "./SwiperCarat";


function DiamondSpacifications() {
  return (
    <div className="gf_diamond_filter_spacification">
      {/* carat */}
      <div className="gf_diamond_filter">
        <div className="gf-tool-container">
          <div className="gf_diamond_filter-twoColumn">
            <div className="gf_diamond_filter-imgBlock">
              <SwiperCarat />
              {/* <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/carat-Diamond.png"
                }  alt=""></img> */}
            </div>
            <div className="gf_diamond_filter-info">
              <h3 className="gf_diamond_filter-heading">CARAT</h3>
              <p className="gf_diamond_filter-subHeading">
              The term carat weight and size are often confused and used interchangeably. The carat number that accompanies a diamond refers to the weight, not its size. So when comparing diamonds with different carat weights, the cut can have a large impact. A high carat weight diamond with a Poor cut may look smaller than a diamond with a lesser carat weight and a Very Good cut.
              </p>
              <a className="gf_mined-learnMore" href="https://shop.kenanddanadesign.com/pages/diamond-size-chart">
                LEARN MORE
              </a>
              <i className="gf_mined-learnMore-icon fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
       {/* cut */}
       <div className="gf_diamond_filter_no-bg">
        <div className="gf-tool-container">
          <div className="gf_diamond_filter_no-bg-twoColumn">
            <div className="gf_diamond_filter_no-bg-imgBlock">
              <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/cut-Diamond.png"
                } alt=""></img>
            </div>
            <div className="gf_diamond_filter_no-bg-info">
              <h3 className="gf_diamond_filter_no-bg-heading">CUT</h3>
              <p className="gf_diamond_filter_no-bg-subHeading">
              The GIA grades diamond cut on a scale of Excellent, Very Good, Good, Fair, and Poor. It is the most complex of the 4Cs to analyze because it is a subjective quality by nature and takes into account many other features of the diamond to conclude an overall grading. Note that only round diamonds get a Cut rating, because the theories behind light refraction cannot reliably predict light return of fancy shape diamonds (ie. oval, pear, marquise, emerald, radiant, etc) since every stone has a different length and width proportion.
              </p>
              <a className="gf_mined-learnMore" href="https://shop.kenanddanadesign.com/pages/diamond-shapes-and-cuts">
                LEARN MORE
              </a>
              <i className="gf_mined-learnMore-icon fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      {/* colors */}
      <div className="gf_diamond_filter gf_diamond_filter--fullwidth">
        <div className="gf-tool-container">
          <div className="gf_diamond_filter-twoColumn">          
            <div className="gf_diamond_filter-info">
              <h3 className="gf_diamond_filter-heading">Color</h3>
              <p className="gf_diamond_filter-subHeading">
              Hearing the term color can be a bit confusing when concerning diamonds, because the color grade is actually measuring the absence of color in a diamond. The GIA grades diamond color in terms of how white or colorless a diamond is on a scale from D to Z. The color grading of D is the highest grade and considered completely colorless. Finding natural diamonds with this grade is extremely rare. The color grading of Z indicates a diamond with noticeable yellow or brown tint.
              </p>
              <a className="gf_mined-learnMore" href="https://shop.kenanddanadesign.com/pages/diamond-color-guide">
                LEARN MORE
              </a>
              <i className="gf_mined-learnMore-icon fa fa-chevron-right"></i>
            </div>
            <div className="gf_diamond_filter-twoColumn__slider">
                    <SwiperColor />
            </div>
          </div>
        </div>
      </div>
{/* clarity */}
      <div className="gf_diamond_filter_no-bg gf_diamond_filter_no-bg--rightimage">
        <div className="gf-tool-container">
          <div className="gf_diamond_filter_no-bg-twoColumn">
            <div className="gf_diamond_filter_no-bg-imgBlock">
              <div className="gf_diamond_filter_clarity_slider"><SwiperClarity /></div>            
            </div>
            <div className="gf_diamond_filter_no-bg-info">
              <h3 className="gf_diamond_filter_no-bg-heading">Clarity</h3>
              <p className="gf_diamond_filter_no-bg-subHeading">
              Clarity is the assessment of the imperfections on the surface and inside the diamond. Many people get wrapped up in this grading not realizing how minute each grading level is. Most diamonds have some technical imperfection when studied at 10x magnification, and less than 0.5% of all investment grade diamonds graded by the GIA receive a Flawless grade. The most important consideration is whether the diamond is eye-clean. Consider this, you can’t see the difference between Flawless and lower-grade diamonds like VS2 with the naked eye, but the price difference in natural diamonds between these two grades is significant.
              </p>
              <a className="gf_mined-learnMore" href="https://shop.kenanddanadesign.com/pages/diamond-clarity-guide">
                LEARN MORE
              </a>
              <i className="gf_mined-learnMore-icon fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default DiamondSpacifications;
