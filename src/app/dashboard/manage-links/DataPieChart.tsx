import React from 'react'
import { PieChart } from '@mantine/charts'

export default function DataPieChart(data : any) {
  const colors = ["#BCE7FD", "#C492B1", "#AF3B6E", "#21FA90"];

  return (
    <PieChart data={data}/>
  )
}
