import Map from "./components/map";
import { io } from "socket.io-client";
import react, { useEffect, useState } from "react";
import Gyroscope from "./components/gyroscope";
import Plot1data from "./components/plot1data";

function App() {
  // const [message, setMessage] = useState(null);
  const [gpsLatitude, setGpsLatitude] = useState(null);
  const [gpsLongitude, setGpsLongitude] = useState(null);
  const [graphData, setGraphData] = useState({
    clock: [],
    yaw: [],
    pitch: [],
    roll: [],
  });
  const [graphData1, setGraphData1] = useState({
    voltage: [],
    pressure: [],
    altitude: [],
    clock: [],
  });
  const [idTeam, setIdTeam] = useState(null);

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    const intervalId = setInterval(() => {
      socket.on("message", (mess) => {
        const parts = mess.split(",");

        if (parts.length === 10 && mess.endsWith(";")) {
          const team_id = parts[0];
          const clock = parts[1];
          const yaw = parseFloat(parts[2]);
          const pitch = parseFloat(parts[3]);
          const roll = parseFloat(parts[4]);
          const gps_latitude = parts[5];
          const gps_longitude = parts[6];
          const voltage = parseFloat(parts[7]);
          const pressure = parseFloat(parts[8]);
          const altitude = parseFloat(parts[9].slice(0, -1));
          setIdTeam(team_id);
          setGpsLatitude(gps_latitude);
          setGpsLongitude(gps_longitude);
          setGraphData((prevData) => {
            const updatedClock = [...prevData.clock, clock].slice(-1000);
            const updatedYaw = [...prevData.yaw, yaw].slice(-1000);
            const updatedPitch = [...prevData.pitch, pitch].slice(-1000);
            const updatedRoll = [...prevData.roll, roll].slice(-1000);
            return {
              clock: updatedClock,
              yaw: updatedYaw,
              pitch: updatedPitch,
              roll: updatedRoll,
            };
          });
          setGraphData1((prevData) => {
            const updatedVoltage = [...prevData.voltage, voltage].slice(-1000);
            const updatedPressure = [...prevData.pressure, pressure].slice(-1000);
            const updatedAltitude = [...prevData.altitude, altitude].slice(-1000);
            const updatedClock = [...prevData.clock, clock].slice(-1000);
            return {
              voltage: updatedVoltage,
              pressure: updatedPressure,
              altitude: updatedAltitude,
              clock: updatedClock,
            };
          });
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <body>
      <div class="grid flex h-screen">
        <nav class="h-17 bg-[#ADC2A9] hover:bg-[#99A799] p-4 shadow-md shadow-slate-600">
          <div class="mx-auto flex justify-between items-center">
          <a href="" class="text-2xl font-bold text-white flex items-center">
            <img src="logo.png" alt="Logo" class="h-10 w-auto" />
            <span class="ml-2">GADJAH MADA AEROSPACE TEAM</span>
        </a>
              <ul class="flex space-x-4">
                  <span class="text-xl text-white font-semibold">ID Team: {idTeam}</span>
              </ul>
          </div>
        </nav>
        <div className="h-full grid gap-4 lg:grid-cols-2 p-3">
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/6.5] p-4 rounded-lg shadow-md shadow-slate-600">
            <p class="font-bold">GPS</p>
            <Map
              className="w-full rounded-lg"
              latitude={gpsLatitude || 0}
              longitude={gpsLongitude || 0}
            />
          </div>
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/6.5] p-4 rounded-lg shadow-md shadow-slate-600">
            <p class="font-bold">GYROSCOPE</p>
            <Gyroscope data={graphData} />
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3 p-3">
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/8] p-4 rounded-lg shadow-md shadow-slate-600">
            <p class="font-bold">VOLTAGE</p>
            <Plot1data
              title="VOLTAGE"
              data1={graphData1.clock}
              data2={graphData1.voltage}
              yaxis="Voltage"
            />
          </div>
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/8] p-4 rounded-lg shadow-md shadow-slate-600">
            <p class="font-bold">PRESSURE</p>
            <Plot1data
              title="PRESSURE"
              data1={graphData1.clock}
              data2={graphData1.pressure}
              yaxis="Pressure"
            />
          </div>
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/8] p-4 rounded-lg shadow-md shadow-slate-600">
            <p class="font-bold">ALTITUDE</p>
            <Plot1data
              title="ALTITUDE"
              data1={graphData1.clock}
              data2={graphData1.altitude}
              yaxis="Altitude"
            />
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
