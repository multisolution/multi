import {NextPage} from "next";
import React, {useState, useEffect, Component} from "react";
import Link from "next/link";
import Button from "../components/button";
import {Container, Section} from '../components/global-styled';
import Layout from "../components/layout";
import Room from "../components/room";
import styled from "styled-components";
import TitlePage from "../components/title-page"

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


// export class Carrosel extends Component {
    
//   render() {
      
//       const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//       };
//   return (
//     <div className="carroselCursos">
//       <Slider {...settings}>

//         <div className="item-carrosel">

//         <Room roomId={1} roomName="Sala 01"></Room>
//         </div>

//         <div className="item-carrosel">
//         <Room roomId={1} roomName="Sala 02"></Room>
//         </div>
//       </Slider>
//     </div>
//   );
// }
// }



// const Meetings = [
//   {
//     sala: "Borboleta",
//     time:
//     {hoursStart: "", hoursFinished: ""},
//     available: true

//   }]; 

//   const SetMeeting = (day: string, hoursStart :string, hoursFinished: string) => {
   
//     return 
//   }
  

  const ContainerRoom = styled(Container)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  ` 


const MeetingRooms: NextPage = () => {

  const [roomSelected, setRoomSelected] = useState("");


  useEffect(() =>{

  }, []);


  return (
    <>
    <Layout>
    <Section>
      <Container>
        <TitlePage>Salas de reuniões</TitlePage> 
            {/* <Link href="/">
            <Button>Home</Button>
            </Link> */}
      </Container>
    </Section>    
      <Section>
        <ContainerRoom>
            <Room roomId={1} roomName="Sala 01" onClick={() => setRoomSelected("1")}></Room>
            <Room roomId={2} roomName="Sala 02" onClick={() => setRoomSelected("2")}></Room>
            <Room roomId={3} roomName="Sala 03" onClick={() => setRoomSelected("3")}></Room>
            <Room roomId={3} roomName="Sala 04" onClick={() => setRoomSelected("4")}></Room>
            <Room roomId={3} roomName="Sala 05" onClick={() => setRoomSelected("5")}></Room>
            <Room roomId={3} roomName="Sala 06" onClick={() => setRoomSelected("6")}></Room>
            <Room roomId={3} roomName="Sala 07" onClick={() => setRoomSelected("7")}></Room>
            <Room roomId={3} roomName="Sala 08" onClick={() => setRoomSelected("8")}></Room>
            <Room roomId={3} roomName="Sala 09" onClick={() => setRoomSelected("9")}></Room>
            <Room roomId={3} roomName="Sala 10" onClick={() => setRoomSelected("10")}></Room>
          </ContainerRoom>
      </Section>

      <Section>
      <Container>
        <TitlePage>Reuniões Agendadas </TitlePage>
        </Container>
      </Section>



      <Section>
      <Container>
        <TitlePage>Agendar nova reunião</TitlePage>
        {roomSelected}
        </Container>
      </Section>
    </Layout>
    </>
  );
};


export default MeetingRooms;