import { BookmarksIcon, ComicsIcon, GenresIcon, OverviewIcon, UsersIcon } from '@/components/ui/Icon'
import { Navigation } from '@/types/navigation'

export function getAdminNavigations(): Navigation[] {
  return [
    {
      label: 'Overview',
      url: '/admin',
      icon: OverviewIcon,
    },
    {
      label: 'Manage Users',
      url: '/admin/users',
      description: 'Manage all users to add, edit, or remove accounts quickly.',
      icon: UsersIcon,
    },
    {
      label: 'Manage Genres',
      url: '/admin/genres',
      description: 'Organize comic genres by adding or updating categories.',
      icon: GenresIcon,
    },
    {
      label: 'Manage Comics',
      url: '/admin/comics',
      description: 'Keep your comic collection up-to-date with edits and new entries.',
      icon: ComicsIcon,
    },
    {
      label: 'Manage Bookmarks',
      url: '/admin/bookmarks',
      description: 'Review and manage user bookmarks on comics efficiently.',
      icon: BookmarksIcon,
    },
    {
      label: 'Create User',
      url: '/admin/users/create',
      description: 'Use this form to create a new user by entering their user information.',
    },
    {
      label: 'Edit User',
      url: '/admin/users/*/edit',
      description: 'Use this form to edit a exist user by entering their user information.',
    },
  ]
}
