import { BookmarksIcon, ComicsIcon, GenresIcon, OverviewIcon, UsersIcon } from '@/components/ui/Icon'
import { Navigation } from '@/types/navigation'
import { EMPTY_STRING } from './constants'
import { Session } from 'next-auth'

export function getAdminNavigations(session: Session): Navigation[] {
  return [
    {
      label: 'Overview',
      url: '/admin',
      description: `Hello ${session?.user?.name}, welcome to the overview section.`,
      icon: <OverviewIcon />,
    },
    {
      label: 'Manage Users',
      url: '/admin/users',
      description: 'Manage all users to add, edit, or remove accounts quickly.',
      icon: <UsersIcon />,
    },
    {
      label: 'Manage Genres',
      url: '/admin/genres',
      description: 'Organize comic genres by adding or updating categories.',
      icon: <GenresIcon />,
    },
    {
      label: 'Manage Comics',
      url: '/admin/comics',
      description: 'Keep your comic collection up-to-date with edits and new entries.',
      icon: <ComicsIcon />,
    },
    {
      label: 'Manage Bookmarks',
      url: '/admin/bookmarks',
      description: 'Review and manage user bookmarks on comics efficiently.',
      icon: <BookmarksIcon />,
    },
  ]
}

export function getAdminMetaByUrl(url: string, session: Session): { title: string; subtitle: string } {
  const navigations = getAdminNavigations(session)
  const navigation = navigations.find((n) => n.url === url)
  return {
    title: navigation?.label ?? EMPTY_STRING,
    subtitle: navigation?.description ?? EMPTY_STRING,
  }
}
