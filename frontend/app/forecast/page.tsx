import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Forecast } from "@/lib/data"
import { httpClient } from "@/lib/http-client"




export default async function Page() {
  const data = await (await httpClient.get<Forecast[]>("/weatherforecast")).data
  if (data == null) return <span>No forecast</span>
  return (
    <>
      <h3 className="text-black ">Weaterforecasts</h3>
      <div className="flex flex-row flex-wrap">
        {data.map((forecast, index) =>
          <Card key={index} className="basis-1 p-2 m-2 bg-slate-600 rounded-md text-white basis-1/4 ">
            <CardHeader>
              <h3>{forecast.summary}</h3>
            </CardHeader>
            <CardContent>
              {forecast.temperatureC}°C / {forecast.temperatureF}°F
            </CardContent>
            <CardFooter>
              {forecast.date}
            </CardFooter>
          </Card>)}
      </div>
    </>
  )
}