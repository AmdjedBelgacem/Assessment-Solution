import Image from 'next/image'
import MasterView from './contents/MasterView/page'
import UserForm from './contents/UserForm/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MasterView />
      <UserForm />
    </main>
  )
}
