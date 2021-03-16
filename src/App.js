import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


function getMathData(data) {

  let avgPv = 0
  let stddevPv = 0
  let avgUv = 0
  let stddevUv = 0

  data.forEach(el => {
    avgPv += el.pv
    avgUv += el.uv
  });

  avgPv = Math.floor(avgPv / data.length)
  avgUv = Math.floor(avgUv / data.length)


  data.forEach(el => {
    stddevPv += Math.pow((el.pv - avgPv), 2)
    stddevUv += Math.pow((el.pv - avgUv), 2)
  })

  stddevPv = Math.floor(Math.sqrt(stddevPv / data.length - 1))
  stddevUv = Math.floor(Math.sqrt(stddevUv / data.length - 1))

  return [avgPv, stddevPv, avgUv, stddevUv]

}


function getGradient(avg, stddev, id, scale, color) {

  let y1 = Math.ceil((avg - stddev) / scale * 100) + "%"
  let y2 = Math.ceil((avg + stddev) / scale * 100) + "%"

  return (
    <linearGradient
      id={id}
      x1="0%"
      y1={y1}
      x2="0%"
      y2={y2}
      x3="0%"
      y3="100%"
    >
      <stop offset="0%" stopColor="red" />
      <stop offset="19%" stopColor={color} />
      <stop offset="68%" stopColor={color} />
      <stop offset="100%" stopColor="red" />
    </linearGradient>
  )
}


const App = () => {

  const [avgPv] = useState(getMathData(data)[0])
  const [stddevPv] = useState(getMathData(data)[1])
  const [avgUv] = useState(getMathData(data)[2])
  const [stddevUv] = useState(getMathData(data)[3])


  return (
    <div>
      <LineChart width={500} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <defs>
          {getGradient(avgPv, stddevPv, "userGradientPv", 10000, '#8884d8')}
        </defs>
        <Line
          type="monotone"
          dataKey="pv"
          stroke="url(#userGradientPv)"
          strokeWidth={3}
          dot={false}
          activeDot={false}
        />

        <defs>
          {getGradient(avgUv, stddevUv, "userGradientUv", 10000, "#82ca9d")}
        </defs>
        <Line
          type="monotone"
          dataKey="uv"
          stroke="url(#userGradientUv)"
          strokeWidth={3}
          dot={false}
          activeDot={false}
        />
        <Tooltip />
      </LineChart>
    </div>
  )


};

export default App
