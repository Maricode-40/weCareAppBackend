import { CorsOptions } from "cors";

const CorsOptions: CorsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default CorsOptions;
