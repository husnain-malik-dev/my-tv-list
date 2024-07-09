import Image from "next/image";
import Link from "next/link";
import GenreDropdown from "./GenreDropdown";
import SearchInput from "./SearchInput";
import Logo from '../public/Logo.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";

async function Header() {

  const user = await currentUser();
  const userName = user?.username || '';


  return (
    <header className="fixed w-full z-20 top-0 flex items-center justify-between p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900">
      <Link href="/" className="mr-10">
        <Image
          src={Logo}
          width={120}
          height={0}
          alt="site logo"
          className={"cursor-pointer invert md:ml-6"}
        />
      </Link>

      <div className="flex space-x-2 sm:space-x-4 justify-center items-center md:text-lg">
        <div><Link className="hidden sm:block" href={`/my-list/${userName}`}>TV List</Link></div>
        <div><Link className="hidden sm:block" href={`/forums`}>Forums</Link></div>
        <div className="hidden sm:block">
        <GenreDropdown />
        </div>
        <div className="sm:hidden">
        <DropDownMobile />
        </div>
        <SearchInput />
        <div className="block">
        </div>
        <SignedOut>
          <Link  href="/sign-in">
            <Button variant={"outline"}>Sign in</Button>
          </Link>     
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;

async function DropDownMobile() {

  const user = await currentUser();
  const userName = user?.username || '';


  return (
    <div className="block sm:hidden">
      <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
      <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="sm:hidden">
        <DropdownMenuLabel>Explore</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer " >
          <Link className="" href={`/my-list/${userName}`}>TV List</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" >
          <Link className="" href={`/forums`}>Forums</Link>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}