import React, { useContext, useEffect, useState } from 'react'
import AnalyticBox from '../../components/AnalyticBox'
import Navbar from '../../components/Navbar'
import Table from '../../components/Table'
import { dadosClientes, dadosTitulos } from '../../utils/axios.routes'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'

const Home = () => {
  const navigate = useNavigate();
  const { isLogged, funcionario } = useContext(AuthContext)
  if(!isLogged){
    navigate('/')
  }
  const [data, setData] = useState([]);
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const titulos = await dadosTitulos();
        const data = titulos?.data;
        setData(data);
        const cliente = await dadosClientes();
        const client = cliente?.data;
        setClient(client);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

if(isLogged){

  if (!loading && (funcionario.cargo == 'Administrador' || funcionario.cargo == 'Comercial' || funcionario.cargo == 'Financeiro')) {
    return (
      <>
        <Navbar/>
        <main>
          <AnalyticBox />
          <Table data={data} client={client} />
        </main>
      </>
    );
  } else {
    return(
      <Loading/> 
      )
    }
    
  } else{
    return(
      <></>
    )
  }
  };
  
  export default Home;