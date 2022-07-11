import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Home from '../pages'
import SidebarRow from './SidebarRow'

function Sidebar() {

  const {data: session } = useSession()

  return (
    <div className='col-span-2 flex flex-col items-center px-4
    md:items-start'>
        <img className="m-3 h-8 w-8" src='/2021 Twitter logo - blue.png' alt='twitter logo'/>
        <SidebarRow Icon={HomeIcon} title="Home"/>
        <SidebarRow Icon={HashtagIcon} title="Explore"/>
        <SidebarRow Icon={BellIcon} title="Notifications"/>
        <SidebarRow Icon={MailIcon} title="Messages"/>
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks"/>
        <SidebarRow Icon={CollectionIcon} title="Lists"/>
        <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign out' : 'Sign In'}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} title="Lists"/>

    </div>
  )
}

export default Sidebar