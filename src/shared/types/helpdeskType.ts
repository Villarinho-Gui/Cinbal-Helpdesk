export interface UserProps {
  id: string | undefined
  name: string | undefined
  sector: string | undefined
  email: string | undefined
  extension: string | undefined
  position: string | undefined
  role: string | undefined
}
export interface FileProps {
  id: string
  filename: string
  mimetype:
    | 'image/jpeg'
    | 'image/gif'
    | 'image/png'
    | 'image/bmp'
    | 'application/pdf'
}

export interface CommentsProps {
  id: string
  message: string
  helpdesk: {
    id: string
    status: string
  }
  user: {
    name: string
  }
  createdAt: Date
  messageStatus: string
}

export interface HelpDeskProps {
  id: string
  user: {
    name: string
    sector: string
    role: string
  }
  title: string
  category: string
  description: string
  maxLines: number
  createdAt: Date
  files?: FileProps[]
  comments?: CommentsProps[]
  status: string
  accountable?: string
  countFiles: number
  length: number
  map: any
  filter: any
}

export interface HelpDeskListProp {
  id: string
  user: {
    name: string
  }
  accountable: string
  title: string
  category: string
  description: string
  files?: File[]
  countFiles: number
  status: string
  createdAt: Date
}

export default HelpDeskProps
