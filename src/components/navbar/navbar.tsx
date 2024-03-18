// components/nav-bar.js
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react"

import styles from './navbar.module.scss';
// Navigation Bar
// This component will be used on all pages
const NavBar = () => {
    const pathname= usePathname();
    const { data: session } = useSession()
    return (
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                <Link href='/' className={pathname === '/' ? styles.active : styles.nonActive}>
                    Home
                </Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                <Link href='/protected/deposit'
                      className={pathname === '/protected/deposit' ? styles.active : styles.nonActive}>
                    Deposit
                </Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                <Link
                    href='/protected/payout'
                    className={pathname === '/protected/payout' ? styles.active : styles.nonActive}
                >
                    Payout
                </Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                <Link
                    href='/protected/refund'
                    className={pathname === '/protected/refund' ? styles.active : styles.nonActive}
                >
                    Refund
                </Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                <Link
                    href='/bulk'
                    className={pathname === '/bulk' ? styles.active : styles.nonActive}
                >
                    Bulk
                </Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                <Link
                    href='/msisdn'
                    className={pathname === '/msisdn' ? styles.active : styles.nonActive}
                >
                    MSISDN
                </Link>
            </li>
            <li className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                <Link
                    href='/protected/generate-test-transactions'
                    className={pathname === '/protected/generate-test-transactions' ? styles.active : styles.nonActive}
                >
                    Test Transactions
                </Link>
            </li>
            {session?.user.email != null && <li>
                <Link
                    href='/api/auth/signout'
                    className={pathname === '/api/auth/signout' ? styles.active : styles.nonActive}
                >
                    Logout
                </Link>
            </li>
            }
            {session?.user.email == null && <li>
                <Link
                    href='/login'
                    className={pathname === '/login' ? styles.active : styles.nonActive}
                >
                    Login
                </Link>
            </li>}

        </ul>

    );
};

export default NavBar;
