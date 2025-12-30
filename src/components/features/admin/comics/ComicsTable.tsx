import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table'
import EmptyState from '@/components/ui/shared/EmptyState'
import { ComicWithGenresAndChapters } from '@/types/comic'
import ComicsTableRow from './ComicsTableRow'

type ComicsTableProps = {
  comics: ComicWithGenresAndChapters[]
}

const ComicsTable = ({ comics }: ComicsTableProps) => {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>#</Th>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Genres</Th>
          <Th>Total Chapters</Th>
          <Th align="right">Actions</Th>
        </Tr>
      </THead>
      <TBody>
        {comics.length === 0 ? (
          <Tr>
            <Td colSpan={6}>
              <EmptyState />
            </Td>
          </Tr>
        ) : (
          comics.map((comic, i) => <ComicsTableRow key={comic.id} comic={comic} index={i} />)
        )}
      </TBody>
    </Table>
  )
}

export default ComicsTable
