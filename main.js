import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 3,
  }),
});

const searchBtn = document.querySelector("[data-btn]");
const searchInput = document.querySelector("[data-input]");
const getIp = async (location = "") => {
  const ipRegex =
    /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/;

  const respond = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_iixwNe0Fi0OMwlAguaaK4LkMAG5Se&${
      ipRegex.test(location) ? " ipAddress=" : "domain="
    }${location}`
  );
  const address = await respond.json();
  return address;
};
const displayLocation = (
  ip = "Not found",
  isp = "Not found",
  timezone = "Not found",
  region = "Not found"
) => {
  document.querySelector("[data-ip]").innerText = ip;
  document.querySelector("[data-location]").innerText = region;
  document.querySelector("[data-timezone]").innerText = timezone;
  document.querySelector("[data-ips]").innerText = isp;
};
const getLocation = async () => {
  const locationData = await getIp(searchInput?.value);
  const {
    ip,
    isp,
    location: { timezone, region },
  } = locationData;
  displayLocation(ip, isp, timezone, region);
};
getLocation();
searchBtn.addEventListener("click", getLocation);
