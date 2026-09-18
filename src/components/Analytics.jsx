import { useEffect } from "react";
import { initAnalytics } from "../config/analytics";

export default function Analytics() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
