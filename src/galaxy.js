import { useState } from "react";

const BABYLON_URI = "https://babylon.astroempires.com/";

function openInNewTab(href) {
  console.log("opening:::", href);
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href: href,
  }).click();
  // window.open(href);
}

const getLinks = ({ galaxy, region }) => {
  const urls = [];
  for (let i = 0; i < 101; i++) {
    const rr = ("0" + region).slice(-2);
    const gg = ("0" + galaxy).slice(-2);
    const ii = ("0" + i).slice(-2);
    const loc = `B${gg}:${rr}:${ii}`;

    urls.push(BABYLON_URI + "map.aspx?" + loc);
  }
  return urls;
};

const Galaxy = () => {
  const [region, setRegion] = useState(0);
  const [galaxy, setGalaxy] = useState(0);

  const ready = region > 0 && galaxy > 0;

  const launch = () => {
    const lls = getLinks({ galaxy, region });
    console.log({ lls });
    lls.forEach((l) => {
      openInNewTab(l);
    });
  };
  return (
    <div>
      <h2>Select Galaxy</h2>
      <input
        type="number"
        min="0"
        max="100"
        value={galaxy}
        onChange={(v) => setGalaxy(parseInt(v.target.value))}
      />
      <h2>Select Region</h2>
      <input
        type="number"
        min="0"
        max="100"
        value={region}
        onChange={(v) => setRegion(parseInt(v.target.value))}
      />

      <hr />

      <h2>Current Galaxy: {galaxy}</h2>
      <h2>Current Region: {region}</h2>

      <br />
      <hr />
      {ready && <button onClick={launch}>activate</button>}
    </div>
  );
};

export default Galaxy;
