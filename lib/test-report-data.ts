import report1 from "@/data/test_report_1.json"
import report2 from "@/data/test_report_2.json"
import report3 from "@/data/test_report_3.json"

const extractValue = (report, panelName, testName) => {
  const panel = report.test_report.find(p => p.panel_name === panelName);
  if (panel) {
    const test = panel.tests.find(t => t.test_name === testName);
    if (test) {
      return test.result;
    }
  }
  return null;
};

export const getPerformanceMetricsData = () => {
  const cholesterolDataRaw = [];
  const vo2MaxData = [];

  const reports = [
    { date: "2025-01-22", report: report1 },
    { date: "2025-04-09", report: report2 },
    { date: "2025-07-02", report: report3 },
  ];

  reports.forEach(item => {
    const date = item.date;
    const report = item.report;

    // Cholesterol
    let totalCholesterol = extractValue(report, "General Health Assessment", "Total Cholesterol");
    if (!totalCholesterol) {
      totalCholesterol = extractValue(report, "General Health Assessment", "Lipid Panel");
      if (totalCholesterol) {
        const match = totalCholesterol.match(/Total Cholesterol: (\d+) mg\/dL/);
        if (match) {
          totalCholesterol = match[1];
        }
      }
    }
    
    let ldlCholesterol = extractValue(report, "General Health Assessment", "LDL Cholesterol");
    if (!ldlCholesterol) {
      ldlCholesterol = extractValue(report, "General Health Assessment", "Lipid Panel");
      if (ldlCholesterol) {
        const match = ldlCholesterol.match(/LDL: (\d+) mg\/dL/);
        if (match) {
          ldlCholesterol = match[1];
        }
      }
    }
    
    let hdlCholesterol = extractValue(report, "General Health Assessment", "HDL Cholesterol");
    if (!hdlCholesterol) {
      hdlCholesterol = extractValue(report, "General Health Assessment", "Lipid Panel");
      if (hdlCholesterol) {
        const match = hdlCholesterol.match(/HDL: (\d+) mg\/dL/);
        if (match) {
          hdlCholesterol = match[1];
        }
      }
    }

    cholesterolDataRaw.push({
      date,
      "Total Cholesterol": totalCholesterol ? parseFloat(totalCholesterol.replace(" mg/dL", "")) : null,
      "LDL Cholesterol": ldlCholesterol ? parseFloat(ldlCholesterol.replace(" mg/dL", "")) : null,
      "HDL Cholesterol": hdlCholesterol ? parseFloat(hdlCholesterol.replace(" mg/dL", "")) : null,
    });

    // VO2 Max
    let vo2Max = extractValue(report, "Overall health and fitness", "VO2 Max");
    if (vo2Max) {
      vo2Max = parseFloat(vo2Max.replace(" ml/kg/min", ""));
      vo2MaxData.push({ date, value: vo2Max });
    }
  });

  vo2MaxData.push({ date: "2025-09-15", value: 40 });
  vo2MaxData.push({ date: "2025-11-20", value: 42 });

  return {
    cholesterolData: cholesterolDataRaw,
    vo2MaxData,
  };
};
