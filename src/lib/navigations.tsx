import { BookmarksIcon, ComicsIcon, GenresIcon, OverviewIcon, UsersIcon } from '@/components/ui/Icon'
import { Navigation } from '@/types/navigation'

export function getAdminNavigations(): Navigation[] {
  return [
    {
      label: 'Overview',
      url: '/admin',
      segment: null,
      icon: <OverviewIcon />,
    },
    {
      label: 'Manage Users',
      url: '/admin/users',
      segment: 'users',
      icon: <UsersIcon />,
    },
    {
      label: 'Manage Genres',
      url: '/admin/genres',
      segment: 'genres',
      icon: <GenresIcon />,
    },
    {
      label: 'Manage Comics',
      url: '/admin/comics',
      segment: 'comics',
      icon: <ComicsIcon />,
    },
    {
      label: 'Manage Bookmarks',
      url: '/admin/bookmarks',
      segment: 'bookmarks',
      icon: <BookmarksIcon />,
    },
  ]
}
