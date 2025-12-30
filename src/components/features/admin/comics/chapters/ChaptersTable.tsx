import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/Table'
import EmptyState from '@/components/ui/shared/EmptyState'
import ChaptersTableRow from './ChaptersTableRow'
import { Chapter } from '@/generated/prisma/client'

type ChaptersTableProps = {
  chapters: Chapter[]
}

const ChaptersTable = ({ chapters }: ChaptersTableProps) => {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>#</Th>
          <Th>Title</Th>
          <Th>Total Pages</Th>
          <Th>Date Created</Th>
          <Th align="right">Actions</Th>
        </Tr>
      </THead>
      <TBody>
        {chapters.length === 0 ? (
          <Tr>
            <Td colSpan={5}>
              <EmptyState />
            </Td>
          </Tr>
        ) : (
          chapters.map((chapter, i) => <ChaptersTableRow key={chapter.id} chapter={chapter} index={i} />)
        )}
      </TBody>
    </Table>
  )
}

export default ChaptersTable
