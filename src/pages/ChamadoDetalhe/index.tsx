import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'

import { ChamadoAbertoParaDetalhe } from '../../shared/components/ChamadoAbertoParaDetalhe'
import BarraFerramentasDetalhesChamado from '../../shared/components/BarraFerramentasDetalhesChamado'
import { useNavigate, useParams } from 'react-router-dom'
import { ChamadosService } from '../../shared/services/api/Chamados/ChamadosServices'

// import { Container } from './styles';

const ChamadoDetalhe: React.FC = () => {
  const navigate = useNavigate()
  const { id = 'novo' } = useParams<'id'>()

  const [isLoading, setIsLoading] = useState(false)
  const [titulo, setTitulo] = useState('')

  useEffect(() => {
    if (id !== 'novo') {
      setIsLoading(true)

      ChamadosService.getById(Number(id)).then((result) => {
        setIsLoading(false)
        if (result instanceof Error) {
          alert(result.message)
          navigate('/abrir-chamado')
        } else {
          setTitulo(result.titulo)
          console.log(result)
        }
      })
    }
  }, [id, navigate])

  return (
    <DefaultLayout
      mostrarBotaoTema={true}
      tituloPagina={id === 'novo' ? '' : titulo}
      barraDeFerramentas={
        <BarraFerramentasDetalhesChamado
          aoClicarEmVoltar={() => navigate('/abrir-chamado')}
          mostrarBotaoDeletar={id !== 'novo'}
        />
      }
    >
      <ChamadoAbertoParaDetalhe />
    </DefaultLayout>
  )
}

export default ChamadoDetalhe
