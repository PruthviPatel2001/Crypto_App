export const SET_TRADE_MODEL_VISIBILTY = "SET_TRADE_MODEL_VISIBILTY";

export const setTradeModelVisibiltySucess = (isVisible) => ({
  type: SET_TRADE_MODEL_VISIBILTY,
  payload: { isVisible },
});

export function setTradeModelVisibilty(isVisible) {
  return (dispatch) => {
    dispatch(setTradeModelVisibiltySucess(isVisible));
  };
}
