import PandaBridge from "pandasuite-bridge";
import { parse } from "rss-to-json";

import "./index.css";

let properties = null;
let markers = null;

async function parseRSS() {
  const rss = await parse(properties.url);

  const queryable = {
    rss,
  };

  PandaBridge.send("rss", [queryable]);
  PandaBridge.send(PandaBridge.UPDATED, {
    queryable,
  });
}

PandaBridge.init(() => {
  PandaBridge.onLoad((pandaData) => {
    properties = pandaData.properties;
    markers = pandaData.markers;

    if (properties.autoStart) {
      if (document.readyState === "complete") {
        parseRSS();
      } else {
        document.addEventListener("DOMContentLoaded", parseRSS, false);
      }
    }
  });

  PandaBridge.onUpdate((pandaData) => {
    properties = pandaData.properties;
    markers = pandaData.markers;
  });

  /* Markers */

  PandaBridge.getSnapshotData(() => null);

  PandaBridge.setSnapshotData((pandaData) => {
    // pandaData.data.id
  });

  /* Actions */

  PandaBridge.listen("refresh", (args) => {
    parseRSS();
  });
});
