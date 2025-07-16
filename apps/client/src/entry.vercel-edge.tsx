
import {
  createQwikCity,
  type PlatformVercel,
} from "@builder.io/qwik-city/middleware/vercel-edge";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

declare global {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
interface RequestEvent extends PlatformVercel {}
/* eslint-enable @typescript-eslint/no-empty-object-type */


}

export default createQwikCity({ render, qwikCityPlan });
