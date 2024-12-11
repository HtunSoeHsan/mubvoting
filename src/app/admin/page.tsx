import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="m-4">
      <div className="flex gap-3 flex-wrap">
        <Card>
          <CardHeader>
            <CardTitle>Login Total</CardTitle>
            <CardDescription>
             <p className="text-center text-4xl ">49</p>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Vote</CardTitle>
            <CardDescription>
            <p className="text-center text-4xl ">120</p>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Remaning Vote</CardTitle>
            <CardDescription>
            <p className="text-center text-4xl ">23</p>
          
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Selection</CardTitle>
            <CardDescription>
            <p className="text-center text-4xl ">12</p>
          
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      {/**Selection table */}
      
      <table className="rounded-lg table-auto  w-full m-2">
  <thead >
    <tr>
      <th className="px-4 py-2 text-left">Name</th>
      <th className="px-4 py-2 text-left">Section</th>
      <th className="px-4 py-2 text-left">Vote</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="px-4 py-2  text-left">L take</td>
      <td className="px-4 py-2  text-left">Malcolm Lockyer</td>
      <td className="px-4 py-2  text-left">1961</td>
      <td className="flex ">
      <button className="flex content-center bg-green-700 font-bold text-xl m-2 px-4 rounded-md">+</button>    
      <button className="flex content-center bg-red-700 font-bold text-xl m-2 px-4 rounded-md">-</button>    
      </td>
    </tr>
    <tr >
      <td className="px-4 py-2  text-left">Witchy Woman</td>
      <td className="px-4 py-2  text-left">The Eagles</td>
      <td className="px-4 py-2  text-left">1972</td>
      <td className="flex  ">
      <button className="flex content-center bg-green-700 font-bold text-xl m-2 px-4 rounded-md">+</button>    
      <button className="flex content-center bg-red-700 font-bold text-xl m-2 px-4 rounded-md">-</button>    
      </td>
    </tr>
   
  </tbody>
</table>

    </div>
  );
}
