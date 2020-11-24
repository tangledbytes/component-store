import React from "react";
import MesheryVisualizeComponent from "./components/visualize/MesheryVisualizeComponent";

export const App = ({
  GrafanaCustomCharts,
  updateLoadTestData,
  MesheryPerformanceComponent,
  grafana
}) => {
  return (
    <MesheryVisualizeComponent
      GrafanaCustomCharts={GrafanaCustomCharts}
      updateLoadTestData={updateLoadTestData}
      MesheryPerformanceComponent={MesheryPerformanceComponent}
      grafana={grafana}
    />
  );
};
