import soc from "@/assets/services/soc.webp";
import edr from "@/assets/services/edr.webp";
import xdr from "@/assets/services/xdr.webp";
import cloud from "@/assets/services/cloud.webp";
import iam from "@/assets/services/iam.webp";

import socFallback from "@/assets/services/soc.jpg";
import edrFallback from "@/assets/services/edr.jpg";
import xdrFallback from "@/assets/services/xdr.jpg";
import cloudFallback from "@/assets/services/cloud.jpg";
import iamFallback from "@/assets/services/iam.jpg";

export const categoryImages: Record<string, string> = { soc, edr, xdr, cloud, iam };
export const categoryImagesFallback: Record<string, string> = {
  soc: socFallback, edr: edrFallback, xdr: xdrFallback, cloud: cloudFallback, iam: iamFallback,
};

export function imageForCategory(category: string): string {
  const c = category.trim().toLowerCase();
  if (c.startsWith("soc")) return soc;
  if (c.startsWith("edr") || c.includes("endpoint")) return edr;
  if (c.startsWith("xdr")) return xdr;
  if (c.startsWith("cloud")) return cloud;
  return iam;
}

export function imageFallbackForCategory(category: string): string {
  const c = category.trim().toLowerCase();
  if (c.startsWith("soc")) return socFallback;
  if (c.startsWith("edr") || c.includes("endpoint")) return edrFallback;
  if (c.startsWith("xdr")) return xdrFallback;
  if (c.startsWith("cloud")) return cloudFallback;
  return iamFallback;
}
