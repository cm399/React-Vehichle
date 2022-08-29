import { Button, Stack, Typography } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById } from "../../mock";
import { getCurrencyUSD } from "../../utils";
import "./index.scss";

const Builder: FC = () => {

  /**
   * Declarations
   */
  const { id = '' } = useParams(),
    navigate = useNavigate(),
    [carDetails, setDetails] = useState<any>(),
    [selectedPaint, setPaint] = useState<string>(""),
    [selectedWheel, setWheel] = useState<string>(""),
    [hasContinued, setContinue] = useState<boolean>(false);


  /**
   * Hooks
   */
  useEffect(() => {
    const result = getCarById(id);
    if (result) {
      setDetails(result);
      setPaint(result?.defaultPaint);
      setWheel(result?.defaultWheel);
    }
    else navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /**
   * Helper functions
   */
  function handleSubmitAction() {
    if (!hasContinued) {
      setContinue(true)
    } else {
      toast.success(`Thank you for ordering a ${carDetails?.name}`);
      navigate("/");
    }
  }


  return (
    <div className="rv__bld__container">
      <div className="rv__bld__image_container">
        <div className="rv__bld__image_wrap">
          <img
            src={carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.imageURL}
            alt={carDetails?.paint?.[selectedPaint]?.label + '-' + carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.label}
          />
        </div>
      </div>
      <div className="rv__bld__configPnl_wrap">
        <div className="rv__bld__configPnl_head">
          <h2>{hasContinued && "Your "}{carDetails?.name}</h2>
          {!hasContinued && <Typography variant="body2" color="text.secondary">
            Base price <strong>{getCurrencyUSD(carDetails?.basePrice || 0)}</strong>
          </Typography>}
        </div>
        {!hasContinued ?
          <Fragment>
            <div className="rv__bld__configPnl_paintWrap">
              <Typography className="rv__bld__configPnl_sectionTitle" gutterBottom variant="h5" component="div">Paint</Typography>
              <Stack direction="row" justifyContent="center" spacing={2}>
                {
                  Object.keys(carDetails?.paint || {}).map((_pnt, _pI) => (
                    <div
                      key={_pnt + _pI}
                      onClick={() => setPaint(_pnt)}
                      className="rv__bld__configPnl_options_iconWrap"
                    >
                      <img
                        src={carDetails?.icons?.[_pnt]}
                        alt={carDetails?.paint?.[_pnt]?.label}
                        title={carDetails?.paint?.[_pnt]?.label}
                        className={`rv__bld__configPnl_options_icon${selectedPaint === _pnt ? ' selected' : ''}`}
                      />
                    </div>
                  ))
                }
              </Stack>
              <Typography variant="body2" color="text.secondary" className="rv__bld__configPnl_option_label">
                <strong>{carDetails?.paint?.[selectedPaint]?.label}&nbsp;</strong>
                {carDetails?.paint?.[selectedPaint]?.price !== 0 ? getCurrencyUSD(carDetails?.paint?.[selectedPaint]?.price) : "Included"}
              </Typography>
            </div>
            <div className="rv__bld__configPnl_wheelWrap">
              <Typography className="rv__bld__configPnl_sectionTitle" gutterBottom variant="h5" component="div">Wheels</Typography>
              <Stack direction="row" justifyContent="center" spacing={2}>
                {
                  Object.keys(carDetails?.paint?.[selectedPaint]?.wheels || {}).map((_whl, _wI) => (
                    <div
                      key={_whl + _wI}
                      onClick={() => setWheel(_whl)}
                      className="rv__bld__configPnl_options_iconWrap"
                    >
                      <img
                        src={carDetails?.icons?.[_whl]}
                        alt={carDetails?.paint?.[selectedPaint]?.[_whl]?.label}
                        title={carDetails?.paint?.[selectedPaint]?.[_whl]?.label}
                        className={`rv__bld__configPnl_options_icon${selectedWheel === _whl ? ' selected' : ''}`}
                      />
                    </div>
                  ))
                }
              </Stack>
              <Typography variant="body2" color="text.secondary" className="rv__bld__configPnl_option_label">
                <strong>{carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.label}&nbsp;</strong>
                {carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.price !== 0 ? getCurrencyUSD(carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.price) : "Included"}
              </Typography>
            </div>
          </Fragment>
          : <div className="rv__bld__configPnl_summaryWrap">
            <div className="rv__bld__configPnl_summaryItems">
              <div className="rv__bld__configPnl_summaryDetails">
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Base price</Typography>
                  <Typography variant="body2" color="text.secondary">{getCurrencyUSD(carDetails?.basePrice)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">{carDetails?.paint?.[selectedPaint]?.label}</Typography>
                  <Typography variant="body2" color="text.secondary">{getCurrencyUSD(carDetails?.paint?.[selectedPaint]?.price)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">{carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.label}</Typography>
                  <Typography variant="body2" color="text.secondary">{getCurrencyUSD(carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.price)}</Typography>
                </Stack>
              </div>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary"><strong>Payable Amount</strong></Typography>
                <Typography variant="body2" color="text.secondary"><strong>{getCurrencyUSD(carDetails?.basePrice + carDetails?.paint?.[selectedPaint]?.price + carDetails?.paint?.[selectedPaint]?.wheels?.[selectedWheel]?.price)}</strong></Typography>
              </Stack>
            </div>
          </div>
        }
        <div className="rv__bld__configPnl_submit">
          <Button variant="contained" size="small" onClick={handleSubmitAction}>
            {hasContinued ? "Order Now" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Builder;