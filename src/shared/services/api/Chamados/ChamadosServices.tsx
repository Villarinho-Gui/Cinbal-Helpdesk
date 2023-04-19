import { Environment } from '../../../environment/export'
import { Api } from '../Config'

interface IListagemChamados {
  id: number
  titulo: string
  categoria: string
  descricao: string
}

interface IDetalheChamados {
  id: number
  chamadoId: number
  author: string
  titulo: string
  categoria: string
  attachedFile: [0]
  descricao: string
  publishedAt: number
}

type IChamadoComTotalCount = {
  data: IListagemChamados[]
  totalCount: string
}

const getAll = async (
  page = 1,
  filter = '',
): Promise<IChamadoComTotalCount | Error> => {
  try {
    const urlRelativa = `/chamado?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&titulo_like=${filter}`
    const { data, headers } = await Api.get(urlRelativa)
    if (data) {
      return {
        data,
        totalCount: headers['x-total-count'],
      }
    }
    return new Error('Erro ao listar os chamados')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os chamados',
    )
  }
}
const getById = async (id: number): Promise<IDetalheChamados | Error> => {
  try {
    const { data } = await Api.get(`/chamado/${id}`)
    if (data) {
      return data
    }
    return new Error('Erro ao consultar o chamado')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o chamado',
    )
  }
}
const create = async (
  dados: Omit<IDetalheChamados, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheChamados>('/chamado', dados)
    if (data) {
      return data.id
    }
    return new Error('Erro ao criar chamado')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao criar chamado',
    )
  }
}
const updateById = async (
  id: number,
  dados: IDetalheChamados,
): Promise<void | Error> => {
  try {
    await Api.put(`/chamado/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar chamado',
    )
  }
}
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/chamado/${id}`)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao deletar chamado',
    )
  }
}

export const ChamadosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
