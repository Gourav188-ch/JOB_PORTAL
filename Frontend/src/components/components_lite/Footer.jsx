import React from 'react'
import { Link } from 'react-router-dom'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermOfService'

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-center py-6 mt-12 border-t">

            <p className="text-sm text-gray-600">
                © 2026 All rights reserved.
            </p>

            <p className="text-sm text-gray-600 mt-1">
                Powered by{" "}
                <a
                    href="https://github.com/Ashutoshsarathe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Ashutosh Sarathe
                </a>
            </p>

            <p className="text-sm mt-2">
                <Link
                    to="/PrivacyPolicy"
                    className="text-blue-600 hover:underline"
                >
                    Privacy Policy
                </Link>
                {" | "}
                <Link
                    to="/TermsOfService"
                    className="text-blue-600 hover:underline"
                >
                    Terms of Service
                </Link>
            </p>

        </footer>
    )
}

export default Footer