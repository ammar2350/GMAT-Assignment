import Profile from "./components/profile";
import Map from "./components/map";
import { io } from "socket.io-client";
import react, { useEffect, useState } from 'react';
import Gyroscope from "./components/gyroscope";
import Plot1data from "./components/plot1data";
import MyButton from "./components/myButton";

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

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
  
    const intervalId = setInterval(() => {
      socket.on("message", (mess) => {
        const parts = mess.split(',');
  
        if (parts.length === 10 && mess.endsWith(';')) {
          const team_id = parts[0];
          const clock = parts[1];
          const yaw = parseFloat(parts[2]);
          const pitch = parseFloat(parts[3]);
          const roll = parseFloat(parts[4]);
          const gps_latitude = parts[5];
          const gps_longitude = parts[6];
          const voltage = parseFloat(parts[7]);
          const pressure = parseFloat(parts[8]);
          const altitude = parseFloat(parts[9].slice(0, -1));;
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
  
          console.log("Team_ID:", team_id);
          console.log("Clock:", clock);
          console.log("Yaw:", yaw);
          console.log("Pitch:", pitch);
          console.log("Roll:", roll);
          console.log("GPS_Latitude:", gps_latitude);
          console.log("GPS_Longitude:", gps_longitude);
          console.log("Voltage:", voltage);
          console.log("Pressure:", pressure);
          console.log("Altitude:", altitude);
        }
      });
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

  return (
    <body>
      <div class="grid gap-4 p-4 flex h-screen" >
        <section class="flex justify-between">
          <Profile nama="Muflikhul Ammar" nim="22/503386/PA/21630" />
          <MyButton />
        </section>
        <section className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/6.5] p-4 rounded-lg">
            <p class="font-bold">GPS</p>
              <Map
                className="w-full rounded-lg"
                latitude={gpsLatitude || 0}
                longitude={gpsLongitude || 0}
              />
          </div>
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/6.5] p-4 rounded-lg">
            <p class="font-bold">GYROSCOPE</p>
            <Gyroscope data={graphData}/>
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-3 items-center md:text-left">
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/8] p-4 rounded-lg">
            <p class="font-bold">VOLTAGE</p>
            <Plot1data title ="VOLTAGE" data1={graphData1.clock} data2={graphData1.voltage} yaxis='Voltage'/>
          </div>
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/8] p-4 rounded-lg">
            <p class="font-bold">PRESSURE</p>
            <Plot1data title ="PRESSURE" data1={graphData1.clock} data2={graphData1.pressure} yaxis='Pressure'/>
          </div>
          <div class="bg-[#ADC2A9] hover:bg-[#99A799] aspect-[16/8] p-4 rounded-lg">
            <p class="font-bold">ALTITUDE</p>
            <Plot1data title ="ALTITUDE" data1={graphData1.clock} data2={graphData1.altitude} yaxis='Altitude'/>
          </div>
        </section>
      </div>
    </body>
  );
}

export default App;
