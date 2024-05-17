/* eslint-disable array-callback-return */
import service from "undefined-service-web";
import Base from "./Base";
import color from "./color";
import { useNavigate, useParams } from "react-router-dom";

const App = {
  Dom: {
    Navigate: useNavigate,
    Params: useParams,

  },

  service,
  ...Base,
  color,

};
export default App;
