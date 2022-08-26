import "./style.css";

const searchBtn = document.querySelector("[data-btn]");
const searchInput = document.querySelector("[data-input]");
let mark = L.marker([1, 1]);
const map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);
const getIp = async (location = "") => {
  const ipRegex =
    /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/;

  const respond = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_iixwNe0Fi0OMwlAguaaK4LkMAG5Se&${
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
  region = "Not found",
  latLng
) => {
  document.querySelector("[data-ip]").innerText = ip;
  document.querySelector("[data-location]").innerText = region;
  document.querySelector("[data-timezone]").innerText = timezone;
  document.querySelector("[data-ips]").innerText = isp;
  mark.remove();
  map.setView(latLng, 12);
  mark = L.marker(latLng);
  mark.addTo(map);
};
const getLocation = async () => {
  const locationData = await getIp(searchInput?.value);
  const {
    ip,
    isp,
    location: { timezone, region, lat, lng },
  } = locationData;
  const latLng = [lat, lng];
  displayLocation(ip, isp, timezone, region, latLng);
};
getLocation();
searchBtn.addEventListener("click", getLocation);
