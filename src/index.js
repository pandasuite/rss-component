import PandaBridge from "pandasuite-bridge";
import { parse } from "rss-to-json";

import "./index.css";

let properties = null;
let markers = null;

async function myInit() {
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

    if (document.readyState === "complete") {
      myInit();
    } else {
      document.addEventListener("DOMContentLoaded", myInit, false);
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

  PandaBridge.listen("changeColor", (args) => {});

  PandaBridge.synchronize("synchroImages", (percent) => {});
});
