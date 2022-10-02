export type Template = {
  csv_name: string
  name: string
  slug: string
  id: number
}
export type Templates = Template[]

type DateDirective = {
  id: number
  directive: string
  sample_format: string
  sample_date: string
}

type Header = {
  data_type: number
  header_name: string
  required: boolean
  sample_values: string[]
  date_directive?: DateDirective
}

export type CSVHeaders = Header[]
