"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import report1 from "@/data/test_report_1.json"
import report2 from "@/data/test_report_2.json"
import report3 from "@/data/test_report_3.json"

const reports = {
  "Test Report 1": report1.test_report,
  "Test Report 2": report2.test_report,
  "Test Report 3": report3.test_report,
}

export function TestReports() {
  const [selectedReport, setSelectedReport] = useState("Test Report 1")

  const renderReport = (report) => {
    if (!report) return null

    return report.map((panel, panelIndex) => (
      <div key={panelIndex} className="mb-4">
        <h3 className="font-bold text-lg mb-2">{panel.panel_name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {panel.tests.map((test, testIndex) => (
            <Card key={testIndex}>
              <CardHeader>
                <CardTitle className="text-sm">{test.test_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{test.result}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Test Reports</CardTitle>
            <CardDescription>Medical report results</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="gap-1">
                {selectedReport}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.keys(reports).map((reportName) => (
                <DropdownMenuItem key={reportName} onClick={() => setSelectedReport(reportName)} className="font-semibold text-base cursor-pointer hover:bg-accent">
                  {reportName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>{renderReport(reports[selectedReport])}</CardContent>
    </Card>
  )
}