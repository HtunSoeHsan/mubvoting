import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const iconLog = '/logo.svg'; 
const irefresh = '/refresh.png'; 


export default function Page() {


  const King = [
    { id: 1, name: 'Thaw Bhonte Htet' },
    { id: 2, name: 'Okkar Thu' },
    { id: 3, name: 'Thein Yati Nwe' },
    { id: 4, name: 'Yoon Lae Lae Khaing' },
    { id: 5, name: 'Hnin Hnin Hsan' },
  ];
  const Queen = [
    { id: 1, name: 'Thaw Bhonte Htet' },
    { id: 2, name: 'Okkar Thu' },
    { id: 3, name: 'Thein Yati Nwe' },
    { id: 4, name: 'Yoon Lae Lae Khaing' },
    { id: 5, name: 'Hnin Hnin Hsan' },
  ];
  
  
  const irefresh = '/refresh.png'; 


  return (

    <>
  
    <div className="m-4 ">
    
      <div className="flex  gap-3 items-center justify-around ">
      <div className="px-2 flex flex-wrap gap-12 justify-center items-center w-full ">
        <Card className="border-[#176B87] border-4">
          <CardHeader className="px-14" >
            <CardTitle> 100</CardTitle>
            <CardDescription>
             Login
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-[#176B87] border-4">
          <CardHeader className="px-14">
            <CardTitle>120</CardTitle>
            <CardDescription>
            Vote Count
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-[#176B87] border-4">
          <CardHeader className="px-14">
            <CardTitle>12</CardTitle>
            <CardDescription>
            Participant
            </CardDescription>
          </CardHeader>
        </Card>
        </div>
          <Card className=" bg-[#32bbb2] flex-wrap flex items-center justify-end mx-24 max-h-[80px]">
            <CardHeader >
              <CardDescription>
                <button>
                  <img src={irefresh} className="max-h-[80px]"/>
                </button>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      
        <div className="flex flex-wrap m-4 p1  ">
           <div className="pt-2 mx-2 rounded-lg flex flex-col border-2 bg-[#053025]">
              <p className="text-left rounded-r-full rounded-br-full bg-[#FFC145]  font-bold text-lg  px-14 py-2 mb-8">King </p>
              {King.map((button) => (
            <button
            key={button.id}
            className="text-center bg-[#FFC145]  font-bold text-lg rounded-l-full rounded-r-md px-8 py-2 ml-4 mt-1">
              {button.name}
            </button>
      ))}
              <button className="mt-8 text-center bg-[#FFC145] font-bold text-lg  px-14 py-2">SELECT </button>
            
           </div>
           <div className="pt-2  mx-2 rounded-lg flex flex-col border-2 bg-[#053025]">
              <p className="text-left bg-[#FFC145]  rounded-r-full rounded-br-full  font-bold text-lg  px-14 py-2 mb-8">Popular </p>
              {King.map((button) => (
            <button
            key={button.id}
            className="text-center bg-[#FFC145]  font-bold text-lg rounded-l-full rounded-r-md px-8 py-2 ml-4 mt-1">
              {button.name}
            </button>
      ))}
              <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">SELECT </button>
            
           </div>
           <div className="pt-2  mx-2  rounded-md flex flex-col border-2 bg-[#053025]">
              <p className="text-left rounded-r-full rounded-br-full bg-[#FFC145]  font-bold text-lg  px-14 py-2 mb-8">Queen </p>
              {King.map((button) => (
            <button
            key={button.id}
            className="text-center bg-[#FFC145]  font-bold text-lg rounded-l-full rounded-r-md px-8 py-2 ml-4 mt-1">
              {button.name}
            </button>
      ))}
              <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">SELECT </button>
            
           </div>
           <div className="pt-2  mx-2  rounded-md flex flex-col border-2 bg-[#053025]">
              <p className="text-left bg-[#FFC145] rounded-r-full rounded-br-full font-bold text-lg  px-14 py-2 mb-8">Innocence </p>
              {King.map((button) => (
            <button
            key={button.id}
            className="text-center bg-[#FFC145]  font-bold text-lg rounded-l-full rounded-r-md px-8 py-2 ml-4 mt-1">
              {button.name}
            </button>
      ))}
              <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">SELECT </button>
            
           </div>
          
          
        </div>
    </div>
    </>
  );
}
