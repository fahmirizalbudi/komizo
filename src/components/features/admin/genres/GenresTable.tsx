import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table'
import { Genre } from '@/generated/prisma/client'
import GenresTableRow from './GenresTableRow'
import EmptyState from '@/components/ui/shared/EmptyState'

type GenresTableProps = {
  genres: Genre[]
}

const GenresTable = ({ genres }: GenresTableProps) => {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>#</Th>
          <Th>Name</Th>
          <Th align="right">Actions</Th>
        </Tr>
      </THead>
      <TBody>
        {genres.length === 0 ? (
          <Tr>
            <Td colSpan={3}>
              <EmptyState />
            </Td>
          </Tr>
        ) : (
          genres.map((genre, i) => <GenresTableRow key={genre.id} genre={genre} index={i} />)
        )}
      </TBody>
    </Table>
  )
}

export default GenresTable
